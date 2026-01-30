export const EventItemSkeleton = () => {
  return (
    <article className="group relative flex flex-col px-4 sm:px-6 py-4 rounded-3xl bg-white border border-[#edf1f4] animate-pulse">
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Side Bar Skeleton */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gray-200" />

        {/* Icon Box Skeleton */}
        <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gray-200 shrink-0 shadow-sm" />

        {/* Content Area Skeleton */}
        <div className="flex-1 min-w-0 space-y-1">
          {/* Title + Badge Row */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="h-4.25 sm:h-5 bg-gray-200 rounded-lg w-48 max-w-[60%]" />
            <div className="h-4.5 w-12 bg-gray-200 rounded-md hidden xs:inline-flex" />
          </div>

          {/* Metadata Row */}
          <div className="flex flex-col xs:flex-row xs:items-center gap-1 sm:gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-gray-200" />
              <div className="h-3.5 sm:h-4 w-20 bg-gray-200 rounded" />
            </div>
            <div className="hidden xs:inline w-1 h-1 bg-gray-200 rounded-full" />
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-gray-200" />
              <div className="h-3.5 sm:h-4 w-28 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Mobile Badge */}
          <div className="flex xs:hidden mt-2 items-center gap-2">
            <div className="h-4.5 w-16 bg-gray-200 rounded-md" />
            <div className="h-4.5 w-12 bg-gray-200 rounded-md" />
          </div>
        </div>

        {/* Action Section Skeleton */}
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 shrink-0">
          {/* Desktop eventTime Badge - Floating Style */}
          <div className="hidden xs:block absolute -top-2.5 right-6 h-6 w-20 bg-gray-200 rounded-full z-10 shadow-sm" />

          {/* Action Buttons Skeleton - Desktop */}
          <div className="hidden sm:flex items-center gap-0.5 sm:gap-1 bg-[#f8fafc] p-0.5 sm:p-1 rounded-lg sm:rounded-xl border border-[#edf1f4]">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-gray-200 rounded-md sm:rounded-lg" />
            <div className="w-px h-4 bg-gray-200 mx-0.5" />
            <div className="w-8 h-8 md:w-9 md:h-9 bg-gray-200 rounded-md sm:rounded-lg" />
            <div className="w-8 h-8 md:w-9 md:h-9 bg-gray-200 rounded-md sm:rounded-lg" />
          </div>

          {/* Mobile Dropdown Button */}
          <div className="sm:hidden w-9 h-9 bg-gray-200 rounded-lg ml-auto sm:ml-0" />
        </div>
      </div>
    </article>
  );
};