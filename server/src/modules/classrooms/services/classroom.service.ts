import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Classroom, ClassroomDocument, ClassroomRole } from '../schemas/classroom.schema';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { CreateClassroomDto } from '../dto/create-classroom.dto';
import { UpdateClassroomDto } from '../dto/update-classroom.dto';
import { JoinClassroomDto } from '../dto/join-classroom.dto';
import { ClassroomHelperService } from './classroom-helper.service';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectModel(Classroom.name) private classroomModel: Model<ClassroomDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private helperService: ClassroomHelperService,
  ) {}

  async create(createClassroomDto: CreateClassroomDto, userId: string) {
    const joinCode = await this.helperService.generateJoinCode(this.classroomModel);

    const classroom = await this.classroomModel.create({
      ...createClassroomDto,
      joinCode,
      createdBy: userId,
      members: [
        {
          userId: new Types.ObjectId(userId),
          role: ClassroomRole.ADMIN,
          isBlocked: false,
          joinedAt: new Date(),
        },
      ],
    });

    await this.userModel.findByIdAndUpdate(userId, {
      $addToSet: { classrooms: classroom._id },
    });

    return this.helperService.populateClassroom(classroom);
  }

  async findUserClassrooms(userId: string) {
    const classrooms = await this.classroomModel
      .find({
        'members.userId': userId,
        isArchived: false,
      })
      .populate('createdBy', 'name email avatarUrl')
      .populate('members.userId', 'name email avatarUrl')
      .populate('members.blockedBy', 'name email')
      .sort({ updatedAt: -1 })
      .lean();

    return classrooms.map((classroom) =>
      this.helperService.formatClassroomResponse(classroom, userId),
    );
  }

  async findOne(classroomId: string, userId: string) {
    const classroom = await this.classroomModel
      .findById(classroomId)
      .populate('createdBy', 'name email avatarUrl')
      .populate('members.userId', 'name email avatarUrl')
      .populate('members.blockedBy', 'name email')
      .lean();

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    this.helperService.checkMemberAccess(classroom, userId);

    return this.helperService.formatClassroomResponse(classroom, userId);
  }

  async update(
    classroomId: string,
    updateClassroomDto: UpdateClassroomDto,
    userId: string,
  ) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    this.helperService.checkAdminPrivileges(classroom, userId);

    Object.assign(classroom, updateClassroomDto);
    await classroom.save();

    return this.helperService.populateClassroom(classroom);
  }

  async joinClassroom(joinClassroomDto: JoinClassroomDto, userId: string) {
    const { joinCode } = joinClassroomDto;

    const classroom = await this.classroomModel.findOne({
      joinCode: joinCode.toUpperCase(),
    });

    if (!classroom) {
      throw new NotFoundException('Invalid join code');
    }

    if (!classroom.isActive) {
      throw new BadRequestException('Classroom is not active');
    }

    if (!classroom.isJoinCodeActive) {
      throw new BadRequestException('Join code is disabled');
    }

    const existingMember = classroom.members.find(
      (m) => m.userId.toString() === userId,
    );

    if (existingMember) {
      if (existingMember.isBlocked) {
        throw new ForbiddenException('You are blocked from this classroom');
      }
      throw new ConflictException('You are already a member of this classroom');
    }

    classroom.members.push({
      userId: new Types.ObjectId(userId),
      role: ClassroomRole.MEMBER,
      isBlocked: false,
      joinedAt: new Date(),
    });

    await classroom.save();

    await this.userModel.findByIdAndUpdate(userId, {
      $addToSet: { classrooms: classroom._id },
    });

    return this.helperService.populateClassroom(classroom);
  }

  async leaveClassroom(classroomId: string, userId: string) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    if (classroom.createdBy.toString() === userId) {
      throw new BadRequestException(
        'Classroom creator cannot leave. Delete the classroom instead.',
      );
    }

    classroom.members = classroom.members.filter(
      (m) => m.userId.toString() !== userId,
    );

    await classroom.save();

    await this.userModel.findByIdAndUpdate(userId, {
      $pull: { classrooms: classroom._id },
    });

    return { message: 'Left classroom successfully' };
  }

  async regenerateJoinCode(classroomId: string, userId: string) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    this.helperService.checkAdminPrivileges(classroom, userId);

    classroom.joinCode = await this.helperService.generateJoinCode(this.classroomModel);
    await classroom.save();

    return {
      joinCode: classroom.joinCode,
      message: 'Join code regenerated successfully',
    };
  }

  async delete(classroomId: string, userId: string) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    if (classroom.createdBy.toString() !== userId) {
      throw new ForbiddenException('Only classroom creator can delete it');
    }

    const memberIds = classroom.members.map((m) => m.userId);
    await this.userModel.updateMany(
      { _id: { $in: memberIds } },
      { $pull: { classrooms: classroom._id } },
    );

    await this.classroomModel.findByIdAndDelete(classroomId);

    return { message: 'Classroom deleted successfully' };
  }
}