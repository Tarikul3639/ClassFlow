"use client";

import React from "react";

export const AdminEventCompletedItemSkeleton: React.FC = () => {
  return (
    <article className="group relative flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-3 rounded-3xl bg-[#fdfdfd] border border-[#f0f3f1] opacity-75">
      {/* Check Icon Skeleton */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gray-200 animate-pulse shrink-0" />

      {/* Content Skeleton */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <div className="h-4 sm:h-5 bg-gray-200 rounded animate-pulse w-1/2" />
          <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse" />
        </div>

        <div className="flex flex-col xs:flex-row xs:items-center gap-1 sm:gap-3 mt-0.5">
          {/* Time Skeleton */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
          </div>

          {/* Divider */}
          <span className="hidden xs:inline w-1 h-1 bg-gray-200 rounded-full animate-pulse" />

          {/* Date Skeleton */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-28" />
          </div>
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="shrink-0 ml-auto sm:ml-0 opacity-40">
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-200 rounded-xl animate-pulse" />
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>
    </article>
  );
};