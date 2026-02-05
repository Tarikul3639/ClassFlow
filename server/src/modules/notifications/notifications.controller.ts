import {
  Controller,
  Get,
  Patch,
  Delete,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { PushNotificationService } from './push-notification.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  /**
   * Get unread count (MUST be before /unread route)
   */
  @Get('unread/count')
  @HttpCode(HttpStatus.OK)
  async getUnreadCount(@Req() req: RequestWithUser) {
    console.log('📥 GET /notifications/unread/count - User:', req.user.userId);
    const count = await this.notificationsService.getUnreadCount(
      req.user.userId,
    );
    console.log('📤 Unread count:', count);

    return {
      success: true,
      count,
    };
  }

  /**
   * Get unread notifications for current user
   */
  @Get('unread')
  @HttpCode(HttpStatus.OK)
  async getUnreadNotifications(@Req() req: RequestWithUser) {
    console.log('📥 GET /notifications/unread - User:', req.user.userId);
    const notifications =
      await this.notificationsService.findUnreadByUserId(req.user.userId);
    console.log('📤 Found unread notifications:', notifications.length);

    return {
      success: true,
      data: notifications,
    };
  }

  /**
   * Get all notifications for current user
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async getNotifications(
    @Req() req: RequestWithUser,
    @Query('limit') limit?: number,
    @Query('skip') skip?: number,
  ) {
    const notifications = await this.notificationsService.findByUserId(
      req.user.userId,
      limit || 50,
      skip || 0,
    );

    return {
      success: true,
      data: notifications,
    };
  }

  /**
   * Mark notification as read
   */
  @Patch(':id/read')
  @HttpCode(HttpStatus.OK)
  async markAsRead(@Param('id') id: string) {
    const notification = await this.notificationsService.markAsRead(id);

    return {
      success: true,
      data: notification,
    };
  }

  /**
   * Mark all notifications as read
   */
  @Patch('read-all')
  @HttpCode(HttpStatus.OK)
  async markAllAsRead(@Req() req: RequestWithUser) {
    await this.notificationsService.markAllAsRead(req.user.userId);

    return {
      success: true,
      message: 'All notifications marked as read',
    };
  }

  /**
   * Delete a notification
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteNotification(@Param('id') id: string) {
    await this.notificationsService.delete(id);

    return {
      success: true,
      message: 'Notification deleted',
    };
  }

  /**
   * Subscribe to push notifications
   */
  @Post('push/subscribe')
  @HttpCode(HttpStatus.OK)
  async subscribeToPush(
    @Req() req: RequestWithUser,
    @Body() subscription: any,
  ) {
    await this.pushNotificationService.subscribe(
      req.user.userId,
      subscription,
    );

    return {
      success: true,
      message: 'Push subscription successful',
    };
  }

  /**
   * Get VAPID public key
   */
  @Get('push/publickey')
  @HttpCode(HttpStatus.OK)
  async getVapidPublicKey() {
    return {
      success: true,
      publicKey:
        process.env.VAPID_PUBLIC_KEY ||
        'BOkAht7fb7lKP5qMV04EikoqEUCnFcdtwAvHPj8wJNgf5Xae4tN5ws_9FCeBQyHB3BDkBzk9635FF05-_xYPyJ4',
    };
  }
}
