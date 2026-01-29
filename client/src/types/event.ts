export type IEventType =
  | 'quiz'
  | 'assignment'
  | 'presentation'
  | 'ct'
  | 'lab'
  | 'seminar'
  | 'lecture'
  | 'Class';

export type IMaterialType = 'pdf' | 'docx' | 'image';

export interface IMaterial {
  _id: string;
  name: string;
  type: IMaterialType;
  url?: string;
}

export interface IEvent {
  _id: string;
  type: IEventType;
  title: string;
  date: string; // ISO date
  startAt: string; // ISO datetime
  endAt?: string;
  location?: string;
  topics?: string;
  materials?: IMaterial[];
  isCompleted: boolean;
  createdBy: {
    _id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ICreateEvent {
  type: IEventType;
  title: string;
  date: string;
  startAt: string;
  endAt?: string;
  location?: string;
  topics?: string;
  materials?: Omit<IMaterial, '_id'>[]; // Without _id
  isCompleted?: boolean;
}