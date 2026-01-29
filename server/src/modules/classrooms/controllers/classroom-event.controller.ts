import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { ClassroomMember } from '../../../common/decorators/classroom-member.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { ClassroomEventService } from '../services/classroom-event.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';

@Controller('classrooms/:classroomId/events')
@UseGuards(JwtAuthGuard)
@ClassroomMember()
export class ClassroomEventController {
  constructor(private readonly eventService: ClassroomEventService) {}

  /**
   * Create a new event (Admin/Co-admin only)
   * @route POST /classrooms/:classroomId/events
   */
  @Post()
  createEvent(
    @Param('classroomId') classroomId: string,
    @Body() createEventDto: CreateEventDto,
    @CurrentUser() user: any,
  ) {
    return this.eventService.createEvent(classroomId, createEventDto, user.userId);
  }

  /**
   * Get all events in classroom
   * @route GET /classrooms/:classroomId/events
   * @query type - Filter by event type
   * @query isCompleted - Filter by completion status
   * @query startDate - Filter by start date
   * @query endDate - Filter by end date
   */
  @Get()
  getEvents(
    @Param('classroomId') classroomId: string,
    @Query() query: any,
    @CurrentUser() user: any,
  ) {
    return this.eventService.getEvents(classroomId, user.userId, query);
  }

  /**
   * Get upcoming events
   * @route GET /classrooms/:classroomId/events/upcoming
   */
  @Get('upcoming')
  getUpcomingEvents(
    @Param('classroomId') classroomId: string,
    @CurrentUser() user: any,
  ) {
    return this.eventService.getUpcomingEvents(classroomId, user.userId);
  }

  /**
   * Get single event details
   * @route GET /classrooms/:classroomId/events/:eventId
   */
  @Get(':eventId')
  getEvent(
    @Param('classroomId') classroomId: string,
    @Param('eventId') eventId: string,
    @CurrentUser() user: any,
  ) {
    return this.eventService.getEvent(classroomId, eventId, user.userId);
  }

  /**
   * Update event (Admin/Co-admin only)
   * @route PATCH /classrooms/:classroomId/events/:eventId
   */
  @Patch(':eventId')
  updateEvent(
    @Param('classroomId') classroomId: string,
    @Param('eventId') eventId: string,
    @Body() updateEventDto: UpdateEventDto,
    @CurrentUser() user: any,
  ) {
    return this.eventService.updateEvent(classroomId, eventId, updateEventDto, user.userId);
  }

  /**
   * Delete event (Admin/Co-admin only)
   * @route DELETE /classrooms/:classroomId/events/:eventId
   */
  @Delete(':eventId')
  deleteEvent(
    @Param('classroomId') classroomId: string,
    @Param('eventId') eventId: string,
    @CurrentUser() user: any,
  ) {
    return this.eventService.deleteEvent(classroomId, eventId, user.userId);
  }

  /**
   * Mark event as completed (Admin/Co-admin only)
   * @route PATCH /classrooms/:classroomId/events/:eventId/complete
   */
  @Patch(':eventId/complete')
  markEventCompleted(
    @Param('classroomId') classroomId: string,
    @Param('eventId') eventId: string,
    @CurrentUser() user: any,
  ) {
    return this.eventService.markEventCompleted(classroomId, eventId, user.userId);
  }
}