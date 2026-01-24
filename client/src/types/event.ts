// types/event.ts

export type IEventType =
  | "quiz"
  | "assignment"
  | "presentation"
  | "ct"
  | "lab"
  | "seminar"
  | "lecture";

export type IMaterialType = "pdf" | "docx" | "image";

export interface IMaterial {
  _id: string;         // unique identifier
  name: string;       // file name, e.g. "Lecture1.pdf"
  type: IMaterialType; // pdf, docx, image
  url?: string;       // optional: file URL / path for download
}

export interface IEvent {
  _id: string;
  type: IEventType;
  title: string;

  /** ISO date: "2026-01-23" */
  date: string;

  /** ISO datetime for sorting: "2026-01-23T10:00" */
  startAt: string;
  endAt?: string;

  location?: string;

  topics?: string[];
  materials?: IMaterial[];

  isCompleted: boolean;
}
