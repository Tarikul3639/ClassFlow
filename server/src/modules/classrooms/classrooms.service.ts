import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Classroom, ClassroomDocument, ClassroomRole } from './schemas/classroom.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { JoinClassroomDto } from './dto/join-classroom.dto';
import { AssignAdminDto } from './dto/assign-admin.dto';
import { BlockMemberDto } from './dto/block-member.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectModel(Classroom.name) private classroomModel: Model<ClassroomDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  // ==================== GENERATE JOIN CODE ====================
  private async generateJoinCode(): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code: string = '';
    let exists = true;

    while (exists) {
      code = '';
      for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      exists = !!(await this.classroomModel.exists({ joinCode: code }));
    }

    return code;
  }

  // ==================== CREATE CLASSROOM ====================
  async create(createClassroomDto: CreateClassroomDto, userId: string) {
    const joinCode = await this.generateJoinCode();

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

    // Add classroom to user's classrooms array
    await this.userModel.findByIdAndUpdate(userId, {
      $addToSet: { classrooms: classroom._id },
    });

    return this.populateClassroom(classroom);
  }

  // ==================== GET USER CLASSROOMS ====================
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
      this.formatClassroomResponse(classroom, userId),
    );
  }

  // ==================== GET SINGLE CLASSROOM ====================
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

    // Check if user is a member
    const member = classroom.members.find(
      (m: any) => m.userId._id.toString() === userId,
    );

    if (!member) {
      throw new ForbiddenException('You are not a member of this classroom');
    }

    // Check if user is blocked
    if (member.isBlocked) {
      throw new ForbiddenException('You are blocked from accessing this classroom');
    }

    return this.formatClassroomResponse(classroom, userId);
  }

  // ==================== UPDATE CLASSROOM ====================
  async update(
    classroomId: string,
    updateClassroomDto: UpdateClassroomDto,
    userId: string,
  ) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    // Check if user has admin privileges and is not blocked
    this.checkAdminPrivileges(classroom, userId);

    Object.assign(classroom, updateClassroomDto);
    await classroom.save();

    return this.populateClassroom(classroom);
  }

  // ==================== JOIN CLASSROOM ====================
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

    // Check if already a member
    const existingMember = classroom.members.find(
      (m) => m.userId.toString() === userId,
    );

    if (existingMember) {
      if (existingMember.isBlocked) {
        throw new ForbiddenException('You are blocked from this classroom');
      }
      throw new ConflictException('You are already a member of this classroom');
    }

    // Add user as member
    classroom.members.push({
      userId: new Types.ObjectId(userId),
      role: ClassroomRole.MEMBER,
      isBlocked: false,
      joinedAt: new Date(),
    });

    await classroom.save();

    // Add classroom to user's classrooms array
    await this.userModel.findByIdAndUpdate(userId, {
      $addToSet: { classrooms: classroom._id },
    });

    return this.populateClassroom(classroom);
  }

  // ==================== ASSIGN ROLE (ADMIN ONLY) ====================
  async assignRole(
    classroomId: string,
    assignAdminDto: AssignAdminDto,
    requesterId: string,
  ) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    // Check requester is admin and not blocked
    const requesterMember = classroom.members.find(
      (m) => m.userId.toString() === requesterId,
    );

    if (!requesterMember || requesterMember.role !== ClassroomRole.ADMIN) {
      throw new ForbiddenException('Only classroom admin can assign roles');
    }

    if (requesterMember.isBlocked) {
      throw new ForbiddenException('You are blocked from this classroom');
    }

    // Find target user in members
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

    // Update role
    targetMember.role = assignAdminDto.role;
    await classroom.save();

    return this.populateClassroom(classroom);
  }

  // ==================== BLOCK MEMBER ====================
  async blockMember(
    classroomId: string,
    blockMemberDto: BlockMemberDto,
    requesterId: string,
  ) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    // Check requester has admin privileges
    this.checkAdminPrivileges(classroom, requesterId);

    const { userId } = blockMemberDto;

    // Cannot block classroom creator
    if (classroom.createdBy.toString() === userId) {
      throw new BadRequestException('Cannot block classroom creator');
    }

    // Cannot block yourself
    if (requesterId === userId) {
      throw new BadRequestException('Cannot block yourself');
    }

    // Find the member
    const member = classroom.members.find(
      (m) => m.userId.toString() === userId,
    );

    if (!member) {
      throw new NotFoundException('User is not a member of this classroom');
    }

    // Check if already blocked
    if (member.isBlocked) {
      throw new ConflictException('User is already blocked');
    }

    // Check role hierarchy - Co-admin cannot block another co-admin or admin
    const requesterMember = classroom.members.find(
      (m) => m.userId.toString() === requesterId,
    );

    if (
      requesterMember?.role === ClassroomRole.CO_ADMIN &&
      (member.role === ClassroomRole.ADMIN || member.role === ClassroomRole.CO_ADMIN)
    ) {
      throw new ForbiddenException('Co-admin cannot block another admin or co-admin');
    }

    // Block the member
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

  // ==================== UNBLOCK MEMBER ====================
  async unblockMember(
    classroomId: string,
    blockMemberDto: BlockMemberDto,
    requesterId: string,
  ) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    // Check requester has admin privileges
    this.checkAdminPrivileges(classroom, requesterId);

    const { userId } = blockMemberDto;

    // Find the member
    const member = classroom.members.find(
      (m) => m.userId.toString() === userId,
    );

    if (!member) {
      throw new NotFoundException('User is not a member of this classroom');
    }

    // Check if already unblocked
    if (!member.isBlocked) {
      throw new ConflictException('User is not blocked');
    }

    // Unblock the member
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

  // ==================== GET BLOCKED MEMBERS ====================
  async getBlockedMembers(classroomId: string, requesterId: string) {
    const classroom = await this.classroomModel
      .findById(classroomId)
      .populate('members.userId', 'name email avatarUrl')
      .populate('members.blockedBy', 'name email')
      .lean();

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    // Check if requester has admin privileges
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

    // Filter blocked members
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

  // ==================== REMOVE MEMBER ====================
  async removeMember(
    classroomId: string,
    memberId: string,
    requesterId: string,
  ) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    // Check admin privileges
    this.checkAdminPrivileges(classroom, requesterId);

    // Cannot remove classroom creator
    if (classroom.createdBy.toString() === memberId) {
      throw new BadRequestException('Cannot remove classroom creator');
    }

    // Cannot remove yourself (use leave instead)
    if (requesterId === memberId) {
      throw new BadRequestException('Cannot remove yourself. Use leave endpoint instead.');
    }

    // Check role hierarchy - Co-admin cannot remove another co-admin or admin
    const requesterMember = classroom.members.find(
      (m) => m.userId.toString() === requesterId,
    );

    const targetMember = classroom.members.find(
      (m) => m.userId.toString() === memberId,
    );

    if (
      requesterMember?.role === ClassroomRole.CO_ADMIN &&
      targetMember &&
      (targetMember.role === ClassroomRole.ADMIN || targetMember.role === ClassroomRole.CO_ADMIN)
    ) {
      throw new ForbiddenException('Co-admin cannot remove another admin or co-admin');
    }

    // Remove member
    classroom.members = classroom.members.filter(
      (m) => m.userId.toString() !== memberId,
    );

    await classroom.save();

    // Remove classroom from user's classrooms array
    await this.userModel.findByIdAndUpdate(memberId, {
      $pull: { classrooms: classroom._id },
    });

    return { message: 'Member removed successfully' };
  }

  // ==================== LEAVE CLASSROOM ====================
  async leaveClassroom(classroomId: string, userId: string) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    // Cannot leave if creator
    if (classroom.createdBy.toString() === userId) {
      throw new BadRequestException(
        'Classroom creator cannot leave. Delete the classroom instead.',
      );
    }

    // Remove member
    classroom.members = classroom.members.filter(
      (m) => m.userId.toString() !== userId,
    );

    await classroom.save();

    // Remove classroom from user's classrooms array
    await this.userModel.findByIdAndUpdate(userId, {
      $pull: { classrooms: classroom._id },
    });

    return { message: 'Left classroom successfully' };
  }

  // ==================== REGENERATE JOIN CODE ====================
  async regenerateJoinCode(classroomId: string, userId: string) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    this.checkAdminPrivileges(classroom, userId);

    classroom.joinCode = await this.generateJoinCode();
    await classroom.save();

    return {
      joinCode: classroom.joinCode,
      message: 'Join code regenerated successfully',
    };
  }

  // ==================== DELETE CLASSROOM ====================
  async delete(classroomId: string, userId: string) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    if (classroom.createdBy.toString() !== userId) {
      throw new ForbiddenException('Only classroom creator can delete it');
    }

    // Remove classroom from all users
    const memberIds = classroom.members.map((m) => m.userId);
    await this.userModel.updateMany(
      { _id: { $in: memberIds } },
      { $pull: { classrooms: classroom._id } },
    );

    await this.classroomModel.findByIdAndDelete(classroomId);

    return { message: 'Classroom deleted successfully' };
  }

  // ==================== HELPER: CHECK ADMIN PRIVILEGES ====================
  private checkAdminPrivileges(classroom: ClassroomDocument, userId: string) {
    const member = classroom.members.find(
      (m) => m.userId.toString() === userId,
    );

    if (!member) {
      throw new ForbiddenException('You are not a member of this classroom');
    }

    if (member.isBlocked) {
      throw new ForbiddenException('You are blocked from this classroom');
    }

    if (
      member.role !== ClassroomRole.ADMIN &&
      member.role !== ClassroomRole.CO_ADMIN
    ) {
      throw new ForbiddenException(
        'You do not have permission to perform this action',
      );
    }
  }

  // ==================== HELPER: CHECK IF USER IS BLOCKED ====================
  isUserBlockedInClassroom(classroom: ClassroomDocument, userId: string): boolean {
    const member = classroom.members.find(
      (m) => m.userId.toString() === userId,
    );
    return member?.isBlocked || false;
  }

  // ==================== HELPER: POPULATE CLASSROOM ====================
  private async populateClassroom(classroom: ClassroomDocument) {
    return classroom
      .populate('createdBy', 'name email avatarUrl')
      .then((doc) => doc.populate('members.userId', 'name email avatarUrl'))
      .then((doc) => doc.populate('members.blockedBy', 'name email'));
  }

  // ==================== HELPER: FORMAT RESPONSE WITH USER ROLE ====================
  private formatClassroomResponse(classroom: any, userId: string) {
    const userMember = classroom.members.find(
      (m: any) => m.userId._id.toString() === userId,
    );

    return {
      ...classroom,
      userRole: userMember?.role || null,
      isAdmin:
        userMember?.role === ClassroomRole.ADMIN ||
        userMember?.role === ClassroomRole.CO_ADMIN,
      isBlocked: userMember?.isBlocked || false,
    };
  }

  // ==================== CREATE EVENT ====================
  async createEvent(
    classroomId: string,
    createEventDto: CreateEventDto,
    userId: string,
  ) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    // Check admin privileges
    this.checkAdminPrivileges(classroom, userId);

    // Create event
    const event = {
      ...createEventDto,
      createdBy: new Types.ObjectId(userId),
    };

    classroom.events.push(event as any);
    await classroom.save();

    return {
      message: 'Event created successfully',
      event: classroom.events[classroom.events.length - 1],
    };
  }

  // ==================== GET ALL EVENTS ====================
  async getEvents(classroomId: string, userId: string, query?: any) {
    const classroom = await this.classroomModel
      .findById(classroomId)
      .populate('events.createdBy', 'name email avatarUrl')
      .lean();

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    // Check if user is member and not blocked
    const member = classroom.members.find(
      (m: any) => m.userId.toString() === userId,
    );

    if (!member) {
      throw new ForbiddenException('You are not a member of this classroom');
    }

    if (member.isBlocked) {
      throw new ForbiddenException('You are blocked from this classroom');
    }

    let events = classroom.events;

    // Filter by type
    if (query?.type) {
      events = events.filter((e: any) => e.type === query.type);
    }

    // Filter by completion status
    if (query?.isCompleted !== undefined) {
      const isCompleted = query.isCompleted === 'true';
      events = events.filter((e: any) => e.isCompleted === isCompleted);
    }

    // Filter by date range
    if (query?.startDate && query?.endDate) {
      events = events.filter(
        (e: any) => e.date >= query.startDate && e.date <= query.endDate,
      );
    }

    // Sort by startAt (ascending by default)
    events.sort((a: any, b: any) => a.startAt.localeCompare(b.startAt));

    return {
      classroomId: classroom._id,
      classroomName: classroom.name,
      totalEvents: events.length,
      events,
    };
  }

  // ==================== GET SINGLE EVENT ====================
  async getEvent(classroomId: string, eventId: string, userId: string) {
    const classroom = await this.classroomModel
      .findById(classroomId)
      .populate('events.createdBy', 'name email avatarUrl')
      .lean();

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    // Check if user is member and not blocked
    const member = classroom.members.find(
      (m: any) => m.userId.toString() === userId,
    );

    if (!member) {
      throw new ForbiddenException('You are not a member of this classroom');
    }

    if (member.isBlocked) {
      throw new ForbiddenException('You are blocked from this classroom');
    }

    const event = classroom.events.find((e: any) => e._id.toString() === eventId);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  // ==================== UPDATE EVENT ====================
  async updateEvent(
    classroomId: string,
    eventId: string,
    updateEventDto: UpdateEventDto,
    userId: string,
  ) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    // Check admin privileges
    this.checkAdminPrivileges(classroom, userId);

    const event = classroom.events.find((e: any) => e._id.toString() === eventId);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Update event fields
    Object.assign(event, updateEventDto);

    await classroom.save();

    return {
      message: 'Event updated successfully',
      event,
    };
  }

  // ==================== DELETE EVENT ====================
  async deleteEvent(classroomId: string, eventId: string, userId: string) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    // Check admin privileges
    this.checkAdminPrivileges(classroom, userId);

    const eventIndex = classroom.events.findIndex(
      (e: any) => e._id.toString() === eventId,
    );

    if (eventIndex === -1) {
      throw new NotFoundException('Event not found');
    }

    classroom.events.splice(eventIndex, 1);
    await classroom.save();

    return {
      message: 'Event deleted successfully',
    };
  }

  // ==================== MARK EVENT AS COMPLETED ====================
  async markEventCompleted(
    classroomId: string,
    eventId: string,
    userId: string,
  ) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    // Check admin privileges
    this.checkAdminPrivileges(classroom, userId);

    const event = classroom.events.find((e: any) => e._id.toString() === eventId);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    event.isCompleted = true;
    await classroom.save();

    return {
      message: 'Event marked as completed',
      event,
    };
  }

  // ==================== GET UPCOMING EVENTS ====================
  async getUpcomingEvents(classroomId: string, userId: string) {
    const classroom = await this.classroomModel
      .findById(classroomId)
      .populate('events.createdBy', 'name email avatarUrl')
      .lean();

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    // Check if user is member and not blocked
    const member = classroom.members.find(
      (m: any) => m.userId.toString() === userId,
    );

    if (!member) {
      throw new ForbiddenException('You are not a member of this classroom');
    }

    if (member.isBlocked) {
      throw new ForbiddenException('You are blocked from this classroom');
    }

    const now = new Date().toISOString();
    const upcomingEvents = classroom.events
      .filter((e: any) => e.startAt >= now && !e.isCompleted)
      .sort((a: any, b: any) => a.startAt.localeCompare(b.startAt));

    return {
      classroomId: classroom._id,
      classroomName: classroom.name,
      totalUpcomingEvents: upcomingEvents.length,
      upcomingEvents,
    };
  }
}