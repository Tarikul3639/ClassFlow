import { IEvent } from "@/redux/slices/classroom/types";

export const events = [
  {
    _id: "1",
    type: "ct",
    title: "Algorithms CT-1",
    date: "2026-01-29",
    startAt: "2026-01-29T10:00:00",
    endAt: "2026-01-29T11:30:00",
    topics: "Bresenham Algorithm and Circle Generation Algorithm. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    location: "Room 204, Engineering Building",
    materials: [
      {
        _id: "m1",
        name: "CT_Syllabus.pdf",
        type: "pdf",
        url: "https://example.com/ct_syllabus.pdf",
      },
    ],
    isCompleted: false,
    createdBy: {
      _id: "admin_001",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@edu.university.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-20T14:30:00Z",
  },
  {
    _id: "2",
    type: "quiz",
    title: "Data Structures Quiz",
    date: "2026-01-26",
    startAt: "2026-01-26T14:00:00",
    endAt: "2026-01-26T15:00:00",
    location: "Room 305",
    topics: "Trees, Graphs, Hash Tables lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    materials: [
      {
        _id: "m2",
        name: "Quiz_Topics.pdf",
        type: "pdf",
        url: "https://example.com/quiz_topics.pdf",
      },
    ],
    isCompleted: true,
    createdBy: {
      _id: "admin_001",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@edu.university.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    createdAt: "2026-01-10T09:00:00Z",
    updatedAt: "2026-01-26T15:05:00Z",
  },
  {
    _id: "3",
    type: "assignment",
    title: "OS Kernel Project",
    date: "2026-02-02",
    startAt: "2026-02-02T23:59:00",
    topics: "Process Scheduling, Memory Management lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    materials: [
      {
        _id: "m3",
        name: "Assignment_Instructions.docx",
        type: "docx",
        url: "https://example.com/assignment_instructions.docx",
      },
      {
        _id: "m4",
        name: "Starter_Code.pdf",
        type: "pdf",
        url: "https://example.com/starter_code.pdf",
      },
    ],
    isCompleted: false,
    createdBy: {
      _id: "admin_002",
      name: "Prof. Michael Chen",
      email: "michael.chen@edu.university.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    createdAt: "2026-01-20T11:00:00Z",
    updatedAt: "2026-01-22T16:00:00Z",
  },
  {
    _id: "4",
    type: "lecture",
    title: "Advanced DB Lecture",
    date: "2026-01-30",
    startAt: "2026-01-30T09:00:00",
    endAt: "2026-01-30T10:30:00",
    location: "Auditorium A",
    topics: "NoSQL Databases, MongoDB, Redis lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    materials: [
      {
        _id: "m5",
        name: "Lecture_Slides.pdf",
        type: "pdf",
        url: "https://example.com/lecture_slides.pdf",
      },
      {
        _id: "m6",
        name: "Demo_Code.pdf",
        type: "pdf",
        url: "https://example.com/demo_code.pdf",
      },
    ],
    isCompleted: false,
    createdBy: {
      _id: "admin_001",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@edu.university.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    createdAt: "2026-01-18T14:00:00Z",
    updatedAt: "2026-01-25T10:00:00Z",
  },
  {
    _id: "5",
    type: "presentation",
    title: "Final Year Project Presentations",
    date: "2026-02-05",
    startAt: "2026-02-05T10:00:00",
    endAt: "2026-02-05T16:00:00",
    location: "Conference Hall",
    topics: "AI/ML Projects, Web Development, Mobile Apps",
    materials: [
      {
        _id: "m7",
        name: "Presentation_Schedule.pdf",
        type: "pdf",
        url: "https://example.com/schedule.pdf",
      },
      {
        _id: "m8",
        name: "Evaluation_Criteria.pdf",
        type: "pdf",
        url: "https://example.com/criteria.pdf",
      },
    ],
    isCompleted: false,
    createdBy: {
      _id: "admin_003",
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@edu.university.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
    createdAt: "2026-01-12T08:00:00Z",
    updatedAt: "2026-01-28T12:00:00Z",
  },
  {
    _id: "6",
    type: "lab",
    title: "Computer Networks Lab",
    date: "2026-01-31",
    startAt: "2026-01-31T14:00:00",
    endAt: "2026-01-31T17:00:00",
    location: "Lab 3, Computer Science Building",
    topics: "Socket Programming, TCP/UDP Implementation",
    materials: [
      {
        _id: "m9",
        name: "Lab_Manual.pdf",
        type: "pdf",
        url: "https://example.com/lab_manual.pdf",
      },
    ],
    isCompleted: false,
    createdBy: {
      _id: "admin_002",
      name: "Prof. Michael Chen",
      email: "michael.chen@edu.university.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    createdAt: "2026-01-16T10:00:00Z",
    updatedAt: "2026-01-27T09:00:00Z",
  },
  {
    _id: "7",
    type: "seminar",
    title: "Industry Expert Talk: Cloud Computing",
    date: "2026-02-08",
    startAt: "2026-02-08T15:00:00",
    endAt: "2026-02-08T17:00:00",
    location: "Main Auditorium",
    topics: "AWS, Azure, DevOps Best Practices",
    materials: [],
    isCompleted: false,
    createdBy: {
      _id: "admin_001",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@edu.university.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    createdAt: "2026-01-22T13:00:00Z",
    updatedAt: "2026-01-26T11:00:00Z",
  },
  {
    _id: "8",
    type: "class",
    title: "Data Science Class",
    date: "2026-02-01",
    startAt: "2026-02-01T11:00:00",
    endAt: "2026-02-01T12:30:00",
    location: "Room 102",
    topics: "Machine Learning Fundamentals, Linear Regression",
    materials: [
      {
        _id: "m10",
        name: "Class_Notes.pdf",
        type: "pdf",
        url: "https://example.com/class_notes.pdf",
      },
      {
        _id: "m11",
        name: "Practice_Problems.pdf",
        type: "pdf",
        url: "https://example.com/practice.pdf",
      },
    ],
    isCompleted: false,
    createdBy: {
      _id: "admin_003",
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@edu.university.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
    createdAt: "2026-01-19T15:00:00Z",
    updatedAt: "2026-01-29T10:00:00Z",
  },
];

// Upcoming events only
export const UPCOMING_EVENTS = events.filter(
  (event) => !event.isCompleted && new Date(event.startAt) > new Date()
).sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

// Completed events
export const COMPLETED_EVENTS = events.filter((event) => event.isCompleted);

// Events by type
export const getEventsByType = (type: string) => 
  events.filter((event) => event.type === type);
// Events in date range
export const getEventsByDateRange = (startDate: string, endDate: string) =>
  events.filter(
    (event) =>
      event.date >= startDate &&
      event.date <= endDate
  );