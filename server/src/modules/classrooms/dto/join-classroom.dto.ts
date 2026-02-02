import { IsNotEmpty, IsString, Length } from 'class-validator';

export class JoinClassroomDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 8)
  joinCode: string;
}
