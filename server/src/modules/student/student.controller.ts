import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@/common/enums/user-role.enum';

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.CO_ADMIN)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.CO_ADMIN)
  findAll(@Query() query: any) {
    return this.studentService.findAll(query);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.CO_ADMIN)
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.CO_ADMIN)
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Patch(':id/block')
  @Roles(UserRole.ADMIN, UserRole.CO_ADMIN)
  block(@Param('id') id: string) {
    return this.studentService.block(id);
  }

  @Patch(':id/unblock')
  @Roles(UserRole.ADMIN, UserRole.CO_ADMIN)
  unblock(@Param('id') id: string) {
    return this.studentService.unblock(id);
  }
}