import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Classroom,
  ClassroomDocument,
  ClassroomRole,
  ClassroomMember,
} from '../schemas/classroom.schema';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { CreateClassroomDto } from '../dto/create-classroom.dto';
import { UpdateClassroomDto } from '../dto/update-classroom.dto';
import { JoinClassroomDto } from '../dto/join-classroom.dto';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectModel(Classroom.name)
    private classroomModel: Model<ClassroomDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  /**
   * Generate unique join code
   */
  private async generateJoinCode(): Promise<string> {
    let code: string = '';
    let exists = true;

    while (exists) {
      code = Math.random().toString(36).substring(2, 8).toUpperCase();
      exists = !!(await this.classroomModel.findOne({ joinCode: code }));
    }

    return code;
  }

  /**
   * Get user's role in classroom (before population)
   */
  private getUserRole(
    classroom: ClassroomDocument,
    userId: string,
  ): ClassroomRole | null {
    const member = classroom.members.find((m) => {
      const memberUserId =
        m.userId instanceof Types.ObjectId
          ? m.userId.toString()
          : String(m.userId);

      return memberUserId === userId.toString();
    });

    // console.log('User role lookup:', {
    //   userId: userId.toString(),
    //   totalMembers: classroom.members.length,
    //   memberFound: !!member,
    //   role: member?.role,
    //   allMemberIds: classroom.members.map(m => ({
    //     id: m.userId instanceof Types.ObjectId ? m.userId.toString() : String(m.userId),
    //     role: m.role,
    //   })),
    // });

    return member ? member.role : null;
  }

  /**
   * Check if user is admin or co-admin
   */
  private isAdminOrCoAdmin(
    classroom: ClassroomDocument,
    userId: string,
  ): boolean {
    const role = this.getUserRole(classroom, userId);
    return role === ClassroomRole.ADMIN || role === ClassroomRole.CO_ADMIN;
  }

  /**
   * Format classroom response with populated user data
   */
  private async formatClassroomResponse(
    classroom: ClassroomDocument,
    currentUserId: string,
  ) {
    // ✅ Get myRole BEFORE population
    const myRole = this.getUserRole(classroom, currentUserId);

    // Check if members are already populated
    const isPopulated =
      classroom.members.length > 0 &&
      typeof classroom.members[0].userId === 'object' &&
      'name' in classroom.members[0].userId;

    // ✅ Clone members array to preserve original structure
    const originalMembers = [...classroom.members];

    // Populate members with user data if not already populated
    if (!isPopulated) {
      await classroom.populate('members.userId');
    }

    // ✅ Format members using original array to preserve role data
    const formattedMembers = originalMembers.map((originalMember, index) => {
      const populatedMember = classroom.members[index] as any;
      const user = populatedMember.userId;

      return {
        user: {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        role: originalMember.role, // ✅ Use original role
        isBlocked: originalMember.isBlocked,
        blockedBy: originalMember.blockedBy?.toString(),
        blockedAt: originalMember.blockedAt,
        joinedAt: originalMember.joinedAt,
      };
    });

    // ✅ Check if current user is blocked
    const currentMember = classroom.members.find((m: any) => {
      const memberUserId =
        m.userId instanceof Types.ObjectId
          ? m.userId.toString()
          : m.userId._id?.toString() || m.userId;
      return memberUserId === currentUserId.toString();
    });

    const isBlocked = currentMember?.isBlocked || false;

    // Format events: hide if blocked
    let formattedEvents: any[] = [];
    if (!isBlocked) {
      formattedEvents = classroom.events.map((event: any) => ({
        _id: event._id.toString(),
        type: event.type,
        title: event.title,
        date: event.date,
        startAt: event.startAt,
        endAt: event.endAt,
        location: event.location,
        topics: event.topics,
        materials: event.materials.map((m: any) => ({
          _id: m._id.toString(),
          name: m.name,
          type: m.type,
          url: m.url,
        })),
        isCompleted: event.isCompleted,
        createdBy: event.createdBy.toString(),
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
      }));
    }

    return {
      _id: classroom._id.toString(),
      name: classroom.name,
      description: classroom.description,
      institute: classroom.institute,
      department: classroom.department,
      intake: classroom.intake,
      section: classroom.section,
      joinCode:
        myRole === ClassroomRole.ADMIN || myRole === ClassroomRole.CO_ADMIN
          ? classroom.joinCode
          : undefined,
      isJoinCodeActive: classroom.isJoinCodeActive,
      createdBy: classroom.createdBy.toString(),
      members:
        myRole === ClassroomRole.ADMIN || myRole === ClassroomRole.CO_ADMIN
          ? formattedMembers
          : [],
      events: formattedEvents,
      isBlocked, // ✅ Include blocked status for UI
      isActive: classroom.isActive,
      isArchived: classroom.isArchived,
      coverImage: classroom.coverImage,
      totalMembers: classroom.totalMembers,
      totalEvents: classroom.totalEvents,
      myRole, // ✅ Use pre-population role
      createdAt: classroom.createdAt,
      updatedAt: classroom.updatedAt,
    };
  }

  /**
   * Create a new classroom
   */
  async create(createClassroomDto: CreateClassroomDto, userId: string) {
    const joinCode = await this.generateJoinCode();

    const classroom = await this.classroomModel.create({
      ...createClassroomDto,
      joinCode,
      createdBy: new Types.ObjectId(userId),
      members: [
        {
          userId: new Types.ObjectId(userId),
          role: ClassroomRole.ADMIN,
          isBlocked: false,
          joinedAt: new Date(),
        },
      ],
    });

    // console.log('Created classroom members:', classroom.members);

    // Add classroom to user's classrooms array
    await this.userModel.findByIdAndUpdate(userId, {
      $addToSet: { classrooms: classroom._id },
    });

    const formattedClassroom = await this.formatClassroomResponse(
      classroom,
      userId,
    );

    return {
      message: 'Classroom created successfully',
      classroom: formattedClassroom,
    };
  }

  /**
   * Join a classroom using join code
   */
  async joinClassroom(joinClassroomDto: JoinClassroomDto, userId: string) {
    const { joinCode } = joinClassroomDto;

    const classroom = await this.classroomModel.findOne({
      joinCode: joinCode.toUpperCase(),
      isActive: true,
      isJoinCodeActive: true,
    });

    if (!classroom) {
      throw new NotFoundException('Invalid or inactive join code');
    }

    // Check if user is already a member
    const existingMember = classroom.members.find((m) => {
      const memberUserId =
        m.userId instanceof Types.ObjectId
          ? m.userId.toString()
          : String(m.userId);
      return memberUserId === userId.toString();
    });

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
    } as ClassroomMember);

    await classroom.save();

    // Add classroom to user's classrooms array
    await this.userModel.findByIdAndUpdate(userId, {
      $addToSet: { classrooms: classroom._id },
    });

    const formattedClassroom = await this.formatClassroomResponse(
      classroom,
      userId,
    );

    return {
      message: 'Successfully joined classroom',
      classroom: formattedClassroom,
    };
  }

  /**
   * Get all classrooms for current user
   */
  async findUserClassrooms(userId: string) {
    const classrooms = await this.classroomModel
      .find({
        'members.userId': new Types.ObjectId(userId),
        isActive: true,
      })
      .select(
        'name institute department intake section totalMembers totalEvents members',
      );

    const formattedClassrooms = classrooms.map((classroom) => {
      const member = classroom.members.find((m) => {
        const memberUserId =
          m.userId instanceof Types.ObjectId
            ? m.userId.toString()
            : String(m.userId);
        return memberUserId === userId.toString();
      });

      return {
        _id: classroom._id.toString(),
        name: classroom.name,
        institute: classroom.institute,
        department: classroom.department,
        intake: classroom.intake,
        section: classroom.section,
        totalMembers: classroom.totalMembers,
        totalEvents: classroom.totalEvents,
        myRole: member?.role ?? ClassroomRole.MEMBER,
        joinedAt: member?.joinedAt,
      };
    });

    return {
      classrooms: formattedClassrooms,
    };
  }

  /**
   * Get single classroom details
   */
  async findOne(classroomId: string, userId: string) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    // Check if user is a member
    const isMember = classroom.members.some((m) => {
      const memberUserId =
        m.userId instanceof Types.ObjectId
          ? m.userId.toString()
          : String(m.userId);
      return memberUserId === userId.toString();
    });

    if (!isMember) {
      throw new ForbiddenException('You are not a member of this classroom');
    }

    const formattedClassroom = await this.formatClassroomResponse(
      classroom,
      userId,
    );

    return {
      classroom: formattedClassroom,
    };
  }

  /**
   * Update classroom details
   */
  async update(
    classroomId: string,
    updateClassroomDto: UpdateClassroomDto,
    userId: string,
  ) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    if (!this.isAdminOrCoAdmin(classroom, userId)) {
      throw new ForbiddenException('Only admins can update classroom details');
    }

    Object.assign(classroom, updateClassroomDto);
    await classroom.save();

    const formattedClassroom = await this.formatClassroomResponse(
      classroom,
      userId,
    );

    return {
      message: 'Classroom updated successfully',
      classroom: formattedClassroom,
    };
  }

  /**
   * Leave a classroom
   */
  async leaveClassroom(classroomId: string, userId: string) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    // Can't leave if you're the creator
    if (classroom.createdBy.toString() === userId.toString()) {
      throw new BadRequestException(
        'Creator cannot leave the classroom. Delete it instead.',
      );
    }

    classroom.members = classroom.members.filter((m) => {
      const memberUserId =
        m.userId instanceof Types.ObjectId
          ? m.userId.toString()
          : String(m.userId);
      return memberUserId !== userId.toString();
    });

    await classroom.save();

    // Remove classroom from user's classrooms array
    await this.userModel.findByIdAndUpdate(userId, {
      $pull: { classrooms: classroom._id },
    });

    return {
      message: 'Successfully left the classroom',
    };
  }

  /**
   * Regenerate join code
   */
  async regenerateJoinCode(classroomId: string, userId: string) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    if (!this.isAdminOrCoAdmin(classroom, userId)) {
      throw new ForbiddenException('Only admins can regenerate join code');
    }

    classroom.joinCode = await this.generateJoinCode();
    await classroom.save();

    return {
      message: 'Join code regenerated successfully',
      joinCode: classroom.joinCode,
    };
  }

  /**
   * Delete classroom
   */
  async delete(classroomId: string, userId: string) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    if (classroom.createdBy.toString() !== userId.toString()) {
      throw new ForbiddenException('Only the creator can delete the classroom');
    }

    // Remove classroom from all users' classrooms array
    const memberIds = classroom.members.map((m) => m.userId);
    await this.userModel.updateMany(
      { _id: { $in: memberIds } },
      { $pull: { classrooms: classroom._id } },
    );

    await classroom.deleteOne();

    return {
      message: 'Classroom deleted successfully',
    };
  }
}
