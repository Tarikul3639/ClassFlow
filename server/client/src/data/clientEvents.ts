import { IEvent } from "@/types/event";

export const CLIENT_EVENT_CREATED: IEvent[] = [
    {
      _id: "1",
      type: "ct",
      title: "CT: Algorithms",
      date: "2026-01-27",
      startAt: "2026-01-27T10:00",
      endAt: "2026-01-27T11:30",
      location: "Room 304",
      topics:
        "In this CT, we will cover the fundamental concepts of Bresenham Algorithm including derivation and implementation. Also, be prepared for Circle Generation algorithms. We will focus specifically on Mid-point and Bresenham's approaches, ensuring you understand the pixel selection process for smooth curve rendering. Please bring your notes on Cartesian coordinate systems as we will be using them extensively.",
      materials: [
        { _id: "1", name: "Slides.pdf", type: "pdf", url: "/files/slides.pdf" },
        {
          _id: "2",
          name: "Lecture Notes.docx",
          type: "docx",
          url: "/files/notes.docx",
        },
      ],
      isCompleted: false,
    },
    {
      _id: "7",
      type: "quiz",
      title: "Quiz: Algorithms",
      date: "2026-01-27",
      startAt: "2026-01-27T23:30",
      endAt: "2026-01-27T23:30",
      location: "Room 304",
      topics: "Bresenham Algorithm and Circle Generation",
      materials: [
        { _id: "1", name: "Slides.pdf", type: "pdf", url: "/files/slides.pdf" },
        {
          _id: "2",
          name: "Lecture Notes.docx",
          type: "docx",
          url: "/files/notes.docx",
        },
      ],
      isCompleted: false,
    },
    {
      _id: "6",
      type: "quiz",
      title: "Quiz: Algorithms",
      date: "2026-01-25",
      startAt: "2026-01-25T10:00",
      endAt: "2026-01-25T11:30",
      location: "Room 304",
      topics:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      materials: [
        { _id: "1", name: "Slides.pdf", type: "pdf", url: "/files/slides.pdf" },
        {
          _id: "2",
          name: "Lecture Notes.docx",
          type: "docx",
          url: "/files/notes.docx",
        },
      ],
      isCompleted: false,
    },
    {
      _id: "2",
      type: "assignment",
      title: "Assignment: Data Structures",
      date: "2026-01-23",
      startAt: "2026-01-23T12:00",
      endAt: "2026-01-23T13:00",
      location: "Online Submission",
      topics:
        "Implement linked lists and binary trees in your preferred programming language.",
      materials: [
        {
          _id: "1",
          name: "Assignment.pdf",
          type: "pdf",
          url: "/files/assignment.pdf",
        },
        {
          _id: "2",
          name: "Sample Code.docx",
          type: "docx",
          url: "/files/sample.docx",
        },
      ],
      isCompleted: false,
    },
    {
      _id: "5",
      type: "quiz",
      title: "Quiz: Computer Networks",
      date: "2026-01-23",
      startAt: "2026-01-23T15:00",
      endAt: "2026-01-23T16:00",
      location: "Room 210",
      isCompleted: false,
    },
    {
      _id: "4",
      type: "lecture",
      title: "Lecture: Operating Systems",
      date: "2026-01-22",
      startAt: "2026-01-22T09:00",
      endAt: "2026-01-22T10:00",
      location: "Hall A",
      isCompleted: true,
    },
  ];