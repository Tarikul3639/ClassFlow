import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Classroom, ClassroomDocument } from '../schemas/classroom.schema';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { ClassroomHelperService } from './classroom-helper.service';

@Injectable()
export class ClassroomEventService {
  constructor(
    @InjectModel(Classroom.name) private classroomModel: Model<ClassroomDocument>,
    private helperService: ClassroomHelperService,
  ) {}

  async createEvent(
    classroomId: string,
    createEventDto: CreateEventDto,
    userId: string,
  ) {
    const classroom = await this.classroomModel.findById(classroomId);

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

    return {
      message: 'Event created successfully',
      event: classroom.events[classroom.events.length - 1],
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

    const event = classroom.events.find((e: any) => e._id.toString() === eventId);

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

    const event = classroom.events.find((e: any) => e._id.toString() === eventId);

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

    const event = classroom.events.find((e: any) => e._id.toString() === eventId);

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