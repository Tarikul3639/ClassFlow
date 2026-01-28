import { useMemo } from "react";
import { IEvent } from "@/types/event";

interface UseSortedEventsResult {
  activeEvents: IEvent[];
  completedEvents: IEvent[];
}

export const useSortedEvents = (events: IEvent[]): UseSortedEventsResult => {
  return useMemo(() => {
    const now = new Date();

    // 1️⃣ Separate active & completed
    const activeEvents = events.filter(
      (e) => !e.isCompleted && (!e.endAt || new Date(e.endAt) >= now),
    );

    const completedEvents = events.filter(
      (e) => e.isCompleted || (e.endAt && new Date(e.endAt) < now),
    );

    // 2️⃣ Sort active events
    activeEvents.sort((a, b) => {
      const aStart = new Date(a.startAt).getTime();
      const bStart = new Date(b.startAt).getTime();

      const aIsFuture = aStart > now.getTime();
      const bIsFuture = bStart > now.getTime();

      // Future events first
      if (aIsFuture && !bIsFuture) return -1;
      if (!aIsFuture && bIsFuture) return 1;

      // Both future → nearest first
      if (aIsFuture && bIsFuture) return aStart - bStart;

      // Both past → most recent first
      return bStart - aStart;
    });

    return {
      activeEvents,
      completedEvents,
    };
  }, [events]);
};
