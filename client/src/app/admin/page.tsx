"use client";

import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Navbar from "./_components/Navbar";
import { AdminHeader } from "./_components/AdminHeader";
import { AdminEventItem } from "./_components/AdminEventItem";
import { AdminEventCompletedItem } from "./_components/AdminEventCompletedItem";
import { useSortedEvents } from "@/hooks/useSortedEvents";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Event } from "@/types/event";

const events: Event[] = [
  {
    id: 1,
    type: "ct",
    title: "Algorithms CT-1",
    date: "2026-01-24",
    startAt: "2026-01-24T10:00",
    endAt: "2026-01-24T11:30",
    isCompleted: true,
  },
  {
    id: 2,
    type: "quiz",
    title: "Data Structures Quiz",
    date: "2026-01-26",
    startAt: "2026-01-26T14:00",
    isCompleted: true,
  },
  {
    id: 3,
    type: "assignment",
    title: "OS Kernel Project",
    date: "2026-02-02",
    startAt: "2026-02-02T23:59",
    isCompleted: false,
  },
  {
    id: 4,
    type: "lecture",
    title: "Advanced DB Lecture",
    date: "2026-01-30",
    startAt: "2026-01-30T09:00",
    isCompleted: false,
  },
];

const ClassFlowAdmin = () => {
  const [activeCategory, setActiveCategory] = useState("All Events");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Logic for Filtering by Category and Search
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Category Mapping Logic
      const categoryMap: Record<string, string> = {
        "Class Tests": "ct",
        Quizzes: "quiz",
        Assignments: "assignment",
        Lectures: "lecture",
      };

      const matchesCategory =
        activeCategory === "All Events" ||
        event.type === categoryMap[activeCategory];

      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) || event.type.toString().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  // 2. Sort the filtered events into Active and Completed
  const { activeEvents, completedEvents } = useSortedEvents(filteredEvents);

  // Detect next upcoming event
  const nextEvent = activeEvents.find((e) => new Date(e.startAt) > new Date());

  const categories = [
    "All Events",
    "Class Tests",
    "Quizzes",
    "Assignments",
    "Lectures",
  ];

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <div className="bg-white min-h-screen flex flex-col font-display antialiased text-[#111518]">
      <Navbar />
      <div className="h-14 sm:h-24" />

      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-10 flex flex-col gap-8">
        <AdminHeader count={filteredEvents.length} />

        {/* Search & Filter */}
        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#617789] group-focus-within:text-[#399aef]">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search events..."
              className="w-full h-12 pl-11 pr-4 rounded-2xl border border-[#dbe1e6] bg-[#f8fafc] focus:bg-white focus:ring-2 focus:ring-[#399aef]/20 focus:border-[#399aef] transition-all text-sm font-medium outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xxs sm:text-[11px] font-black uppercase tracking-widest transition-all border whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#399aef] text-white border-[#399aef]"
                    : "bg-white text-[#617789] border-[#dbe1e6] hover:border-[#399aef]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List Rendering */}
        <div className="flex flex-col gap-4">
          {/* Active Events */}
          {activeEvents.map((event) => (
            <AdminEventItem
              key={event.id}
              event={event}
              highlight={nextEvent?.id === event.id}
              formatDate={formatDate}
              formatTime={formatTime}
            />
          ))}

          {/* Empty State Logic */}
          {filteredEvents.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-sm font-bold text-[#617789] uppercase tracking-widest">
                No events found
              </p>
            </div>
          )}

          {/* Completed Section Divider */}
          {completedEvents.length > 0 && (
            <SectionDivider label="Completed Activities" />
          )}

          {/* Completed Events */}
          {completedEvents.map((event) => (
            <AdminEventCompletedItem
              key={event.id}
              event={event}
              formatDate={formatDate}
              formatTime={formatTime}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ClassFlowAdmin;
