"use client";

import React from "react";

export const AdminEventItemSkeleton: React.FC = () => {
  return (
    <article className="group relative flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-4 rounded-3xl bg-white border border-[#edf1f4]">
      {/* Visual Accent (Side Bar) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gray-200 animate-pulse" />

      {/* Icon Box Skeleton */}
      <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gray-200 animate-pulse shrink-0 shadow-sm" />

      {/* Content Area Skeleton */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Title Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-5 sm:h-6 bg-gray-200 rounded animate-pulse w-2/3" />
        </div>

        {/* Metadata Row Skeleton */}
        <div className="flex flex-col xs:flex-row xs:items-center gap-1 sm:gap-3">
          {/* Time */}
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
          </div>

          {/* Divider */}
          <span className="hidden xs:inline w-1 h-1 bg-gray-200 rounded-full animate-pulse" />

          {/* Date */}
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
          </div>
        </div>

        {/* Mobile Status Badge Skeleton */}
        <div className="flex xs:hidden mt-2 items-center gap-2">
          <div className="h-5 w-16 bg-gray-200 rounded-md animate-pulse" />
        </div>
      </div>

      {/* Action Section Skeleton */}
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 shrink-0">
        {/* Desktop eventTime Badge Skeleton */}
        <div className="hidden xs:block absolute -top-2.5 right-6 h-6 w-20 bg-gray-200 rounded-full animate-pulse z-10" />

        {/* Action Buttons Skeleton */}
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-200 rounded-xl animate-pulse" />
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>
    </article>
  );
};