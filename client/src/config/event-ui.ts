// config/event-ui.ts
import {
  FileQuestion,
  ClipboardList,
  Presentation,
  FlaskConical,
  Users,
  AlarmClockCheck,
  BookOpenCheck,
  LucideIcon
} from "lucide-react";

import { EventType } from "@/redux/slices/classroom/types";

type EventUIConfig = {
  color: string;
  icon: LucideIcon;
  label: string;
};

export const EVENT_UI: Record<EventType, EventUIConfig> = {
  quiz: {
    color: "#3b82f6", // blue
    icon: FileQuestion, // quiz-related icon
    label: "Quiz"
  },

  assignment: {
    color: "#facc15", // yellow
    icon: ClipboardList, // assignment checklist
    label: "Assignment"
  },

  lecture: {
    color: "#ec4899", // pink
    icon: BookOpenCheck, // lecture / study icon
    label: "Lecture"
  },

  presentation: {
    color: "#22c55e", // green
    icon: Presentation, // presentation icon
    label: "Presentation"
  },

  ct: {
    color: "#dc2626", // deep red for class test
    icon: AlarmClockCheck, // test / exam related icon
    label: "Class Test"
  },

  lab: {
    color: "#8b5cf6", // purple
    icon: FlaskConical, // lab flask
    label: "Lab"
  },

  seminar: {
    color: "#14b8a6", // teal / cyanish
    icon: Users, // seminar / group icon
    label: "Seminar"
  },
  class: {
    color: "#f97316", // orange
    icon: BookOpenCheck, // class / study icon
    label: "Class"
  }
};
