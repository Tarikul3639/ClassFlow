import { IEvent, IMaterial } from "@/types/event";
export const ADMIN_EVENT: IEvent[] = [
  {
    _id: "1",
    type: "ct",
    title: "Algorithms CT-1",
    date: "2026-01-29",
    startAt: "2026-01-29T10:00",
    endAt: "2026-01-29T11:30",
    topics: "Bresenham Algorithm and Circle Generation",
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
  },
  {
    _id: "2",
    type: "quiz",
    title: "Data Structures Quiz",
    date: "2026-01-26",
    startAt: "2026-01-26T14:00",
    isCompleted: true,
  },
  {
    _id: "3",
    type: "assignment",
    title: "OS Kernel Project",
    date: "2026-02-02",
    startAt: "2026-02-02T23:59",
    isCompleted: false,
  },
  {
    _id: "4",
    type: "lecture",
    title: "Advanced DB Lecture",
    date: "2026-01-30",
    startAt: "2026-01-30T09:00",
    isCompleted: false,
  },
];
