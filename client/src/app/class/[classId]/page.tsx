"use client";

import React, { useMemo, useState } from "react";
import { EventItem } from "./_components/EventItem";
import { CompletedEvent } from "./_components/CompletedEvent";
import { EventPageSkeleton } from "./_components/skeleton/EventPageSkeleton";
import { useSortedEvents } from "@/hooks/useSortedEvents";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { IEvent } from "@/redux/slices/classroom/types";
import { useAppSelector } from "@/redux/hooks";
import {
  classroomId as classId,
  isAdmin as selectIsAdmin,
} from "@/redux/selectors/selectors";
import { EmptyState } from "./_components/EmptyState";
import { BlockedState } from "./_components/BlockedState";
import { LayoutGroup } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";
import { isBlocked } from "@/redux/selectors/selectors";

const Page = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All Events");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch events from Redux store
  const events = useAppSelector(
    (state) => state.classroom.classroom?.events || [],
  );
  const status = useAppSelector((state) => state.classroom.requestStatus);
  const isLoading = status.fetchClassroom.loading;
  const classroomId = useAppSelector(classId);
  const isAdmin = useAppSelector(selectIsAdmin);
  const blocked = useAppSelector(isBlocked);
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

      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.type.toString().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory, events]);

  // 2. Sort the filtered events into Active and Completed
  const { activeEvents, completedEvents } = useSortedEvents(filteredEvents) as {
    activeEvents: IEvent[];
    completedEvents: IEvent[];
  };

  // Detect next upcoming event
  const nextEvent = activeEvents.find((e) => new Date(e.startAt) > new Date());

  //   const categories = [
  //     "All Events",
  //     "Class Tests",
  //     "Quizzes",
  //     "Lectures",
  //     "Assignments",
  //     "Lectures",
  //   ];

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

  // Show loading skeleton
  if (isLoading) {
    return <EventPageSkeleton />;
  }

  // If blocked, show blocked state
  if (blocked) {
    return <BlockedState/>;
  }

  return (
    <div className="bg-white min-h-screen flex flex-col font-display antialiased text-[#111518]">

      <main className="flex-1 w-full max-w-2xl mx-auto p-6 flex flex-col gap-8">
        {/* Header */}
        <header className="flex items-start justify-between gap-4">
          <div className="space-y-1 flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              {formatDate(nextEvent?.startAt ?? new Date().toISOString())}
            </h1>
            <div className="flex items-center gap-2 text-[#399aef] font-bold text-xsm sm:text-sm">
              <span className="flex w-2 h-2 rounded-full bg-[#399aef] animate-pulse" />
              <p>{activeEvents.length} events remaining</p>
            </div>
          </div>

          {/* Refined Add Event Button */}
          {isAdmin && (
            <Link
              href={`/class/${classroomId}/new`}
              className="group relative flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#399aef] text-white overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-[#399aef]/20 active:scale-95 shrink-0"
            >
              {/* Subtle Shine Effect on Hover */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

              <div className="relative flex items-center gap-2">
                <Plus
                  size={18}
                  strokeWidth={2.2}
                  className="transition-transform duration-300 group-hover:rotate-90"
                />
                <span className="text-xsm font-semibold tracking-wide">
                  <span className="hidden xs:inline">Add New Event</span>
                  <span className="xs:hidden">Add Event</span>
                </span>
              </div>
            </Link>
          )}
        </header>

        <LayoutGroup>
          <div className="flex flex-col gap-4">
            {/* Active Events */}
            {activeEvents.map((event) => (
              <EventItem
                key={event._id}
                event={event}
                highlight={nextEvent?._id === event._id}
                expandedId={expandedId}
                setExpandedId={setExpandedId}
                formatDate={formatDate}
                formatTime={formatTime}
                isAdmin={isAdmin}
              />
            ))}

            {filteredEvents.length === 0 && <EmptyState isAdmin={isAdmin} />}

            {completedEvents.length > 0 && (
              <SectionDivider label="Completed Activities" />
            )}

            {/* Completed Events */}
            {completedEvents.map((event) => (
              <CompletedEvent
                key={event._id}
                event={event}
                formatDate={formatDate}
                formatTime={formatTime}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        </LayoutGroup>
      </main>
    </div>
  );
};

export default Page;
