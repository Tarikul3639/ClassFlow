import { Plus, Calendar, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
  isAdmin?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ isAdmin = true }) => {
  const router = useRouter();

  if (isAdmin) {
    return (
      <div className="py-12 sm:py-16 flex flex-col items-center gap-4 sm:gap-6">
        {/* Icon Circle */}
        <div className="relative">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-linear-to-br from-[#399aef]/10 to-[#399aef]/5 flex items-center justify-center border-2 border-[#399aef]/20">
            <Calendar size={28} className="sm:w-8 sm:h-8 text-[#399aef]/60" strokeWidth={1.5} />
          </div>
          {/* Floating Plus */}
          <div className="absolute -top-1.5 -right-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#399aef] flex items-center justify-center shadow-lg shadow-blue-200">
            <Plus size={14} className="sm:w-4 sm:h-4 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center space-y-1.5 sm:space-y-2 max-w-xs sm:max-w-sm px-4">
          <h3 className="text-base sm:text-lg font-bold text-[#111518] tracking-tight">
            No Events Yet
          </h3>
          <p className="text-xxs sm:text-xxsm text-[#617789] leading-relaxed">
            Get started by creating your first event. Add lectures, assignments, quizzes, or class tests.
          </p>
        </div>

        {/* Create Event Button */}
        <button
          onClick={() => router.push("/dashboard/new")}
          className="group flex items-center gap-2 sm:gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#399aef] hover:bg-[#2d7ac7] text-white font-medium text-xs sm:text-xxsm uppercase tracking-wider shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/50 transition-all duration-300 active:scale-95"
        >
          <Plus size={16} className="sm:w-4 sm:h-4" strokeWidth={3} />
          <span>Create Event</span>
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/60 group-hover:bg-white transition-colors" />
        </button>

        {/* Quick Stats/Tips */}
        <div className="mt-2 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4">
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#f8fafc] border border-[#edf1f4]">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-400" />
            <span className="text-xxxxs sm:text-xxxs font-bold text-[#617789] uppercase tracking-wider">
              Easy Setup
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#f8fafc] border border-[#edf1f4]">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-400" />
            <span className="text-xxxxs sm:text-xxxs font-bold text-[#617789] uppercase tracking-wider">
              Stay Organized
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#f8fafc] border border-[#edf1f4]">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-purple-400" />
            <span className="text-xxxxs sm:text-xxxs font-bold text-[#617789] uppercase tracking-wider">
              Track Progress
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Student/User View
  return (
    <div className="py-12 sm:py-16 flex flex-col items-center gap-4 sm:gap-6">
      {/* Icon Circle */}
      <div className="relative">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-linear-to-br from-blue-400/10 to-emerald-400/5 flex items-center justify-center border-2 border-blue-400/20">
          <Sparkles size={28} className="sm:w-8 sm:h-8 text-blue-500/60" strokeWidth={1.5} />
        </div>
        {/* Decorative Dots */}
        <div className="absolute -top-0.5 -left-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-400 animate-pulse" />
        <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '100ms' }} />
      </div>

      {/* Text Content */}
      <div className="text-center space-y-1.5 sm:space-y-2 max-w-xs sm:max-w-sm px-4">
        <h3 className="text-base sm:text-lg font-bold text-[#111518] tracking-tight">
          All Clear!
        </h3>
        <p className="text-xs sm:text-xxsm text-[#617789] leading-relaxed">
          You're all caught up! No upcoming events at the moment. Time to relax or get ahead on your studies.
        </p>
      </div>

      {/* Motivational Badge */}
      <div className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-linear-to-r from-blue-50 to-emerald-50 border border-blue-200/50">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-400 flex items-center justify-center">
          <Sparkles size={14} className="sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
        </div>
        <span className="text-xs sm:text-sm font-bold text-gray-900">
          Stay Ready, Stay Ahead!
        </span>
      </div>

      {/* Tips Pills */}
      <div className="mt-2 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4">
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#f8fafc] border border-[#edf1f4]">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-400" />
          <span className="text-xxxxs sm:text-xxxs font-bold text-[#617789] uppercase tracking-wider">
            Check Later
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#f8fafc] border border-[#edf1f4]">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-400" />
          <span className="text-xxxxs sm:text-xxxs font-bold text-[#617789] uppercase tracking-wider">
            Enjoy Free Time
          </span>
        </div>
      </div>
    </div>
  );
};