import { IsMongoId, IsNotEmpty } from 'class-validator';

export class BlockMemberDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}
