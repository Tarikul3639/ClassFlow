export const CompletedEventSkeleton = () => {
  return (
    <article className="group relative flex items-center gap-3 sm:gap-5 px-3 sm:px-4 md:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-3xl bg-gray-50/50 border border-[#e5e7eb] opacity-60 animate-pulse">
      {/* Side Accent Skeleton */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full bg-gray-200 opacity-30" />

      {/* Icon Skeleton */}
      <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-gray-200 shrink-0" />

      {/* Content Skeleton */}
      <div className="flex-1 min-w-0 space-y-0.5 sm:space-y-1">
        {/* Title + Badge */}
        <div className="flex items-center gap-2">
          <div className="h-3.75 sm:h-4 md:h-4 bg-gray-200 rounded-lg w-40" />
          <div className="h-4 w-20 bg-gray-200 rounded inline-flex" />
        </div>

        {/* Metadata */}
        <div className="flex flex-col xs:flex-row xs:items-center gap-0.5 xs:gap-1 sm:gap-3">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-gray-200" />
            <div className="h-3 sm:h-3.5 w-16 bg-gray-200 rounded" />
          </div>
          <div className="hidden xs:inline w-1 h-1 bg-gray-300 rounded-full opacity-50" />
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-gray-200" />
            <div className="h-3 sm:h-3.5 w-24 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* Completion Badge Skeleton */}
      <div className="hidden xs:flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gray-200 opacity-40" />

      {/* Action Buttons Skeleton - Desktop */}
      <div className="hidden sm:flex items-center gap-0.5 sm:gap-1 bg-gray-100 p-0.5 sm:p-1 rounded-lg sm:rounded-xl opacity-30">
        <div className="w-8 h-8 md:w-9 md:h-9 bg-gray-200 rounded-md sm:rounded-lg" />
        <div className="w-px h-4 bg-gray-200 mx-0.5" />
        <div className="w-8 h-8 md:w-9 md:h-9 bg-gray-200 rounded-md sm:rounded-lg" />
        <div className="w-8 h-8 md:w-9 md:h-9 bg-gray-200 rounded-md sm:rounded-lg" />
      </div>

      {/* Mobile Action Button */}
      <div className="sm:hidden shrink-0 w-9 h-9 bg-gray-200 rounded-lg opacity-30" />
    </article>
  );
};