import { useMemo } from "react";

/**
 * Returns human-readable relative time for an event
 * Handles different dates correctly
 */
export const useEventTime = (
  date: string,        // e.g. "2026-01-25"
  startAt: string,     // ISO string
  endAt?: string,
): string => {
  return useMemo(() => {
    const now = new Date();

    // Use date as the main event day
    const eventDate = new Date(date);
    const start = new Date(startAt);
    const end = endAt ? new Date(endAt) : null;

    // 🔹 Ongoing event
    if (end && now >= start && now <= end) {
      return "Ongoing";
    }

    // 🔹 Past event
    if (end && now > end) {
      return "Past";
    }

    // Normalize dates (midnight comparison)
    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    const eventDay = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate(),
    );

    const dayDiff =
      (eventDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    // 🔹 Today
    if (dayDiff === 0) {
      const diffMs = start.getTime() - now.getTime();
      const diffMinutes = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);

      if (diffHours >= 1)
        return `In ${diffHours} hour${diffHours > 1 ? "s" : ""}`;

      if (diffMinutes >= 1)
        return `In ${diffMinutes} min${diffMinutes > 1 ? "s" : ""}`;

      return "Soon";
    }

    // 🔹 Tomorrow
    if (dayDiff === 1) {
      return "Tomorrow";
    }

    // 🔹 Within next 7 days
    if (dayDiff > 1 && dayDiff < 7) {
      return `In ${dayDiff} day${dayDiff > 1 ? "s" : ""}`;
    }

    // 🔹 Past (no endAt case)
    if (dayDiff < 0) {
      return "Past";
    }

    // 🔹 Fallback
    return start.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }, [date, startAt, endAt]);
};
