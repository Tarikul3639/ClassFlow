"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MapPin,
  ChevronUp,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Folder,
  FileText,
  Check,
} from "lucide-react";

import { Event } from "@/types/event";
import { useEventTime } from "@/hooks/useEventTime";

interface EventCardProps {
  event: Event;
  color: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;

  /** If true, highlights this card as the next upcoming event */
  highlight?: boolean;

  /** Function to format startAt/endAt datetime into readable string */
  formatTime?: (iso: string) => string;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  color,
  icon,
  isExpanded,
  onToggle,
  highlight = false,
  formatTime = (iso) =>
    new Date(iso).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    }),
}) => {
  const eventTime = useEventTime(event.date, event.startAt, event.endAt);

  return (
    <article
      className={`relative rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden`}
      style={{
        borderLeftWidth: "5px",
        borderColor: `${color}50`,
        borderLeftColor: color,
        backgroundColor: `${color}01`,
      }}
    >
      {/* Top-right cooldown / deadline */}
      {eventTime && (
        <span
          className="absolute top-1 right-2 text-xxs font-black uppercase tracking-widest px-2.5 py-1 rounded-lg"
          style={{
            backgroundColor: `${color}20`,
            color: color,
          }}
        >
          {eventTime}
        </span>
      )}

      {/* Header */}
      <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-5 relative">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${color}10`, color }}
        >
          {icon}
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-bold leading-tight flex items-center gap-2">
            {event.title}
            {highlight && (
              <span className="text-xs font-black text-[#399aef] uppercase tracking-widest bg-[#399aef]15 px-2 py-0.5 rounded">
                NEXT
              </span>
            )}
          </h2>

          <div className="flex items-center gap-3 mt-1.5 text-[13px] font-medium text-[#617789]">
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {formatTime(event.startAt)}
              {event.endAt && ` - ${formatTime(event.endAt)}`}
            </span>

            {event.location && (
              <>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  {event.location}
                </span>
              </>
            )}
          </div>
        </div>

        <button
          onClick={onToggle}
          className="sm:self-center px-4 py-2 rounded-xl bg-[#F0F2F4] hover:bg-[#e5e7eb] text-[#111518] text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          {isExpanded ? "Close" : "Details"}
          {isExpanded ? <ChevronUp size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* Expanded */}
      <AnimatePresence>
        {isExpanded && (event.topics || event.materials) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-6"
          >
            <div
              className="rounded-xl p-5 border border-[#dbe1e6] grid md:grid-cols-2 gap-6"
              style={{ backgroundColor: `${color}05` }}
            >
              {/* Topics */}
              {event.topics && (
                <div className="space-y-3">
                  <h3 className="text-[11px] font-black text-[#617789] uppercase tracking-widest flex items-center gap-2">
                    <BookOpen size={14} /> Topics Covered
                  </h3>
                  <ul className="space-y-2.5">
                    {event.topics.map((t, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm font-bold text-[#445668]"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-[#399aef] mt-0.5 shrink-0"
                        />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Materials */}
              {event.materials && (
                <div className="space-y-3 md:col-span-2">
                  <h3 className="text-[11px] font-black text-[#617789] uppercase tracking-widest flex items-center gap-2">
                    <Folder size={14} /> Materials
                  </h3>
                  <div className="flex flex-wrap gap-2">
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
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-[#dbe1e6] rounded-xl text-xs font-bold hover:border-[#399aef] hover:text-[#399aef] transition-all group"
                      >
                        <FileText size={14} />
                        {m.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Prepared */}
              <div className="md:col-span-2 pt-4 border-t border-[#dbe1e6]">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-5 h-5 border-2 border-[#dbe1e6] rounded-lg peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all" />
                    <Check
                      size={14}
                      className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                      strokeWidth={4}
                    />
                  </div>
                  <span className="text-sm font-bold text-[#617789] group-hover:text-[#111518]">
                    Mark as Prepared
                  </span>
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

export default EventCard;
