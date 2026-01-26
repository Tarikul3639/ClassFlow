// _components/AdminEventItem.tsx
import { Calendar, Clock, Edit3, Trash2, ArrowRight } from "lucide-react";
import { useEventTime } from "@/hooks/useEventTime";
import { AdminActionButtons } from "./AdminActionButtons";
import { IEvent } from "@/types/event";
import { EVENT_UI } from "@/config/event-ui";

interface Props {
  event: IEvent;
  formatDate: (d: string) => string;
  formatTime: (t: string) => string;
  highlight?: boolean;
}

export const AdminEventItem = ({
  event,
  formatDate,
  formatTime,
  highlight,
}: Props) => {
  const eventTime = useEventTime(event.date, event.startAt, event.endAt);
  const ui = EVENT_UI[event.type] || EVENT_UI.lecture;
  const Icon = ui.icon;

  return (
    <article className="group relative flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-4 rounded-3xl bg-white border border-[#edf1f4] hover:border-[#399aef]/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300">
      {/* Visual Accent (Side Bar) */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full transition-all group-hover:h-12"
        style={{ backgroundColor: ui.color }}
      />

      {/* Icon Box - Centered & Premium */}
      <div
        className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:rotate-6 shadow-sm"
        style={{ backgroundColor: `${ui.color}10`, color: ui.color }}
      >
        <Icon size={24} className="size-5.5 sm:size-6.5" strokeWidth={2.2} />
      </div>

      {/* Content Area */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-2sm sm:text-[17px] font-bold text-[#111518] truncate tracking-tight">
            {event.title}
          </h3>

          {highlight && (
            <span className="hidden xs:inline-flex items-center px-2 py-0.5 rounded-md text-xxxs font-black bg-[#399aef] text-white tracking-widest uppercase">
              NEXT
            </span>
          )}
        </div>

        {/* Metadata Row */}
        <div className="flex flex-col xs:flex-row xs:items-center gap-1 sm:gap-3 text-[#617789]">
          <div className="flex items-center gap-1.5 text-xs sm:text-xsm font-semibold">
            <Clock size={14} className="text-[#399aef]/70" />
            <span className="tabular-nums">
              {formatTime(event.startAt)}
              {event.endAt && <span className="mx-1 opacity-50">→</span>}
              {event.endAt && formatTime(event.endAt)}
            </span>
          </div>

          <span className="hidden xs:inline w-1 h-1 bg-gray-200 rounded-full" />

          <div className="flex items-center gap-1.5 text-xs sm:text-xsm font-semibold">
            <Calendar size={14} className="text-[#399aef]/70" />
            <span>{formatDate(event.date)}</span>
          </div>
        </div>

        {/* Status/Relative Time Badge (Mobile Optimized) */}
        <div className="flex xs:hidden mt-2 items-center gap-2">
          {eventTime && (
            <span className="text-xxxs font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-[#617789]">
              {eventTime}
            </span>
          )}
          {highlight && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xxxs font-black bg-gray-100 text-[#399aef]/70 tracking-widest uppercase">
              NEXT
            </span>
          )}
        </div>
      </div>

      {/* Action Section */}
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 shrink-0">
        {/* Desktop eventTime - Floating Style */}
        {eventTime && (
          <span className="hidden xs:block absolute -top-2.5 right-6 text-xxs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white border border-[#edf1f4] shadow-sm text-[#399aef] z-10">
            {eventTime}
          </span>
        )}

        <div className="shrink-0 ml-auto sm:ml-0">
          <AdminActionButtons
            id={event._id}
          />
        </div>
      </div>
    </article>
  );
};
