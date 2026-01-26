"use client";

import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";

import Navbar from "./_components/Navbar";
import EventCard from "./_components/EventCard";
import Footer from "./_components/Footer";
import StudentViewSkeleton from "./_components/StudentViewSkeleton";

import { IEvent } from "@/types/event";
import { EVENT_UI } from "@/config/event-ui";
import { useSortedEvents } from "@/hooks/useSortedEvents";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchEventsFromServer } from "@/redux/slices/client/events/thunks/fetchEventsFromServer";

const Page = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const events = useAppSelector((state) => state.client.events);
  const isLoading = useAppSelector(
    (state) => state.client.status["all"]?.fetching,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEventsFromServer());
  }, [dispatch]);

  const { activeEvents, completedEvents } = useSortedEvents(events);

  // Detect next upcoming event
  const nextEvent = activeEvents.find((e) => new Date(e.startAt) > new Date());

  // Group active events by date
  const groupedEvents: Record<string, IEvent[]> = activeEvents.reduce(
    (acc, event) => {
      const dateKey = new Date(event.startAt).toDateString();
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(event);
      return acc;
    },
    {} as Record<string, IEvent[]>,
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

  // Loading state
  if (isLoading && events.length === 0)
    return (
      <div className="bg-white min-h-screen flex flex-col font-display antialiased text-[#111518]">
        <Navbar />
        <div className="h-14 sm:h-24" />

        <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-10 flex flex-col gap-8">
          <StudentViewSkeleton />
        </main>
        <Footer />
      </div>
    );

  return (
    <div className="bg-white min-h-screen flex flex-col font-display antialiased text-[#111518]">
      <Navbar />
      <div className="h-14 sm:h-24" />

      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-10 flex flex-col gap-8">
        {/* Header */}
        <header className="space-y-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            {formatDate(nextEvent?.startAt ?? new Date().toISOString())}
          </h1>
          <div className="flex items-center gap-2 text-[#399aef] font-bold text-xsm sm:text-sm">
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
              const isNext = nextEvent?._id === event._id;

              return (
                <EventCard
                  key={event._id}
                  event={event}
                  color={ui.color}
                  icon={<Icon size={22} />}
                  isExpanded={expandedId === event._id}
                  onToggle={() =>
                    setExpandedId(expandedId === event._id ? null : event._id)
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
              {completedEvents.map((event) => {
                const eventDate = new Date(event.startAt);

                return (
                  <article
                    key={event._id}
                    className="flex items-center gap-4 px-5 sm:px-6 py-3 sm:py-4 rounded-2xl bg-white border border-dashed border-[#dbe1e6] opacity-60 grayscale"
                  >
                    {/* Icon */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                      <Check size={18} className="sm:size-5" />
                    </div>

                    {/* Content */}
                    <div className="space-y-0.5">
                      <h3 className="text-xs sm:text-sm font-bold text-[#617789] line-through">
                        {event.title}
                      </h3>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-[11px] sm:text-xs text-gray-400 font-medium">
                        {/* Date */}
                        <span>{formatDate(eventDate.toDateString())}</span>

                        {/* Divider */}
                        <span className="hidden sm:inline">•</span>

                        {/* Time */}
                        <span>
                          {formatTime(event.startAt)}
                          {event.endAt && ` - ${formatTime(event.endAt)}`}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Page;
