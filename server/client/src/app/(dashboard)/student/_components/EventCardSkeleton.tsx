"use client";

import React from "react";

const EventCardSkeleton: React.FC = () => {
  return (
    <article
      className="relative rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden bg-white"
      style={{
        borderLeftWidth: "5px",
        borderColor: "#e5e7eb",
      }}
    >
      {/* Header */}
      <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-5">
        {/* Icon Skeleton */}
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl shrink-0 bg-gray-200 animate-pulse" />

        {/* Content Skeleton */}
        <div className="flex-1 space-y-2">
          {/* Title */}
          <div className="flex items-center gap-2">
            <div className="h-5 sm:h-6 bg-gray-200 rounded animate-pulse w-3/4" />
          </div>

          {/* Time and Location */}
          <div className="flex flex-col xs:flex-row xs:items-center xs:gap-3 space-y-1 xs:space-y-0">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
            <div className="hidden xs:block w-1 h-1 bg-gray-200 rounded-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="sm:self-center w-24 h-9 rounded-xl bg-gray-200 animate-pulse" />
      </div>
    </article>
  );
};

export default EventCardSkeleton;