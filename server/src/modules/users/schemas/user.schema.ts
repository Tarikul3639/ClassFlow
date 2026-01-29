import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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

  @Prop({ default: null })
  avatarUrl?: string;

  @Prop({ default: false })
  isBlocked: boolean;

  // References to classrooms the user is associated with
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Classroom' }],
    default: [],
  })
  classrooms: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Indexes for performance
UserSchema.index({ email: 1 });
UserSchema.index({ classrooms: 1 });