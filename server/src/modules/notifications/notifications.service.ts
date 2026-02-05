import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Notification,
  NotificationDocument,
} from './schemas/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  /**
   * Create a new notification
   */
  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    console.log('🔔 Creating notification:', createNotificationDto);
    
    // Convert string IDs to ObjectId
    const notificationData = {
      ...createNotificationDto,
      userId: new Types.ObjectId(createNotificationDto.userId),
      classroomId: new Types.ObjectId(createNotificationDto.classroomId),
      referenceId: createNotificationDto.referenceId 
        ? new Types.ObjectId(createNotificationDto.referenceId) 
        : undefined,
    };
    
    const notification = new this.notificationModel(notificationData);
    const saved = await notification.save();
    console.log('✅ Notification saved:', saved._id);
    return saved;
  }

  /**
   * Get all notifications for a user
   */
  async findByUserId(
    userId: string,
    limit = 50,
    skip = 0,
  ): Promise<Notification[]> {
    return this.notificationModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('classroomId', 'name')
      .exec();
  }

  /**
   * Get unread notifications for a user
   */
  async findUnreadByUserId(userId: string): Promise<Notification[]> {
    return this.notificationModel
      .find({
        userId: new Types.ObjectId(userId),
        // isRead: false,
      })
      .sort({ createdAt: -1 })
      .populate('classroomId', 'name')
      .exec();
  }

  /**
   * Get unread count for a user
   */
  async getUnreadCount(userId: string): Promise<number> {
    return this.notificationModel.countDocuments({
      userId: new Types.ObjectId(userId),
      isRead: false,
    });
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string): Promise<Notification | null> {
    return this.notificationModel.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true },
    );
  }

  /**
   * Mark all notifications as read for a user
   */
  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationModel.updateMany(
      { userId: new Types.ObjectId(userId), isRead: false },
      { isRead: true },
    );
  }

  /**
   * Delete a notification
   */
  async delete(notificationId: string): Promise<void> {
    await this.notificationModel.findByIdAndDelete(notificationId);
  }

  /**
   * Delete all notifications for a user in a classroom
   */
  async deleteByClassroom(
    userId: string,
    classroomId: string,
  ): Promise<void> {
    await this.notificationModel.deleteMany({
      userId: new Types.ObjectId(userId),
      classroomId: new Types.ObjectId(classroomId),
    });
  }
}
