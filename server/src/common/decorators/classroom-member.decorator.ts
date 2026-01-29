import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ClassroomAccessGuard } from '../guards/classroom-access.guard';

/**
 * Decorator to check if user is authenticated and a member of classroom
 * Use on routes that access a specific classroom by :id param
 */
export function ClassroomMember() {
  return applyDecorators(
    UseGuards(JwtAuthGuard, ClassroomAccessGuard)
  );
}