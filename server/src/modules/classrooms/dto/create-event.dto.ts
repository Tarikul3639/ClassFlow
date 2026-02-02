import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

class MaterialDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['pdf', 'docx', 'image'])
  type: 'pdf' | 'docx' | 'image';

  @IsOptional()
  @IsString()
  url?: string;
}

export class CreateEventDto {
  @IsEnum(['quiz', 'assignment', 'presentation', 'ct', 'lab', 'seminar', 'lecture', 'class'])
  @IsNotEmpty()
  type: 'quiz' | 'assignment' | 'presentation' | 'ct' | 'lab' | 'seminar' | 'lecture' | 'class';

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  date: string; // ISO date: "2026-01-23"

  @IsString()
  @IsNotEmpty()
  startAt: string; // ISO datetime: "2026-01-23T10:00"

  @IsOptional()
  @IsString()
  endAt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  location?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  topics?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MaterialDto)
  materials?: MaterialDto[];

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}