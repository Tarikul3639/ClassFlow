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
  @UseGuards(JwtAuthGuard)
  joinClassroom(
    @Body() joinClassroomDto: JoinClassroomDto,
    @CurrentUser() user: any,
  ) {
    return this.classroomService.joinClassroom(joinClassroomDto, user.userId);
  }

  /**
   * Get current user's classroom (first/active one)
   * @route GET /classrooms
   */
  @Get()
  async getCurrentClassroom(@CurrentUser() user: any) {
    // Get user's classrooms
    const { classrooms } = await this.classroomService.findUserClassrooms(
      user.userId,
    );

    if (classrooms.length === 0) {
      return { classroom: null };
    }

    // Get full details of first classroom
    const firstClassroomId = classrooms[0]._id;
    return this.classroomService.findOne(firstClassroomId, user.userId);
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
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.classroomService.findOne(id, user.userId);
  }

  /**
   * Update classroom details (Admin/Co-admin only)
   * @route PATCH /classrooms/:id
   */
  @Patch(':id')
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
  leaveClassroom(@Param('id') id: string, @CurrentUser() user: any) {
    return this.classroomService.leaveClassroom(id, user.userId);
  }

  /**
   * Regenerate join code (Admin/Co-admin only)
   * @route POST /classrooms/:id/regenerate-code
   */
  @Post(':id/regenerate-code')
  regenerateJoinCode(@Param('id') id: string, @CurrentUser() user: any) {
    return this.classroomService.regenerateJoinCode(id, user.userId);
  }

  /**
   * Delete classroom (Creator only)
   * @route DELETE /classrooms/:id
   */
  @Delete(':id')
  delete(@Param('id') id: string, @CurrentUser() user: any) {
    return this.classroomService.delete(id, user.userId);
  }
}
