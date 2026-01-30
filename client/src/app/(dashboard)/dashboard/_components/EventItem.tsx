import {
  Calendar,
  Clock,
  Check,
  FileText,
  Folder,
  MessageSquare,
  Download,
} from "lucide-react";
import { useEventTime } from "@/hooks/useEventTime";
import { ActionButtons } from "./ActionButtons";
import { IEvent } from "@/redux/slices/classroom/types";
import { EVENT_UI } from "@/config/event-ui";
import { AnimatePresence, motion } from "motion/react";
import { setMarkEventAsPrepared } from "@/redux/slices/classroom/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

interface Props {
  event: IEvent;
  formatDate: (d: string) => string;
  formatTime: (t: string) => string;
  highlight?: boolean;
  isAdmin?: boolean;
  expandedId?: string | null;
  setExpandedId?: React.Dispatch<React.SetStateAction<string | null>>;
}

export const EventItem = ({
  event,
  formatDate,
  formatTime,
  highlight,
  expandedId,
  setExpandedId,
  isAdmin = false,
}: Props) => {
  const dispatch = useAppDispatch();
  const updating = useAppSelector(
    (state) => state.classroom.requestStatus.updateEvent.loading,
  );
  const eventTime = useEventTime(event.date, event.startAt, event.endAt);
  const ui = EVENT_UI[event.type] || EVENT_UI.lecture;
  const Icon = ui.icon;
  const color = ui.color;
  const isExpanded = expandedId === event._id;

  const toggleExpand = () => {
    if (setExpandedId) {
      setExpandedId(isExpanded ? null : event._id);
    }
  };

  const hasExpandableContent = event.topics || event.materials;

  return (
    <article
      className="group relative flex flex-col px-4 sm:px-6 py-4 rounded-3xl bg-white border border-[#edf1f4] hover:border-[#399aef]/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300"
      style={{
        ...(isExpanded && {
          borderLeftWidth: "5px",
          borderColor: `${color}50`,
          borderLeftColor: color,
          backgroundColor: `${color}01`,
        }),
      }}
    >
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Visual Accent (Side Bar) */}
        <div
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-300 ${
            isExpanded ? "hidden" : "h-8 group-hover:h-12"
          }`}
          style={{ backgroundColor: color }}
        />

        {/* Icon Box - Centered & Premium */}
        <div
          className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:rotate-6 shadow-sm ${isExpanded && "rotate-6"}`}
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
              <div
                className="text-xxxs font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-[#617789]"
                style={{
                  color: color,
                }}
              >
                <span className="opacity-90">{eventTime}</span>
              </div>
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
            <div
              className="hidden xs:block absolute -top-2.5 right-6 text-xxxs font-black uppercase tracking-widest rounded-full bg-white border shadow-sm z-10"
              style={{
                borderColor: `${color}30`,
                boxShadow: `0 2px 6px ${color}20`,
              }}
            >
              <span
                className="inline-flex px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: `${color}20`,
                  color: color,
                }}
              >
                {eventTime}
              </span>
            </div>
          )}

          <div className="shrink-0 ml-auto sm:ml-0">
            <ActionButtons
              _id={event._id}
              onToggleExpand={toggleExpand}
              isExpanded={isExpanded}
              isAdmin={isAdmin}
            />
          </div>
        </div>
      </div>

      {/* Expanded */}
      <AnimatePresence>
        {isExpanded && hasExpandableContent && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-4"
          >
            <div
              className="rounded-xl p-5 border border-[#dbe1e6] grid gap-6"
              style={{ backgroundColor: `${color}05` }}
            >
              {/* Topic Details Section */}
              {event.topics && (
                <div className="space-y-3">
                  <h3 className="text-xxs font-black text-[#617789] uppercase tracking-[0.15em] flex items-center gap-2">
                    <MessageSquare size={14} className="text-[#617789]" /> Topic
                    Details
                  </h3>
                  <div
                    className="text-xsm sm:text-sm leading-relaxed text-gray-700 italic px-4 py-2 rounded-lg border-l-4"
                    style={{ borderLeftColor: `${color}30` }}
                  >
                    {event.topics.length > 0
                      ? event.topics + "."
                      : "No specific details provided for this event."}
                  </div>
                </div>
              )}

              {/* Materials - Updated Design */}
              {event.materials && event.materials.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xxs font-black text-[#617789] uppercase tracking-[0.15em] flex items-center gap-2">
                    <Folder size={14} className="text-[#617789]" /> Materials
                  </h3>
                  <div className="space-y-2">
                    {event.materials.map((m, i) => (
                      <a
                        key={i}
                        href={m.url}
                        download={
                          m.type === "pdf" || m.type === "docx"
                            ? m.name
                            : undefined
                        }
                        target={m.type === "image" ? "_blank" : "_self"}
                        className="group/link flex items-center justify-between p-3 rounded-lg bg-white border border-[#dbe1e6] hover:border-[#399aef] transition-all"
                        style={{
                          borderColor: `${color}20`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = color;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = `${color}20`;
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <FileText size={18} style={{ color }} />
                          <span className="text-xs sm:text-sm font-bold text-gray-700 group-hover/link:text-[#111518]">
                            {m.name}
                          </span>
                        </div>
                        <Download
                          size={16}
                          className="text-gray-300 group-hover/link:text-[#399aef] transition-colors"
                          style={{
                            color: "currentColor",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = color;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "";
                          }}
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Prepared - Only for users */}
              {!isAdmin && (
                <div className="pt-4 border-t border-[#dbe1e6]">
                  <label
                    className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer group transition-colors"
                    style={{
                      backgroundColor: `${color}05`,
                      borderWidth: "1px",
                      borderColor: `${color}10`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${color}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${color}05`;
                    }}
                  >
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={event.isCompleted}
                        disabled={updating}
                        onChange={() =>
                          dispatch(
                            setMarkEventAsPrepared({
                              eventId: event._id,
                              isCompleted: !event.isCompleted,
                            }),
                          )
                        }
                      />
                      <div
                        className="w-5 h-5 rounded border-2 transition-all peer-checked:border-0"
                        style={{
                          borderColor: `${color}40`,
                          backgroundColor: event.isCompleted
                            ? color
                            : "transparent",
                        }}
                      />
                      <Check
                        size={14}
                        className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                        strokeWidth={3}
                      />
                    </div>
                    <span
                      className="text-sm font-bold text-[#617789] transition-colors"
                      style={{
                        color: event.isCompleted ? color : "",
                      }}
                    >
                      Mark as Prepared
                    </span>
                  </label>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};
