import { Injectable, ForbiddenException } from '@nestjs/common';
import { ClassroomDocument, ClassroomRole } from '../schemas/classroom.schema';

@Injectable()
export class ClassroomHelperService {
  /**
   * Generate unique 6-character join code
   */
  async generateJoinCode(classroomModel: any): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code: string = '';
    let exists = true;

    while (exists) {
      code = '';
      for (let i = 0; i < 6; i++) {
        code += characters.charAt(
          Math.floor(Math.random() * characters.length),
        );
      }
      exists = !!(await classroomModel.exists({ joinCode: code }));
    }

    return code;
  }

  /**
   * Check if user has admin privileges (admin or co-admin) and not blocked
   */
  checkAdminPrivileges(classroom: ClassroomDocument, userId: string): void {
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

  /**
   * Check if user is member and not blocked
   */
  checkMemberAccess(classroom: any, userId: string): void {
    const member = classroom.members.find(
      (m: any) =>
        m.userId.toString() === userId || m.userId._id?.toString() === userId,
    );

    if (!member) {
      throw new ForbiddenException('You are not a member of this classroom');
    }

    if (member.isBlocked) {
      throw new ForbiddenException('You are blocked from this classroom');
    }
  }

  /**
   * Check if user is blocked in classroom
   */
  isUserBlockedInClassroom(
    classroom: ClassroomDocument,
    userId: string,
  ): boolean {
    const member = classroom.members.find(
      (m) => m.userId.toString() === userId,
    );
    return member?.isBlocked || false;
  }

  /**
   * Populate classroom with related data
   */
  async populateClassroom(classroom: ClassroomDocument) {
    return classroom
      .populate('createdBy', 'name email avatarUrl')
      .then((doc) => doc.populate('members.userId', 'name email avatarUrl'))
      .then((doc) => doc.populate('members.blockedBy', 'name email'));
  }

  /**
   * Format classroom response with user role
   */
  formatClassroomResponse(classroom: any, userId: string) {
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
}
