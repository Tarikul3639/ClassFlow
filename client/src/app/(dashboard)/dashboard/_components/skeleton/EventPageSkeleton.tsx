import { EventItemSkeleton } from "./EventItemSkeleton";
import { CompletedEventSkeleton } from "./CompletedEventSkeleton";

export const EventPageSkeleton = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col font-display antialiased text-[#111518]">
      <div className="h-16" />

      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-10 flex flex-col gap-8">
        {/* Header Skeleton */}
        <header className="flex items-start justify-between gap-4 animate-pulse">
          <div className="space-y-2 flex-1 min-w-0">
            <div className="h-8 sm:h-10 lg:h-12 bg-gray-200 rounded-lg w-2/3" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-300" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Add Event Button Skeleton */}
          <div className="shrink-0">
            <div className="w-30 xs:w-35 sm:w-37.5 h-10.5 sm:h-11.5 bg-gray-200 rounded-xl" />
          </div>
        </header>

        {/* Event List Skeleton */}
        <div className="flex flex-col gap-4">
          {/* Active event skeletons */}
          <EventItemSkeleton />
          <EventItemSkeleton />
          <EventItemSkeleton />

          {/* Section Divider Skeleton */}
          <div className="flex items-center gap-3 my-2 animate-pulse">
            <div className="h-px bg-gray-200 flex-1" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          {/* Completed event skeletons */}
          <CompletedEventSkeleton />
          <CompletedEventSkeleton />
        </div>
      </main>
    </div>
  );
};
