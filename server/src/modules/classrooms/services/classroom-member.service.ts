import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Classroom,
  ClassroomDocument,
  ClassroomRole,
} from '../schemas/classroom.schema';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { AssignAdminDto } from '../dto/assign-admin.dto';
import { BlockMemberDto } from '../dto/block-member.dto';
import { ClassroomHelperService } from './classroom-helper.service';

@Injectable()
export class ClassroomMemberService {
  constructor(
    @InjectModel(Classroom.name)
    private classroomModel: Model<ClassroomDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private helperService: ClassroomHelperService,
  ) {}

  async assignRole(
    classroomId: string,
    assignAdminDto: AssignAdminDto,
    requesterId: string,
  ) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    const requesterMember = classroom.members.find(
      (m) => m.userId.toString() === requesterId,
    );

    if (!requesterMember || requesterMember.role !== ClassroomRole.ADMIN) {
      throw new ForbiddenException('Only classroom admin can assign roles');
    }

    if (requesterMember.isBlocked) {
      throw new ForbiddenException('You are blocked from this classroom');
    }

    const targetMember = classroom.members.find(
      (m) => m.userId.toString() === assignAdminDto.userId,
    );

    if (!targetMember) {
      throw new NotFoundException('User is not a member of this classroom');
    }

    if (targetMember.role === ClassroomRole.ADMIN) {
      throw new BadRequestException('Cannot change role of classroom creator');
    }

    if (targetMember.isBlocked) {
      throw new BadRequestException('Cannot assign role to blocked user');
    }

    targetMember.role = assignAdminDto.role;
    await classroom.save();

    return this.helperService.populateClassroom(classroom);
  }

  async blockMember(
    classroomId: string,
    blockMemberDto: BlockMemberDto,
    requesterId: string,
  ) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    this.helperService.checkAdminPrivileges(classroom, requesterId);

    const { userId } = blockMemberDto;

    if (classroom.createdBy.toString() === userId) {
      throw new BadRequestException('Cannot block classroom creator');
    }

    if (requesterId === userId) {
      throw new BadRequestException('Cannot block yourself');
    }

    const member = classroom.members.find(
      (m) => m.userId.toString() === userId,
    );

    if (!member) {
      throw new NotFoundException('User is not a member of this classroom');
    }

    if (member.isBlocked) {
      throw new ConflictException('User is already blocked');
    }

    const requesterMember = classroom.members.find(
      (m) => m.userId.toString() === requesterId,
    );

    if (
      requesterMember?.role === ClassroomRole.CO_ADMIN &&
      (member.role === ClassroomRole.ADMIN ||
        member.role === ClassroomRole.CO_ADMIN)
    ) {
      throw new ForbiddenException(
        'Co-admin cannot block another admin or co-admin',
      );
    }

    member.isBlocked = true;
    member.blockedBy = new Types.ObjectId(requesterId);
    member.blockedAt = new Date();

    await classroom.save();

    return {
      message: 'Member blocked successfully',
      member: {
        userId: member.userId,
        isBlocked: member.isBlocked,
        blockedBy: member.blockedBy,
        blockedAt: member.blockedAt,
      },
    };
  }

  async unblockMember(
    classroomId: string,
    blockMemberDto: BlockMemberDto,
    requesterId: string,
  ) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    this.helperService.checkAdminPrivileges(classroom, requesterId);

    const { userId } = blockMemberDto;

    const member = classroom.members.find(
      (m) => m.userId.toString() === userId,
    );

    if (!member) {
      throw new NotFoundException('User is not a member of this classroom');
    }

    if (!member.isBlocked) {
      throw new ConflictException('User is not blocked');
    }

    member.isBlocked = false;
    member.blockedBy = undefined;
    member.blockedAt = undefined;

    await classroom.save();

    return {
      message: 'Member unblocked successfully',
      member: {
        userId: member.userId,
        isBlocked: member.isBlocked,
      },
    };
  }

  async getBlockedMembers(classroomId: string, requesterId: string) {
    const classroom = await this.classroomModel
      .findById(classroomId)
      .populate('members.userId', 'name email avatarUrl')
      .populate('members.blockedBy', 'name email')
      .lean();

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    const member = classroom.members.find(
      (m: any) => m.userId._id.toString() === requesterId,
    );

    if (
      !member ||
      (member.role !== ClassroomRole.ADMIN &&
        member.role !== ClassroomRole.CO_ADMIN)
    ) {
      throw new ForbiddenException('Only admins can view blocked members');
    }

    const blockedMembers = classroom.members
      .filter((m: any) => m.isBlocked)
      .map((m: any) => ({
        userId: m.userId,
        role: m.role,
        isBlocked: m.isBlocked,
        blockedBy: m.blockedBy,
        blockedAt: m.blockedAt,
        joinedAt: m.joinedAt,
      }));

    return {
      classroomId: classroom._id,
      classroomName: classroom.name,
      totalBlockedMembers: blockedMembers.length,
      blockedMembers,
    };
  }

  async removeMember(
    classroomId: string,
    memberId: string,
    requesterId: string,
  ) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    this.helperService.checkAdminPrivileges(classroom, requesterId);

    if (classroom.createdBy.toString() === memberId) {
      throw new BadRequestException('Cannot remove classroom creator');
    }

    if (requesterId === memberId) {
      throw new BadRequestException(
        'Cannot remove yourself. Use leave endpoint instead.',
      );
    }

    const requesterMember = classroom.members.find(
      (m) => m.userId.toString() === requesterId,
    );

    const targetMember = classroom.members.find(
      (m) => m.userId.toString() === memberId,
    );

    if (
      requesterMember?.role === ClassroomRole.CO_ADMIN &&
      targetMember &&
      (targetMember.role === ClassroomRole.ADMIN ||
        targetMember.role === ClassroomRole.CO_ADMIN)
    ) {
      throw new ForbiddenException(
        'Co-admin cannot remove another admin or co-admin',
      );
    }

    classroom.members = classroom.members.filter(
      (m) => m.userId.toString() !== memberId,
    );

    await classroom.save();

    await this.userModel.findByIdAndUpdate(memberId, {
      $pull: { classrooms: classroom._id },
    });

    return { message: 'Member removed successfully' };
  }
}
