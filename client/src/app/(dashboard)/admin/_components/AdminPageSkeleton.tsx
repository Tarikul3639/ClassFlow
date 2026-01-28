"use client";

import React from "react";
import { Search } from "lucide-react";
import { AdminEventItemSkeleton } from "./AdminEventItemSkeleton";

export const AdminPageSkeleton: React.FC = () => {
  const categories = [
    "All Events",
    "Class Tests",
    "Quizzes",
    "Assignments",
    "Lectures",
  ];

  return (
    <>
      {/* Header Skeleton */}
      <header className="flex flex-row items-center justify-between gap-4">
        <div className="space-y-2">
          {/* Title */}
          <div className="h-8 sm:h-10 lg:h-12 bg-gray-200 rounded animate-pulse w-64" />
          
          {/* Subtitle with badge */}
          <div className="flex items-center gap-2">
            <span className="flex w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse" />
            <div className="h-3 sm:h-4 bg-gray-200 rounded animate-pulse w-32" />
          </div>
        </div>

        {/* Add Button Skeleton */}
        <div className="h-11 w-11 sm:h-12 sm:w-32 rounded-2xl bg-gray-200 animate-pulse shrink-0" />
      </header>

      {/* Search & Filter Skeleton */}
      <div className="space-y-4">
        {/* Search Bar Skeleton */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#617789]">
            <Search size={18} className="opacity-30" />
          </div>
          <div className="w-full h-12 pl-11 pr-4 rounded-2xl bg-gray-100 animate-pulse" />
        </div>

        {/* Category Buttons Skeleton */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <div
              key={cat}
              className="h-9 px-4 py-2 rounded-xl bg-gray-200 animate-pulse whitespace-nowrap"
              style={{ width: `${cat.length * 8 + 32}px` }}
            />
          ))}
        </div>
      </div>

      {/* Event List Skeleton */}
      <div className="flex flex-col gap-4">
        <AdminEventItemSkeleton />
        <AdminEventItemSkeleton />
        <AdminEventItemSkeleton />
        <AdminEventItemSkeleton />
        <AdminEventItemSkeleton />
        <AdminEventItemSkeleton />
      </div>
    </>
  );
};