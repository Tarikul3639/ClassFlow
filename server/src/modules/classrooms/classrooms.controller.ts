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
import { ClassroomsService } from './classrooms.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { JoinClassroomDto } from './dto/join-classroom.dto';
import { AssignAdminDto } from './dto/assign-admin.dto';
import { BlockMemberDto } from './dto/block-member.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ClassroomMember } from '../../common/decorators/classroom-member.decorator';

@Controller('classrooms')
@UseGuards(JwtAuthGuard)
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  // No ClassroomAccessGuard - creating new classroom
  @Post()
  create(
    @Body() createClassroomDto: CreateClassroomDto,
    @CurrentUser() user: any,
  ) {
    return this.classroomsService.create(createClassroomDto, user.userId);
  }

  // No ClassroomAccessGuard - joining with code
  @Post('join')
  joinClassroom(
    @Body() joinClassroomDto: JoinClassroomDto,
    @CurrentUser() user: any,
  ) {
    return this.classroomsService.joinClassroom(joinClassroomDto, user.userId);
  }

  // No ClassroomAccessGuard - getting user's own classrooms
  @Get('my')
  findUserClassrooms(@CurrentUser() user: any) {
    return this.classroomsService.findUserClassrooms(user.userId);
  }

  // ✅ Use ClassroomAccessGuard for routes accessing specific classroom
  @Get(':id')
  @ClassroomMember()
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.classroomsService.findOne(id, user.userId);
  }

  @Patch(':id')
  @ClassroomMember()
  update(
    @Param('id') id: string,
    @Body() updateClassroomDto: UpdateClassroomDto,
    @CurrentUser() user: any,
  ) {
    return this.classroomsService.update(id, updateClassroomDto, user.userId);
  }

  @Patch(':id/assign-role')
  @ClassroomMember()
  assignRole(
    @Param('id') id: string,
    @Body() assignAdminDto: AssignAdminDto,
    @CurrentUser() user: any,
  ) {
    return this.classroomsService.assignRole(id, assignAdminDto, user.userId);
  }

  @Patch(':id/members/block')
  @ClassroomMember()
  blockMember(
    @Param('id') id: string,
    @Body() blockMemberDto: BlockMemberDto,
    @CurrentUser() user: any,
  ) {
    return this.classroomsService.blockMember(id, blockMemberDto, user.userId);
  }

  @Patch(':id/members/unblock')
  @ClassroomMember()
  unblockMember(
    @Param('id') id: string,
    @Body() blockMemberDto: BlockMemberDto,
    @CurrentUser() user: any,
  ) {
    return this.classroomsService.unblockMember(id, blockMemberDto, user.userId);
  }

  @Get(':id/members/blocked')
  @ClassroomMember()
  getBlockedMembers(@Param('id') id: string, @CurrentUser() user: any) {
    return this.classroomsService.getBlockedMembers(id, user.userId);
  }

  @Delete(':id/members/:memberId')
  @ClassroomMember()
  removeMember(
    @Param('id') id: string,
    @Param('memberId') memberId: string,
    @CurrentUser() user: any,
  ) {
    return this.classroomsService.removeMember(id, memberId, user.userId);
  }

  @Post(':id/leave')
  @ClassroomMember()
  leaveClassroom(@Param('id') id: string, @CurrentUser() user: any) {
    return this.classroomsService.leaveClassroom(id, user.userId);
  }

  @Post(':id/regenerate-code')
  @ClassroomMember()
  regenerateJoinCode(@Param('id') id: string, @CurrentUser() user: any) {
    return this.classroomsService.regenerateJoinCode(id, user.userId);
  }

  @Delete(':id')
  @ClassroomMember()
  delete(@Param('id') id: string, @CurrentUser() user: any) {
    return this.classroomsService.delete(id, user.userId);
  }
}