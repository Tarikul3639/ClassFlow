import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as webpush from 'web-push';
import {
  PushSubscription,
  PushSubscriptionDocument,
} from './schemas/push-subscription.schema';

@Injectable()
export class PushNotificationService {
  constructor(
    @InjectModel(PushSubscription.name)
    private pushSubscriptionModel: Model<PushSubscriptionDocument>,
  ) {
    // Configure web-push with VAPID keys
    webpush.setVapidDetails(
      'mailto:your-email@example.com',
      process.env.VAPID_PUBLIC_KEY ||
        'BOkAht7fb7lKP5qMV04EikoqEUCnFcdtwAvHPj8wJNgf5Xae4tN5ws_9FCeBQyHB3BDkBzk9635FF05-_xYPyJ4',
      process.env.VAPID_PRIVATE_KEY ||
        'SaySEz8cEhWIj7laJr8fjf9mmqDoAL9pRFS88nxXkbU',
    );
  }

  /**
   * Subscribe user to push notifications
   */
  async subscribe(userId: string, subscription: any) {
    try {
      const pushSubscription = await this.pushSubscriptionModel.findOneAndUpdate(
        {
          userId: new Types.ObjectId(userId),
          endpoint: subscription.endpoint,
        },
        {
          userId: new Types.ObjectId(userId),
          endpoint: subscription.endpoint,
          keys: subscription.keys,
          isActive: true,
        },
        { upsert: true, new: true },
      );

      console.log('✅ Push subscription saved for user:', userId);
      return pushSubscription;
    } catch (error) {
      console.error('❌ Failed to save push subscription:', error);
      throw error;
    }
  }

  /**
   * Unsubscribe user from push notifications
   */
  async unsubscribe(userId: string, endpoint: string) {
    await this.pushSubscriptionModel.findOneAndUpdate(
      {
        userId: new Types.ObjectId(userId),
        endpoint,
      },
      { isActive: false },
    );
  }

  /**
   * Send push notification to user
   */
  async sendPushToUser(
    userId: string,
    title: string,
    body: string,
    data?: any,
  ) {
    try {
      const subscriptions = await this.pushSubscriptionModel.find({
        userId: new Types.ObjectId(userId),
        isActive: true,
      });

      const payload = JSON.stringify({
        title,
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        data: data || {},
      });

      const sendPromises = subscriptions.map((sub) =>
        webpush
          .sendNotification(
            {
              endpoint: sub.endpoint,
              keys: {
                p256dh: sub.keys.p256dh,
                auth: sub.keys.auth,
              },
            },
            payload,
          )
          .catch((error) => {
            console.error('❌ Push notification failed:', error);
            // If subscription is invalid, mark as inactive
            if (error.statusCode === 410) {
              this.pushSubscriptionModel
                .findByIdAndUpdate(sub._id, { isActive: false })
                .exec();
            }
          }),
      );

      await Promise.all(sendPromises);
      console.log(
        `📤 Push notifications sent to ${subscriptions.length} device(s) for user:`,
        userId,
      );
    } catch (error) {
      console.error('❌ Failed to send push notifications:', error);
    }
  }

  /**
   * Send push notification to multiple users
   */
  async sendPushToUsers(
    userIds: string[],
    title: string,
    body: string,
    data?: any,
  ) {
    const promises = userIds.map((userId) =>
      this.sendPushToUser(userId, title, body, data),
    );
    await Promise.all(promises);
  }
}
