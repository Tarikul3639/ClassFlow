import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { ClassroomMember } from '../../../common/decorators/classroom-member.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { ClassroomMemberService } from '../services/classroom-member.service';
import { AssignAdminDto } from '../dto/assign-admin.dto';
import { BlockMemberDto } from '../dto/block-member.dto';

@Controller('classrooms/:classroomId/members')
@UseGuards(JwtAuthGuard)
@ClassroomMember()
export class ClassroomMemberController {
  constructor(private readonly memberService: ClassroomMemberService) {}

  /**
   * Assign role to a member (Admin only)
   * @route PATCH /classrooms/:classroomId/members/assign-role
   */
  @Patch('assign-role')
  assignRole(
    @Param('classroomId') classroomId: string,
    @Body() assignAdminDto: AssignAdminDto,
    @CurrentUser() user: any,
  ) {
    return this.memberService.assignRole(classroomId, assignAdminDto, user.userId);
  }

  /**
   * Block a member (Admin/Co-admin only)
   * @route PATCH /classrooms/:classroomId/members/block
   */
  @Patch('block')
  blockMember(
    @Param('classroomId') classroomId: string,
    @Body() blockMemberDto: BlockMemberDto,
    @CurrentUser() user: any,
  ) {
    return this.memberService.blockMember(classroomId, blockMemberDto, user.userId);
  }

  /**
   * Unblock a member (Admin/Co-admin only)
   * @route PATCH /classrooms/:classroomId/members/unblock
   */
  @Patch('unblock')
  unblockMember(
    @Param('classroomId') classroomId: string,
    @Body() blockMemberDto: BlockMemberDto,
    @CurrentUser() user: any,
  ) {
    return this.memberService.unblockMember(classroomId, blockMemberDto, user.userId);
  }

  /**
   * Get all blocked members (Admin/Co-admin only)
   * @route GET /classrooms/:classroomId/members/blocked
   */
  @Get('blocked')
  getBlockedMembers(
    @Param('classroomId') classroomId: string,
    @CurrentUser() user: any,
  ) {
    return this.memberService.getBlockedMembers(classroomId, user.userId);
  }

  /**
   * Remove a member from classroom (Admin/Co-admin only)
   * @route DELETE /classrooms/:classroomId/members/:memberId
   */
  @Delete(':memberId')
  removeMember(
    @Param('classroomId') classroomId: string,
    @Param('memberId') memberId: string,
    @CurrentUser() user: any,
  ) {
    return this.memberService.removeMember(classroomId, memberId, user.userId);
  }
}