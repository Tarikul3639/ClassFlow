import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '@/modules/auth/schemas/user.schema';

export type AdminDocument = Admin & Document;

class Permissions {
  @Prop({ default: false })
  canCreateClassroom: boolean;

  @Prop({ default: false })
  canAssignAdmin: boolean;

  @Prop({ default: false })
  canRemoveAdmin: boolean;

  @Prop({ default: false })
  canManageStudents: boolean;

  @Prop({ default: false })
  canManageTeachers: boolean;

  @Prop({ default: false })
  canEditClassContent: boolean;
}

class ManagedUser {
  @Prop({ type: Types.ObjectId, required: true })
  _id: Types.ObjectId;

  @Prop()
  studentId?: string;

  @Prop()
  adminId?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  avatarUrl?: string;

  @Prop({ default: false })
  blocked: boolean;

  @Prop({ required: true, enum: ['student', 'co_admin'] })
  role: 'student' | 'co_admin';
}

@Schema({ timestamps: true })
export class Admin extends User {
  @Prop({ required: true, unique: true })
  adminId: string;

  @Prop({ type: Types.ObjectId, ref: 'Institute' })
  instituteId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Department' })
  departmentId?: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'ClassSection' })
  classSectionIds?: Types.ObjectId[];

  @Prop({ type: Permissions, required: true })
  permissions: Permissions;

  @Prop({ type: [ManagedUser], default: [] })
  managedStudents?: ManagedUser[];
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

// Indexes
AdminSchema.index({ adminId: 1 }, { unique: true });
AdminSchema.index({ instituteId: 1 });
AdminSchema.index({ departmentId: 1 });