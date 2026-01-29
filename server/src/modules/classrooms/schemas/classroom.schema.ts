import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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
  isBlocked: boolean; // 🆕 Block status for this classroom

  @Prop()
  blockedBy?: Types.ObjectId; // 🆕 Who blocked this user

  @Prop()
  blockedAt?: Date; // 🆕 When user was blocked

  @Prop({ default: Date.now })
  joinedAt: Date;
}

const ClassroomMemberSchema = SchemaFactory.createForClass(ClassroomMember);

// Main Classroom Schema
@Schema({ timestamps: true })
export class Classroom {
  @Prop({ required: true, trim: true })
  name?: string;

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

  // Join Code for inviting users
  @Prop({ required: true, unique: true, uppercase: true })
  joinCode: string;

  @Prop({ default: true })
  isJoinCodeActive: boolean;

  // Creator/Owner of the classroom
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  // Members array with roles
  @Prop({ type: [ClassroomMemberSchema], default: [] })
  members: ClassroomMember[];

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
  totalBlockedMembers: number; // 🆕 Track blocked members count

  createdAt: Date;
  updatedAt: Date;
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);

// Indexes for better performance
ClassroomSchema.index({ joinCode: 1 }, { unique: true });
ClassroomSchema.index({ createdBy: 1 });
ClassroomSchema.index({ 'members.userId': 1 });
ClassroomSchema.index({ 'members.isBlocked': 1 }); // 🆕 Index for blocked users
ClassroomSchema.index({ institute: 1, department: 1, intake: 1, section: 1 });
ClassroomSchema.index({ isActive: 1, isArchived: 1 });

// Virtual for admins only
ClassroomSchema.virtual('admins').get(function (this: ClassroomDocument) {
  return this.members.filter(
    (m) => m.role === ClassroomRole.ADMIN || m.role === ClassroomRole.CO_ADMIN,
  );
});

// Virtual for regular members
ClassroomSchema.virtual('regularMembers').get(function (this: ClassroomDocument) {
  return this.members.filter((m) => m.role === ClassroomRole.MEMBER);
});

// 🆕 Virtual for blocked members
ClassroomSchema.virtual('blockedMembers').get(function (this: ClassroomDocument) {
  return this.members.filter((m) => m.isBlocked);
});

// 🆕 Virtual for active (non-blocked) members
ClassroomSchema.virtual('activeMembers').get(function (this: ClassroomDocument) {
  return this.members.filter((m) => !m.isBlocked);
});

// Pre-save middleware to update member counts
ClassroomSchema.pre('save', function (next: Function) {
  this.totalMembers = this.members.length;
  this.totalAdmins = this.members.filter(
    (m) => m.role === ClassroomRole.ADMIN || m.role === ClassroomRole.CO_ADMIN,
  ).length;
  this.totalBlockedMembers = this.members.filter((m) => m.isBlocked).length; // 🆕
  next();
});

// Enable virtuals in JSON
ClassroomSchema.set('toJSON', { virtuals: true });
ClassroomSchema.set('toObject', { virtuals: true });