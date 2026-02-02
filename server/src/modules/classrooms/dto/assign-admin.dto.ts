import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { ClassroomRole } from '../schemas/classroom.schema';

export class AssignAdminDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsEnum([ClassroomRole.CO_ADMIN, ClassroomRole.MEMBER])
  role: ClassroomRole;
}
