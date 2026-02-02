import { PartialType } from '@nestjs/mapped-types';
import { CreateClassroomDto } from './create-classroom.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateClassroomDto extends PartialType(CreateClassroomDto) {
  @IsOptional()
  @IsBoolean()
  isJoinCodeActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;
}
