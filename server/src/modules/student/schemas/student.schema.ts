import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '@/modules/auth/schemas/user.schema';

export type StudentDocument = Student & Document;

@Schema({ timestamps: true })
export class Student extends User {
  @Prop({ required: true, unique: true })
  studentId: string;

  @Prop({ type: Types.ObjectId, ref: 'ClassSection', required: true })
  classSectionId: Types.ObjectId;

  @Prop()
  department?: string;

  @Prop()
  intake?: string;

  @Prop()
  section?: string;

  @Prop()
  guardianName?: string;

  @Prop()
  guardianPhone?: string;

  @Prop()
  bloodGroup?: string;

  @Prop()
  enrollmentDate?: Date;
}

export const StudentSchema = SchemaFactory.createForClass(Student);

// Indexes
StudentSchema.index({ studentId: 1 }, { unique: true });
StudentSchema.index({ classSectionId: 1 });
StudentSchema.index({ department: 1, intake: 1, section: 1 });