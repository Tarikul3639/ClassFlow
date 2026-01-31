import { Skeleton } from "@/components/ui/skeleton";

interface ProfileSkeletonProps {
  type: 'admin' | 'student';
}

const ProfileSkeleton = ({ type }: ProfileSkeletonProps) => {
  return (
    <>
      {/* Profile Header Skeleton */}
      <div className="relative bg-linear-to-r from-[#399aef] to-[#4D9DE0] rounded-2xl p-6 md:p-8 overflow-hidden shadow-md shadow-blue-100/40">
        {/* Back Button Skeleton */}
        <div className="absolute top-4 left-4 md:top-5 z-10">
          <Skeleton className="w-10 h-10 rounded-full bg-white/20" />
        </div>

        <div className="relative flex flex-col md:flex-row md:mx-6 items-center gap-6">
          <Skeleton className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20" />
          <div className="flex-1 text-center md:text-left space-y-3 w-full">
            <Skeleton className="h-7 w-48 bg-white/20 mx-auto md:mx-0 rounded-lg" />
            <div className="flex justify-center md:justify-start gap-3">
              <Skeleton className="h-6 w-24 bg-white/20 rounded-lg" />
              <Skeleton className="h-6 w-32 bg-white/20 rounded-lg" />
            </div>
          </div>
          <Skeleton className="h-9 w-28 bg-white/20 rounded-xl" />
        </div>
      </div>

      {/* Account Information Skeleton */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#dbe1e6] overflow-hidden">
        <div className="p-4 px-6 border-b border-[#dbe1e6] bg-gray-50/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Skeleton className="w-8 h-8 rounded-md bg-gray-200" />
            <Skeleton className="h-5 w-40 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="divide-y divide-[#dbe1e6]">
          {/* Email Address Field */}
          <div className="px-4 md:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
              <Skeleton className="w-8 h-8 rounded-lg shrink-0 bg-gray-200" />
              <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                <Skeleton className="h-3 w-24 bg-gray-200 rounded" />
                <Skeleton className="h-4 w-48 bg-gray-200 rounded" />
              </div>
            </div>
            <Skeleton className="ml-2 h-8 w-16 rounded-lg shrink-0 bg-gray-200" />
          </div>

          {/* ID Field */}
          <div className="px-4 md:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
              <Skeleton className="w-8 h-8 rounded-lg shrink-0 bg-gray-200" />
              <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                <Skeleton className="h-3 w-20 bg-gray-200 rounded" />
                <Skeleton className="h-4 w-32 bg-gray-200 rounded" />
              </div>
            </div>
            <Skeleton className="ml-2 h-8 w-16 rounded-lg shrink-0 bg-gray-200" />
          </div>

          {type === "admin" ? (
            <>
              {/* Role Field */}
              <div className="px-4 md:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  <Skeleton className="w-8 h-8 rounded-lg shrink-0 bg-gray-200" />
                  <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                    <Skeleton className="h-3 w-16 bg-gray-200 rounded" />
                    <Skeleton className="h-4 w-28 bg-gray-200 rounded" />
                  </div>
                </div>
                <Skeleton className="ml-2 h-8 w-16 rounded-lg shrink-0 bg-gray-200" />
              </div>

              {/* Institute ID Field */}
              <div className="px-4 md:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  <Skeleton className="w-8 h-8 rounded-lg shrink-0 bg-gray-200" />
                  <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                    <Skeleton className="h-3 w-24 bg-gray-200 rounded" />
                    <Skeleton className="h-4 w-28 bg-gray-200 rounded" />
                  </div>
                </div>
                <Skeleton className="ml-2 h-8 w-16 rounded-lg shrink-0 bg-gray-200" />
              </div>

              {/* Department ID Field */}
              <div className="px-4 md:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  <Skeleton className="w-8 h-8 rounded-lg shrink-0 bg-gray-200" />
                  <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                    <Skeleton className="h-3 w-28 bg-gray-200 rounded" />
                    <Skeleton className="h-4 w-36 bg-gray-200 rounded" />
                  </div>
                </div>
                <Skeleton className="ml-2 h-8 w-16 rounded-lg shrink-0 bg-gray-200" />
              </div>
            </>
          ) : (
            <>
              {/* Department Field */}
              <div className="px-4 md:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  <Skeleton className="w-8 h-8 rounded-lg shrink-0 bg-gray-200" />
                  <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                    <Skeleton className="h-3 w-24 bg-gray-200 rounded" />
                    <Skeleton className="h-4 w-56 bg-gray-200 rounded" />
                  </div>
                </div>
                <Skeleton className="ml-2 h-8 w-16 rounded-lg shrink-0 bg-gray-200" />
              </div>

              {/* Intake Field */}
              <div className="px-4 md:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  <Skeleton className="w-8 h-8 rounded-lg shrink-0 bg-gray-200" />
                  <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                    <Skeleton className="h-3 w-16 bg-gray-200 rounded" />
                    <Skeleton className="h-4 w-28 bg-gray-200 rounded" />
                  </div>
                </div>
                <Skeleton className="ml-2 h-8 w-16 rounded-lg shrink-0 bg-gray-200" />
              </div>

              {/* Section Field */}
              <div className="px-4 md:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  <Skeleton className="w-8 h-8 rounded-lg shrink-0 bg-gray-200" />
                  <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                    <Skeleton className="h-3 w-16 bg-gray-200 rounded" />
                    <Skeleton className="h-4 w-12 bg-gray-200 rounded" />
                  </div>
                </div>
                <Skeleton className="ml-2 h-8 w-16 rounded-lg shrink-0 bg-gray-200" />
              </div>

              {/* Class Section ID Field */}
              <div className="px-4 md:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  <Skeleton className="w-8 h-8 rounded-lg shrink-0 bg-gray-200" />
                  <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                    <Skeleton className="h-3 w-32 bg-gray-200 rounded" />
                    <Skeleton className="h-4 w-24 bg-gray-200 rounded" />
                  </div>
                </div>
                <Skeleton className="ml-2 h-8 w-16 rounded-lg shrink-0 bg-gray-200" />
              </div>
            </>
          )}
        </div>
      </section>

      {/* Admin-specific sections */}
      {type === "admin" && (
        <>
          {/* User Management Skeleton */}
          <section className="bg-white rounded-2xl shadow-sm border border-[#dbe1e6] overflow-hidden">
            <div className="p-4 px-6 border-b border-[#dbe1e6] bg-gray-50/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Skeleton className="w-8 h-8 rounded-md bg-gray-200" />
                <Skeleton className="h-5 w-36 bg-gray-200 rounded" />
              </div>
              <Skeleton className="h-9 w-32 rounded-xl bg-gray-200" />
            </div>
            <div className="p-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-[#dbe1e6]"
                >
                  <Skeleton className="w-12 h-12 rounded-full shrink-0 bg-gray-200" />
                  <div className="flex-1 space-y-2 min-w-0">
                    <Skeleton className="h-4 w-32 bg-gray-200 rounded" />
                    <Skeleton className="h-3 w-24 bg-gray-200 rounded" />
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-16 rounded-lg bg-gray-200" />
                      <Skeleton className="h-5 w-20 rounded-lg bg-gray-200" />
                    </div>
                  </div>
                  <Skeleton className="w-8 h-8 rounded-lg shrink-0 bg-gray-200" />
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Security Section Skeleton */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#dbe1e6] overflow-hidden">
        <div className="p-4 px-6 border-b border-[#dbe1e6] bg-gray-50/20">
          <div className="flex items-center gap-2.5">
            <Skeleton className="w-8 h-8 rounded-md bg-gray-200" />
            <Skeleton className="h-5 w-24 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="divide-y divide-[#dbe1e6]">
          {/* Password Field */}
          <div className="px-4 md:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
              <Skeleton className="w-8 h-8 rounded-lg shrink-0 bg-gray-200" />
              <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                <Skeleton className="h-3 w-20 bg-gray-200 rounded" />
                <Skeleton className="h-4 w-24 bg-gray-200 rounded" />
              </div>
            </div>
            <Skeleton className="ml-2 h-8 w-16 rounded-lg shrink-0 bg-gray-200" />
          </div>

          {/* Logout Button (Admin only) */}
          {type === "admin" && (
            <div className="px-4 md:px-6 py-4">
              <Skeleton className="w-full h-16 rounded-xl bg-gray-200" />
            </div>
          )}
        </div>
      </section>

      {/* Profile Actions Skeleton */}
      <div className="flex justify-end items-center gap-3">
        <Skeleton className="h-10 w-28 rounded-xl bg-gray-200" />
        <Skeleton className="h-10 w-40 rounded-xl bg-gray-200" />
      </div>

      {/* Metadata Section Skeleton */}
      <div className="bg-gray-50 rounded-xl p-4 border border-[#dbe1e6]">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center space-y-2">
            <Skeleton className="h-3 w-20 mx-auto bg-gray-200 rounded" />
            <Skeleton className="h-4 w-24 mx-auto bg-gray-200 rounded" />
          </div>
          <div className="text-center space-y-2">
            <Skeleton className="h-3 w-20 mx-auto bg-gray-200 rounded" />
            <Skeleton className="h-4 w-24 mx-auto bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSkeleton;