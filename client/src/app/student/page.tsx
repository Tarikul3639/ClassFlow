// StudentView.tsx
"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

import Navbar from "./_components/Navbar";
import EventCard from "./_components/EventCard";
import Footer from "./_components/Footer";

import { Event } from "@/types/event";
import { EVENT_UI } from "@/config/event-ui";

const StudentView = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const events: Event[] = [
    {
      id: 1,
      type: "ct",
      title: "CT: Algorithms",
      date: "2026-01-24",
      startAt: "2026-01-24T10:00",
      endAt: "2026-01-24T11:30",
      location: "Room 304",
      topics: ["Bresenham Algorithm", "Circle Generation"],
      materials: [
        { name: "Slides.pdf", type: "pdf", url: "/files/slides.pdf" },
        { name: "Lecture Notes.docx", type: "docx", url: "/files/notes.docx" },
      ],
      isCompleted: false,
    },
    {
      id: 7,
      type: "quiz",
      title: "Quiz: Algorithms",
      date: "2026-01-23",
      startAt: "2026-01-23T23:30",
      endAt: "2026-01-23T23:30",
      location: "Room 304",
      topics: ["Bresenham Algorithm", "Circle Generation"],
      materials: [
        { name: "Slides.pdf", type: "pdf", url: "/files/slides.pdf" },
        { name: "Lecture Notes.docx", type: "docx", url: "/files/notes.docx" },
      ],
      isCompleted: false,
    },
    {
      id: 6,
      type: "quiz",
      title: "Quiz: Algorithms",
      date: "2026-01-25",
      startAt: "2026-01-25T10:00",
      endAt: "2026-01-25T11:30",
      location: "Room 304",
      topics: ["Bresenham Algorithm", "Circle Generation"],
      materials: [
        { name: "Slides.pdf", type: "pdf", url: "/files/slides.pdf" },
        { name: "Lecture Notes.docx", type: "docx", url: "/files/notes.docx" },
      ],
      isCompleted: false,
    },
    {
      id: 2,
      type: "assignment",
      title: "Assignment: Data Structures",
      date: "2026-01-23",
      startAt: "2026-01-23T12:00",
      endAt: "2026-01-23T13:00",
      location: "Online Submission",
      topics: ["Linked Lists", "Trees"],
      materials: [
        { name: "Assignment.pdf", type: "pdf", url: "/files/assignment.pdf" },
        { name: "Sample Code.docx", type: "docx", url: "/files/sample.docx" },
      ],
      isCompleted: false,
    },
    {
      id: 5,
      type: "quiz",
      title: "Quiz: Computer Networks",
      date: "2026-01-23",
      startAt: "2026-01-23T15:00",
      endAt: "2026-01-23T16:00",
      location: "Room 210",
      isCompleted: false,
    },
    {
      id: 4,
      type: "lecture",
      title: "Lecture: Operating Systems",
      date: "2026-01-22",
      startAt: "2026-01-22T09:00",
      endAt: "2026-01-22T10:00",
      location: "Hall A",
      isCompleted: true,
    },
  ];

  // Separate active and completed
  const activeEvents = events.filter((e) => !e.isCompleted);
  const completedEvents = events.filter((e) => e.isCompleted);

  const now = new Date();

  activeEvents.sort((a, b) => {
    const aStart = new Date(a.startAt).getTime();
    const bStart = new Date(b.startAt).getTime();

    const aIsFuture = aStart > now.getTime();
    const bIsFuture = bStart > now.getTime();

    // 1. Future events first
    if (aIsFuture && !bIsFuture) return -1;
    if (!aIsFuture && bIsFuture) return 1;

    // 2. If both future, sort by soonest first
    if (aIsFuture && bIsFuture) return aStart - bStart;

    // 3. If both past, sort by most recent past first (optional)
    return bStart - aStart;
  });

  // Detect next upcoming event
  const nextEvent = activeEvents.find((e) => new Date(e.startAt) > now);

  // Group active events by date
  const groupedEvents: Record<string, Event[]> = activeEvents.reduce(
    (acc, event) => {
      const dateKey = new Date(event.startAt).toDateString();
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(event);
      return acc;
    },
    {} as Record<string, Event[]>,
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

  const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <div className="bg-white min-h-screen flex flex-col font-display antialiased text-[#111518]">
      <Navbar />
      <div className="h-14 sm:h-24" />

      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-10 flex flex-col gap-8">
        {/* Header */}
        <header className="space-y-1">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {formatDate(nextEvent?.startAt ?? new Date().toISOString())}
          </h1>
          <div className="flex items-center gap-2 text-[#399aef] font-bold text-sm">
            <span className="flex w-2 h-2 rounded-full bg-[#399aef] animate-pulse" />
            <p>{activeEvents.length} events remaining</p>
          </div>
        </header>

        {/* Active Events */}
        {Object.entries(groupedEvents).map(([date, eventsOnDate]) => (
          <div key={date} className="space-y-4">
            <h2 className="text-xl font-extrabold">
              {formatDate(eventsOnDate[0].startAt)}
            </h2>

            {eventsOnDate.map((event) => {
              const ui = EVENT_UI[event.type];
              const Icon = ui.icon;
              const isNext = nextEvent?.id === event.id;

              return (
                <EventCard
                  key={event.id}
                  event={event}
                  color={ui.color}
                  icon={<Icon size={22} />}
                  isExpanded={expandedId === event.id}
                  onToggle={() =>
                    setExpandedId(expandedId === event.id ? null : event.id)
                  }
                  highlight={isNext}
                  formatTime={formatTime}
                />
              );
            })}
          </div>
        ))}

        {/* Completed Events */}
        {completedEvents.length > 0 && (
          <>
            <div className="flex items-center gap-4 py-2 mt-4">
              <div className="h-px bg-[#dbe1e6] flex-1" />
              <span className="text-xxs font-black text-[#617789] uppercase tracking-[0.2em]">
                Completed
              </span>
              <div className="h-px bg-[#dbe1e6] flex-1" />
            </div>

            <section className="space-y-3">
              {completedEvents.map((event) => (
                <article
                  key={event.id}
                  className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white border border-dashed border-[#dbe1e6] opacity-60 grayscale"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <Check size={20} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#617789] line-through">
                      {event.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">
                      {formatTime(event.startAt)}
                      {event.endAt && ` - ${formatTime(event.endAt)}`}
                    </p>
                  </div>
                </article>
              ))}
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default StudentView;
