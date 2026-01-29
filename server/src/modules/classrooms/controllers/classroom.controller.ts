import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { ClassroomMember } from '../../../common/decorators/classroom-member.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { ClassroomService } from '../services/classroom.service';
import { CreateClassroomDto } from '../dto/create-classroom.dto';
import { UpdateClassroomDto } from '../dto/update-classroom.dto';
import { JoinClassroomDto } from '../dto/join-classroom.dto';

@Controller('classrooms')
@UseGuards(JwtAuthGuard)
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  /**
   * Create a new classroom
   * @route POST /classrooms
   */
  @Post()
  create(
    @Body() createClassroomDto: CreateClassroomDto,
    @CurrentUser() user: any,
  ) {
    return this.classroomService.create(createClassroomDto, user.userId);
  }

  /**
   * Join a classroom using join code
   * @route POST /classrooms/join
   */
  @Post('join')
  joinClassroom(
    @Body() joinClassroomDto: JoinClassroomDto,
    @CurrentUser() user: any,
  ) {
    return this.classroomService.joinClassroom(joinClassroomDto, user.userId);
  }

  /**
   * Get all classrooms for current user
   * @route GET /classrooms/my
   */
  @Get('my')
  findUserClassrooms(@CurrentUser() user: any) {
    return this.classroomService.findUserClassrooms(user.userId);
  }

  /**
   * Get single classroom details
   * @route GET /classrooms/:id
   */
  @Get(':id')
  @ClassroomMember()
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.classroomService.findOne(id, user.userId);
  }

  /**
   * Update classroom details (Admin/Co-admin only)
   * @route PATCH /classrooms/:id
   */
  @Patch(':id')
  @ClassroomMember()
  update(
    @Param('id') id: string,
    @Body() updateClassroomDto: UpdateClassroomDto,
    @CurrentUser() user: any,
  ) {
    return this.classroomService.update(id, updateClassroomDto, user.userId);
  }

  /**
   * Leave a classroom
   * @route POST /classrooms/:id/leave
   */
  @Post(':id/leave')
  @ClassroomMember()
  leaveClassroom(@Param('id') id: string, @CurrentUser() user: any) {
    return this.classroomService.leaveClassroom(id, user.userId);
  }

  /**
   * Regenerate join code (Admin/Co-admin only)
   * @route POST /classrooms/:id/regenerate-code
   */
  @Post(':id/regenerate-code')
  @ClassroomMember()
  regenerateJoinCode(@Param('id') id: string, @CurrentUser() user: any) {
    return this.classroomService.regenerateJoinCode(id, user.userId);
  }

  /**
   * Delete classroom (Creator only)
   * @route DELETE /classrooms/:id
   */
  @Delete(':id')
  @ClassroomMember()
  delete(@Param('id') id: string, @CurrentUser() user: any) {
    return this.classroomService.delete(id, user.userId);
  }
}