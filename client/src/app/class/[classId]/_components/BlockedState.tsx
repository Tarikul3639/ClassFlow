import { ShieldX, Info, ArrowLeft, LockKeyhole } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { leaveClassroomThunk } from "@/redux/slices/classroom/thunks/classroom";
import { classroomId } from "@/redux/selectors/selectors";
import { extractErrorMessage } from "@/lib/utils/error.utils";
import { toast } from "sonner";

interface BlockedStateProps {
  userName?: string;
}

export const BlockedState: React.FC<BlockedStateProps> = ({ userName }) => {
  // Handle leave classroom
  const dispatch = useAppDispatch();
  const classId = useAppSelector(classroomId);
  const handleLeaveClassroom = async () => {
    if (!classId) return;

    toast.loading("Leaving classroom...", { id: "leave-classroom" });
    try {
      await dispatch(leaveClassroomThunk({ classroomId: classId })).unwrap();
      toast.success("Successfully left the classroom!", {
        id: "leave-classroom",
      });
      // Optionally redirect to dashboard
    } catch (error: any) {
      console.error("Leave classroom failed:", error);
      toast.error(extractErrorMessage(error), {
        id: "leave-classroom",
      });
    }
  };
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-10 sm:py-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Visual Indicator */}
      <div className="relative mb-6 sm:mb-8">
        {/* Main Icon Container */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-4xl sm:rounded-4xl bg-red-50 flex items-center justify-center border border-red-100 relative z-20 shadow-sm">
          <LockKeyhole
            size={32}
            className="sm:w-10 sm:h-10 text-red-500/80"
            strokeWidth={1.5}
          />
        </div>

        {/* Pulsing Background Glow - Responsive size */}
        <div className="absolute inset-0 bg-red-100/40 rounded-full blur-2xl z-10 scale-125 sm:scale-150 animate-pulse" />

        {/* Small Restriction Badge */}
        <div className="absolute -top-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-red-100 flex items-center justify-center shadow-md z-30">
          <ShieldX size={14} className="sm:w-4 sm:h-4 text-red-600" />
        </div>
      </div>

      {/* Main Message */}
      <div className="text-center space-y-2 sm:space-y-3 max-w-70 sm:max-w-sm px-2">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          Access Restricted
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
          {userName ? `${userName}, your` : "Your"} access to this classroom is
          currently limited. You cannot view events or materials at this time.
        </p>
      </div>

      {/* Info Pill - Mobile Optimized */}
      <div className="mt-6 sm:mt-8 flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-50/50 rounded-full border border-red-100/50">
        <Info size={12} className="sm:w-3.5 sm:h-3.5 text-red-500" />
        <span className="text-xxs sm:text-[11px] font-bold text-red-700 uppercase tracking-widest">
          Contact Administrator
        </span>
      </div>

      {/* Navigation - Full width on very small screens */}
      <div className="mt-8 sm:mt-10 w-full flex justify-center">
        <button
          onClick={handleLeaveClassroom}
          className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border border-red-200 text-red-600 font-bold text-[11px] sm:text-xs uppercase tracking-wider hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all active:scale-95 shadow-sm"
        >
          <ArrowLeft size={14} />
          <span>Exit Classroom</span>
        </button>
      </div>
    </div>
  );
};
