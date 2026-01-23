import { useMemo } from "react";

/**
 * Returns human-readable relative time for an event
 * Examples: "Today", "Tomorrow", "In 3 hours", "In 20 mins", "10:00 AM"
 */
export const useEventTime = (
  date: string,
  startAt: string,
  endAt?: string
): string => {
  return useMemo(() => {
    const now = new Date();
    const start = new Date(startAt);

    const diffMs = start.getTime() - now.getTime(); // milliseconds
    const diffMinutes = Math.floor(diffMs / 1000 / 60);
    const diffHours = Math.floor(diffMs / 1000 / 60 / 60);
    const diffDays = Math.floor(diffMs / 1000 / 60 / 60 / 24);

    // Today
    if (diffDays === 0 && start.getDate() === now.getDate()) {
      if (diffHours >= 1) return `In ${diffHours} hour${diffHours > 1 ? "s" : ""}`;
      if (diffMinutes >= 1) return `In ${diffMinutes} min${diffMinutes > 1 ? "s" : ""}`;
      return "Now";
    }

    // Tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    if (start.getDate() === tomorrow.getDate()) {
      return "Tomorrow";
    }

    // If within next 7 days
    if (diffDays > 0 && diffDays < 7) {
      return `In ${diffDays} day${diffDays > 1 ? "s" : ""}`;
    }

    // If past event
    if (diffMs < 0) {
      return "Past";
    }

    // Default: return time
    return start.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }, [date, startAt, endAt]);
};
