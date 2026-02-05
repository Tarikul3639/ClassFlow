import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Event, EventSchema } from './event.schema';

export type ClassroomDocument = Classroom & Document;

// Enum for classroom member roles
export enum ClassroomRole {
  ADMIN = 'admin',
  CO_ADMIN = 'co_admin',
  MEMBER = 'member',
}

// Embedded schema for classroom members
@Schema({ _id: false })
export class ClassroomMember {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, enum: ClassroomRole })
  role: ClassroomRole;

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  blockedBy?: Types.ObjectId;

  @Prop()
  blockedAt?: Date;

  @Prop({ default: Date.now })
  joinedAt: Date;
}

const ClassroomMemberSchema = SchemaFactory.createForClass(ClassroomMember);

// Main Classroom Schema
@Schema({ timestamps: true })
export class Classroom {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true })
  description?: string;

  // Academic Information
  @Prop({ required: true, trim: true })
  institute: string;

  @Prop({ required: true, trim: true })
  department: string;

  @Prop({ required: true, trim: true })
  intake: string;

  @Prop({ trim: true })
  section?: string;

  // Join Code
  @Prop({ required: true, unique: true, uppercase: true })
  joinCode: string;

  @Prop({ default: true })
  isJoinCodeActive: boolean;

  // Creator
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  // Members
  @Prop({ type: [ClassroomMemberSchema], default: [] })
  members: ClassroomMember[];

  // 🆕 Events
  @Prop({ type: [EventSchema], default: [] })
  events: Event[];

  // Settings
  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isArchived: boolean;

  // Metadata
  @Prop()
  coverImage?: string;

  @Prop({ default: 0 })
  totalMembers: number;

  @Prop({ default: 0 })
  totalAdmins: number;

  @Prop({ default: 0 })
  totalBlockedMembers: number;

  @Prop({ default: 0 })
  totalEvents: number; // 🆕

  createdAt: Date;
  updatedAt: Date;
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);

// Indexes
ClassroomSchema.index({ joinCode: 1 }, { unique: true });
ClassroomSchema.index({ createdBy: 1 });
ClassroomSchema.index({ 'members.userId': 1 });
ClassroomSchema.index({ 'members.isBlocked': 1 });
ClassroomSchema.index({ institute: 1, department: 1, intake: 1, section: 1 });
ClassroomSchema.index({ isActive: 1, isArchived: 1 });
ClassroomSchema.index({ 'events.date': 1 }); // 🆕
ClassroomSchema.index({ 'events.startAt': 1 }); // 🆕

// Virtuals
ClassroomSchema.virtual('admins').get(function (this: ClassroomDocument) {
  return this.members?.filter(
    (m) => m.role === ClassroomRole.ADMIN || m.role === ClassroomRole.CO_ADMIN,
  ) || [];
});

ClassroomSchema.virtual('regularMembers').get(function (
  this: ClassroomDocument,
) {
  return this.members?.filter((m) => m.role === ClassroomRole.MEMBER) || [];
});

ClassroomSchema.virtual('blockedMembers').get(function (
  this: ClassroomDocument,
) {
  return this.members?.filter((m) => m.isBlocked) || [];
});

ClassroomSchema.virtual('activeMembers').get(function (
  this: ClassroomDocument,
) {
  return this.members?.filter((m) => !m.isBlocked) || [];
});

// 🆕 Upcoming events virtual
ClassroomSchema.virtual('upcomingEvents').get(function (
  this: ClassroomDocument,
) {
  const now = new Date().toISOString();
  return this.events
    ?.filter((e) => e.startAt >= now && !e.isCompleted)
    ?.sort((a, b) => a.startAt.localeCompare(b.startAt)) || [];
});

// Pre-save middleware
ClassroomSchema.pre('save', function() {
  this.totalMembers = this.members.length;
  this.totalAdmins = this.members.filter(
    (m) => m.role === ClassroomRole.ADMIN || m.role === ClassroomRole.CO_ADMIN,
  ).length;
  this.totalBlockedMembers = this.members.filter((m) => m.isBlocked).length;
  this.totalEvents = this.events.length;
});

// Enable virtuals
ClassroomSchema.set('toJSON', { virtuals: true });
ClassroomSchema.set('toObject', { virtuals: true });
