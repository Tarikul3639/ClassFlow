import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
  IsMongoId,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserRole } from '../../../common/enums/user-role.enum';

class PermissionsDto {
  @IsBoolean()
  canCreateClassroom: boolean;

  @IsBoolean()
  canAssignAdmin: boolean;

  @IsBoolean()
  canRemoveAdmin: boolean;

  @IsBoolean()
  canManageStudents: boolean;

  @IsBoolean()
  canManageTeachers: boolean;

  @IsBoolean()
  canEditClassContent: boolean;
}

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum([UserRole.ADMIN, UserRole.CO_ADMIN])
  role: UserRole.ADMIN | UserRole.CO_ADMIN;

  @IsString()
  @IsNotEmpty()
  adminId: string;

  @ValidateNested()
  @Type(() => PermissionsDto)
  permissions: PermissionsDto;

  @IsOptional()
  @IsMongoId()
  instituteId?: string;

  @IsOptional()
  @IsMongoId()
  departmentId?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  classSectionIds?: string[];

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}