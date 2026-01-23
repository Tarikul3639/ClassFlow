// types/event.ts

export type EventType =
  | "quiz"
  | "assignment"
  | "presentation"
  | "ct"
  | "lab"
  | "seminar"
  | "lecture";

export type MaterialType = "pdf" | "docx" | "image";

export interface Material {
  name: string;       // file name, e.g. "Lecture1.pdf"
  type: MaterialType; // pdf, docx, image
  url?: string;       // optional: file URL / path for download
}

export interface Event {
  id: number;
  type: EventType;
  title: string;

  /** ISO date: "2026-01-23" */
  date: string;

  /** ISO datetime for sorting: "2026-01-23T10:00" */
  startAt: string;
  endAt?: string;

  location?: string;

  topics?: string[];
  materials?: Material[];

  isCompleted: boolean;
}
