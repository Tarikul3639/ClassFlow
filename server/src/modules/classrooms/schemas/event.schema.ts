import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type EventType =
  | 'quiz'
  | 'assignment'
  | 'presentation'
  | 'ct'
  | 'lab'
  | 'seminar'
  | 'lecture'
  | 'class';

export type MaterialType = 'pdf' | 'docx' | 'image';

// Material Schema
@Schema({ _id: true })
export class Material {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['pdf', 'docx', 'image'] })
  type: MaterialType;

  @Prop()
  url?: string;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);

// Event Schema
@Schema({ timestamps: true })
export class Event {
  @Prop({
    required: true,
    enum: [
      'quiz',
      'assignment',
      'presentation',
      'ct',
      'lab',
      'seminar',
      'lecture',
      'class',
    ],
  })
  type: EventType;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  date: string; // ISO date: "2026-01-23"

  @Prop({ required: true })
  startAt: string; // ISO datetime: "2026-01-23T10:00"

  @Prop()
  endAt?: string; // ISO datetime: "2026-01-23T12:00"

  @Prop({ trim: true })
  location?: string;

  @Prop({ trim: true })
  topics?: string;

  @Prop({ type: [MaterialSchema], default: [] })
  materials: Material[];

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);

// Indexes for better performance
EventSchema.index({ date: 1 });
EventSchema.index({ startAt: 1 });
EventSchema.index({ type: 1 });
EventSchema.index({ isCompleted: 1 });
