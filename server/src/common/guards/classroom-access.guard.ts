import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Classroom,
  ClassroomDocument,
} from '../../modules/classrooms/schemas/classroom.schema';

@Injectable()
export class ClassroomAccessGuard implements CanActivate {
  constructor(
    @InjectModel(Classroom.name)
    private classroomModel: Model<ClassroomDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.userId;
    const classroomId = request.params.id;

    if (!userId || !classroomId) {
      return true; // Let other guards handle this
    }

    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      return true; // Let controller handle not found
    }

    // Check if user is blocked in this classroom
    const member = classroom.members.find(
      (m) => m.userId.toString() === userId,
    );

    if (member?.isBlocked) {
      throw new ForbiddenException(
        'You are blocked from accessing this classroom',
      );
    }

    return true;
  }
}
