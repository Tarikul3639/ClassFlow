import { CheckCircle2, Calendar, Clock } from "lucide-react";
import { ActionButtons } from "./ActionButtons";
import { IEvent } from "@/redux/slices/classroom/types";
import { EVENT_UI } from "@/config/event-ui";

interface Props {
  event: IEvent;
  formatDate: (d: string) => string;
  formatTime: (t: string) => string;
  isAdmin?: boolean;
}

export const CompletedEvent = ({
  event,
  formatDate,
  formatTime,
  isAdmin = true,
}: Props) => {
  const ui = EVENT_UI[event.type] || EVENT_UI.lecture;
  const Icon = ui.icon;
  const color = ui.color;

  return (
    <article className="group relative flex items-center gap-3 sm:gap-5 px-3 sm:px-4 md:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-3xl bg-gray-50/50 border border-[#e5e7eb] opacity-60 hover:opacity-100 transition-all duration-300">
      {/* Subtle Side Accent */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full opacity-30 transition-all group-hover:h-8 group-hover:opacity-50"
        style={{ backgroundColor: color }}
      />

      {/* Dimmed Icon - Uses event type color */}
      <div
        className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 transition-all"
        style={{
          backgroundColor: `${color}08`,
          color: `${color}80`,
        }}
      >
        <Icon size={20} className="sm:size-5 md:size-5.5" strokeWidth={2.2} />
      </div>

      {/* Content - De-emphasized */}
      <div className="flex-1 min-w-0 space-y-0.5 sm:space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm sm:text-2sm md:text-[16px] font-bold text-[#94a3b8] truncate leading-tight line-through decoration-[#cbd5e1]/50">
            {event.title}
          </h3>
          <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded text-xxxxs sm:text-xxxs font-black uppercase tracking-wider bg-gray-100 text-gray-400 border border-gray-200">
            Completed
          </span>
        </div>

        {/* Metadata - Muted */}
        <div className="flex flex-col xs:flex-row xs:items-center gap-0.5 xs:gap-1 sm:gap-3 text-[#94a3b8]">
          <div className="flex items-center gap-1 sm:gap-1.5 text-xxs sm:text-xs font-semibold">
            <Clock size={12} className="sm:w-3.5 sm:h-3.5 opacity-60" />
            <span className="tabular-nums">{formatTime(event.startAt)}</span>
          </div>

          <span className="hidden xs:inline w-1 h-1 bg-gray-300 rounded-full opacity-50" />

          <div className="flex items-center gap-1 sm:gap-1.5 text-xxs sm:text-xs font-semibold">
            <Calendar size={12} className="sm:w-3.5 sm:h-3.5 opacity-60" />
            <span>{formatDate(event.date)}</span>
          </div>
        </div>
      </div>

      {/* Completion Badge */}
      <div className="hidden xs:flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-green-50 border border-green-100 opacity-40 group-hover:opacity-60 transition-opacity">
        <CheckCircle2 size={18} className="text-green-600" strokeWidth={2.5} />
      </div>

      {/* Action Buttons - Only for Admin */}
      {isAdmin && (
        <div className="shrink-0 opacity-30 group-hover:opacity-100 transition-opacity">
          <ActionButtons
            _id={event._id}
            isAdmin={isAdmin}
            isExpanded={false}
            onToggleExpand={() => {}} // No expand for completed items
          />
        </div>
      )}
    </article>
  );
};