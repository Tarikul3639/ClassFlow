import { IsOptional, IsString, IsUrl } from 'class-validator';

export class ProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  avatarUrl?: string;
}
