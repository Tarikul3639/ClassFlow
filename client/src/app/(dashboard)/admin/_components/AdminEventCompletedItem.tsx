// _components/AdminEventCompletedItem.tsx
import { CheckCircle2, Calendar, Clock } from "lucide-react";
import { AdminActionButtons } from "./AdminActionButtons";
import { IEvent } from "@/types/event";

interface Props {
  event: IEvent;
  formatDate: (d: string) => string;
  formatTime: (t: string) => string;
}

export const AdminEventCompletedItem = ({
  event,
  formatDate,
  formatTime,
}: Props) => {
  return (
    <article className="group relative flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-3 rounded-3xl bg-[#fdfdfd] border border-[#f0f3f1] opacity-75 hover:opacity-100 transition-all duration-300">
      {/* Dimmed Check Icon - Soft Greenish Tint */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 bg-[#f1f4f2] text-[#86948E] transition-colors group-hover:bg-primary/5 group-hover:text-primary">
        <CheckCircle2
          size={22}
          strokeWidth={2.5}
          className="size-5 sm:size-5.5"
        />
      </div>

      {/* De-emphasized Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-[14px] sm:text-[16px] font-bold text-[#64748b] truncate leading-tight line-through decoration-[#94a3b8]/50">
            {event.title}
          </h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xxxxs font-black uppercase tracking-tighter bg-[#f1f5f9] text-[#94a3b8] border border-[#e2e8f0]">
            Archived
          </span>
        </div>

        <div className="flex flex-col xs:flex-row xs:items-center gap-1 sm:gap-3 mt-0.5 text-xs font-semibold text-[#94a3b8]">
          <span className="flex items-center gap-1.5 tabular-nums">
            <Clock size={13} className="opacity-60" />
            {formatTime(event.startAt)}
          </span>
          <span className="hidden xs:inline w-1 h-1 bg-[#e2e8f0] rounded-full" />
          <span className="flex items-center gap-1.5">
            <Calendar size={13} className="opacity-60" />
            {formatDate(event.date)}
          </span>
        </div>
      </div>

      {/* Action Buttons - Compact Style */}
      <div className="shrink-0 ml-auto sm:ml-0 opacity-40 group-hover:opacity-100 transition-opacity">
        <AdminActionButtons id={event._id} />
      </div>
    </article>
  );
};
