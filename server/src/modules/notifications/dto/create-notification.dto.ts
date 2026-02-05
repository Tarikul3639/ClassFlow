import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { NotificationType } from '../schemas/notification.schema';

export class CreateNotificationDto {
  @IsMongoId()
  userId: string;

  @IsMongoId()
  classroomId: string;

  @IsMongoId()
  @IsOptional()
  referenceId?: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsString()
  @IsOptional()
  redirectUrl?: string;
}
