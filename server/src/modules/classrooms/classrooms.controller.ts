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

@Controller('classrooms')
@UseGuards(JwtAuthGuard)
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @Post()
  create(
    @Body() createClassroomDto: CreateClassroomDto,
    @CurrentUser() user: any,
  ) {
    return this.classroomsService.create(createClassroomDto, user.userId);
  }

  @Get('my')
  findUserClassrooms(@CurrentUser() user: any) {
    return this.classroomsService.findUserClassrooms(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.classroomsService.findOne(id, user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClassroomDto: UpdateClassroomDto,
    @CurrentUser() user: any,
  ) {
    return this.classroomsService.update(id, updateClassroomDto, user.userId);
  }

  @Post('join')
  joinClassroom(
    @Body() joinClassroomDto: JoinClassroomDto,
    @CurrentUser() user: any,
  ) {
    return this.classroomsService.joinClassroom(joinClassroomDto, user.userId);
  }

  @Patch(':id/assign-role')
  assignRole(
    @Param('id') id: string,
    @Body() assignAdminDto: AssignAdminDto,
    @CurrentUser() user: any,
  ) {
    return this.classroomsService.assignRole(id, assignAdminDto, user.userId);
  }

  @Patch(':id/members/block')
  blockMember(
    @Param('id') id: string,
    @Body() blockMemberDto: BlockMemberDto,
    @CurrentUser() user: any,
  ) {
    return this.classroomsService.blockMember(id, blockMemberDto, user.userId);
  }

  @Patch(':id/members/unblock')
  unblockMember(
    @Param('id') id: string,
    @Body() blockMemberDto: BlockMemberDto,
    @CurrentUser() user: any,
  ) {
    return this.classroomsService.unblockMember(id, blockMemberDto, user.userId);
  }

  @Get(':id/members/blocked')
  getBlockedMembers(@Param('id') id: string, @CurrentUser() user: any) {
    return this.classroomsService.getBlockedMembers(id, user.userId);
  }

  @Delete(':id/members/:memberId')
  removeMember(
    @Param('id') id: string,
    @Param('memberId') memberId: string,
    @CurrentUser() user: any,
  ) {
    return this.classroomsService.removeMember(id, memberId, user.userId);
  }

  @Post(':id/leave')
  leaveClassroom(@Param('id') id: string, @CurrentUser() user: any) {
    return this.classroomsService.leaveClassroom(id, user.userId);
  }

  @Post(':id/regenerate-code')
  regenerateJoinCode(@Param('id') id: string, @CurrentUser() user: any) {
    return this.classroomsService.regenerateJoinCode(id, user.userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @CurrentUser() user: any) {
    return this.classroomsService.delete(id, user.userId);
  }
}