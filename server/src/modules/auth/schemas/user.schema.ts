import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '@/common/enums/user-role.enum';

export type UserDocument = User & Document;

@Schema({ 
  timestamps: true,
  discriminatorKey: 'role',
})
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, enum: UserRole })
  role: UserRole;

  @Prop()
  avatarUrl?: string;

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop()
  phoneNumber?: string;

  @Prop()
  dateOfBirth?: Date;

  @Prop({ enum: ['male', 'female', 'other'] })
  gender?: string;

  @Prop()
  address?: string;

  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Index for performance
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });