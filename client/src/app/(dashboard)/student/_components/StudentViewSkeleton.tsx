"use client";

import React from "react";
import EventCardSkeleton from "./EventCardSkeleton";

const StudentViewSkeleton: React.FC = () => {
  return (
    <>
      {/* Header Skeleton */}
      <header className="space-y-1">
        {/* Date Title */}
        <div className="h-8 sm:h-10 lg:h-12 bg-gray-200 rounded animate-pulse w-2/3 mb-2" />
        
        {/* Events Remaining Badge */}
        <div className="flex items-center gap-2">
          <span className="flex w-2 h-2 rounded-full bg-gray-300 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
        </div>
      </header>

      {/* Event Cards Skeleton */}
      <div className="space-y-4">
        {/* Date Header */}
        <div className="h-7 bg-gray-200 rounded animate-pulse w-48 mb-4" />
        
        {/* Event Cards */}
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
      </div>

      {/* Another Date Section (Optional) */}
      <div className="space-y-4">
        {/* Date Header */}
        <div className="h-7 bg-gray-200 rounded animate-pulse w-48 mb-4" />
        
        {/* Event Cards */}
        <EventCardSkeleton />
        <EventCardSkeleton />
      </div>
    </>
  );
};

export default StudentViewSkeleton;