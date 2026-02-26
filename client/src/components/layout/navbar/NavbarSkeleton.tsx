import { Skeleton } from "@/components/ui/skeleton";

const NavbarSkeleton = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[85%] md:w-[75%] lg:w-[60%] max-w-5xl font-display">
      <div className="bg-white/70 backdrop-blur-md border border-blue-100 px-4 md:px-6 py-2.5 md:py-3 rounded-full shadow-lg shadow-[#399aef]/5 flex justify-between items-center">
        {/* Logo Section Skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gray-200" />
          <Skeleton className="h-5 w-24 md:w-28 rounded bg-gray-200" />
        </div>

        {/* Right Actions Skeleton */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Dashboard Link Skeleton */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full">
            <Skeleton className="w-4.25 h-4.25 rounded bg-gray-200" />
            <Skeleton className="hidden sm:block h-3 w-20 rounded bg-gray-200" />
          </div>

          {/* Weather Section Skeleton */}
          <div className="hidden xs:flex items-center gap-2 bg-blue-50/50 px-2.5 py-1.5 md:px-3 rounded-full border border-blue-100/50">
            <Skeleton className="w-3.5 h-3.5 rounded bg-gray-200" />
            <Skeleton className="h-3 w-12 md:w-20 rounded bg-gray-200" />
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-[#dbe1e6] hidden md:block"></div>

          {/* Notification Bell Skeleton */}
          <div className="p-2 rounded-xl relative">
            <Skeleton className="w-4.5 h-4.5 md:w-5 md:h-5 rounded bg-gray-200" />
            <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-gray-300 rounded-full border-2 border-white"></span>
          </div>

          {/* Profile Avatar Skeleton */}
          <Skeleton className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-[#dbe1e6] bg-gray-200" />
        </div>
      </div>
    </nav>
  );
};

export default NavbarSkeleton;