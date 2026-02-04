import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ type: String, default: null })
  avatarUrl?: string | null;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Classroom' }], default: [] })
  classrooms: Types.ObjectId[];

  // Password reset fields
  @Prop({ select: false })
  passwordResetToken?: string;

  @Prop({ select: false })
  passwordResetExpires?: Date;

  // Activity tracking fields (optional)
  @Prop()
  lastLoginAt?: Date;

  @Prop()
  lastLogoutAt?: Date;

  // Timestamps (automatically added by timestamps: true)
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Indexes for performance
UserSchema.index({ email: 1 });
UserSchema.index({ passwordResetToken: 1 });