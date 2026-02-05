import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { Classroom, ClassroomDocument } from '../schemas/classroom.schema';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { ClassroomHelperService } from './classroom-helper.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { PushNotificationService } from '../../notifications/push-notification.service';
import { NotificationType } from '../../notifications/schemas/notification.schema';

@Injectable()
export class ClassroomEventService {
  constructor(
    @InjectModel(Classroom.name)
    private classroomModel: Model<ClassroomDocument>,
    private helperService: ClassroomHelperService,
    private notificationsService: NotificationsService,
    private pushNotificationService: PushNotificationService,
  ) {}

  async createEvent(
    classroomId: string,
    createEventDto: CreateEventDto,
    userId: string,
  ) {
    const classroom = await this.classroomModel.findById(classroomId);
    console.log('create: ', classroom);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    this.helperService.checkAdminPrivileges(classroom, userId);

    const event = {
      ...createEventDto,
      createdBy: new Types.ObjectId(userId),
    };

    classroom.events.push(event as any);
    await classroom.save();

    const createdEvent = classroom.events[classroom.events.length - 1];

    // 🔔 Send notifications to all classroom members (except creator)
    const memberIds = classroom.members
      .map((m) => m.userId.toString())
      .filter((id) => id !== userId);

    console.log('👥 Total members:', classroom.members.length);
    console.log('👤 Creator ID:', userId);
    console.log('📨 Sending notifications to:', memberIds.length, 'members');

    const notificationPromises = memberIds.map((memberId) =>
      this.notificationsService.create({
        userId: memberId,
        classroomId: classroomId,
        referenceId: (createdEvent as any)._id.toString(),
        type: NotificationType.EVENT_CREATED,
        title: 'New Event Created',
        message: `${createEventDto.title} has been scheduled for ${new Date(createEventDto.date).toLocaleDateString()}`,
        redirectUrl: `/classroom/${classroomId}`,
      }),
    );

    // Send notifications in parallel (don't wait)
    Promise.all(notificationPromises).catch((err) =>
      console.error('❌ Failed to send notifications:', err),
    );

    // 🔔 Send push notifications to members
    this.pushNotificationService
      .sendPushToUsers(
        memberIds,
        'New Event Created',
        `${createEventDto.title} has been scheduled for ${new Date(createEventDto.date).toLocaleDateString()}`,
        {
          redirectUrl: `/classroom/${classroomId}`,
          eventId: (createdEvent as any)._id.toString(),
        },
      )
      .catch((err) => console.error('❌ Failed to send push notifications:', err));

    return {
      message: 'Event created successfully',
      event: createdEvent,
    };
  }

  async getEvents(classroomId: string, userId: string, query?: any) {
    const classroom = await this.classroomModel
      .findById(classroomId)
      .populate('events.createdBy', 'name email avatarUrl')
      .lean();

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    this.helperService.checkMemberAccess(classroom, userId);

    let events = classroom.events;

    if (query?.type) {
      events = events.filter((e: any) => e.type === query.type);
    }

    if (query?.isCompleted !== undefined) {
      const isCompleted = query.isCompleted === 'true';
      events = events.filter((e: any) => e.isCompleted === isCompleted);
    }

    if (query?.startDate && query?.endDate) {
      events = events.filter(
        (e: any) => e.date >= query.startDate && e.date <= query.endDate,
      );
    }

    events.sort((a: any, b: any) => a.startAt.localeCompare(b.startAt));

    return {
      classroomId: classroom._id,
      classroomName: classroom.name,
      totalEvents: events.length,
      events,
    };
  }

  async getEvent(classroomId: string, eventId: string, userId: string) {
    const classroom = await this.classroomModel
      .findById(classroomId)
      .populate('events.createdBy', 'name email avatarUrl')
      .lean();

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    this.helperService.checkMemberAccess(classroom, userId);

    const event = classroom.events.find(
      (e: any) => e._id.toString() === eventId,
    );

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async updateEvent(
    classroomId: string,
    eventId: string,
    updateEventDto: UpdateEventDto,
    userId: string,
  ) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    this.helperService.checkAdminPrivileges(classroom, userId);

    const event = classroom.events.find(
      (e: any) => e._id.toString() === eventId,
    );

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    Object.assign(event, updateEventDto);

    await classroom.save();

    return {
      message: 'Event updated successfully',
      event,
    };
  }

  async deleteEvent(classroomId: string, eventId: string, userId: string) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    this.helperService.checkAdminPrivileges(classroom, userId);

    const eventIndex = classroom.events.findIndex(
      (e: any) => e._id.toString() === eventId,
    );

    if (eventIndex === -1) {
      throw new NotFoundException('Event not found');
    }

    classroom.events.splice(eventIndex, 1);
    await classroom.save();

    return {
      eventId,
      success: true,
      message: 'Event deleted successfully',
    };
  }

  async markEventCompleted(
    classroomId: string,
    eventId: string,
    userId: string,
  ) {
    const classroom = await this.classroomModel.findById(classroomId);

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    this.helperService.checkAdminPrivileges(classroom, userId);

    const event = classroom.events.find(
      (e: any) => e._id.toString() === eventId,
    );

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    event.isCompleted = true;
    await classroom.save();

    return {
      message: 'Event marked as completed',
      event,
    };
  }

  async getUpcomingEvents(classroomId: string, userId: string) {
    const classroom = await this.classroomModel
      .findById(classroomId)
      .populate('events.createdBy', 'name email avatarUrl')
      .lean();

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    this.helperService.checkMemberAccess(classroom, userId);

    const now = new Date().toISOString();
    const upcomingEvents = classroom.events
      .filter((e: any) => e.startAt >= now && !e.isCompleted)
      .sort((a: any, b: any) => a.startAt.localeCompare(b.startAt));

    return {
      classroomId: classroom._id,
      classroomName: classroom.name,
      totalUpcomingEvents: upcomingEvents.length,
      upcomingEvents,
    };
  }
}
