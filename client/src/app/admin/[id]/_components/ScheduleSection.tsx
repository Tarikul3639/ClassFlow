"use client";

import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { IEvent } from "@/types/event";
interface ScheduleSectionProps {
  form: IEvent;
  setForm: React.Dispatch<React.SetStateAction<IEvent>>;
}

export const ScheduleSection = ({ form, setForm }: ScheduleSectionProps) => {
  const startTime = form.startAt ? form.startAt.split("T")[1] : "";
  const endTime = form.endAt ? form.endAt.split("T")[1] : "";
  return (
    <section className="space-y-3 sm:space-y-5 lg:space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-lg bg-[#399aef]/10 flex items-center justify-center text-[#399aef]">
          <CalendarIcon size={16} className="lg:w-5 lg:h-5" />
        </div>
        <h3 className="text-xsm sm:text-sm lg:text-base font-black text-[#111518] uppercase tracking-wider">
          Schedule
        </h3>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-10">
        {/* Mock Calendar */}
        <div className="w-full lg:w-80 bg-[#f8fafc] border border-[#dbe1e6] rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6">
          <div className="flex items-center justify-between mb-4 lg:mb-6 px-1">
            <button className="p-1 hover:bg-white rounded-lg transition-colors">
              <ChevronLeft size={16} className="lg:w-5 lg:h-5" />
            </button>
            <span className="text-xxxs sm:text-xxs lg:text-xs font-black uppercase tracking-widest text-[#111518]">
              Oct 2023
            </span>
            <button className="p-1 hover:bg-white rounded-lg transition-colors">
              <ChevronRight size={16} className="lg:w-5 lg:h-5" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 lg:gap-1.5 text-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span
                key={`${d}-${i}`}
                className="text-xxxxs sm:text-xxxxs lg:text-xxxs font-black text-[#617789] pb-2"
              >
                {d}
              </span>
            ))}
            {Array.from({ length: 31 }).map((_, i) => (
              <div
                key={i}
                className={`h-7 sm:h-8 lg:h-9 flex items-center justify-center text-xxsm sm:text-xsm lg:text-sm font-bold rounded-lg cursor-pointer transition-all ${
                  i === 4
                    ? "bg-[#399aef] text-white shadow-lg shadow-[#399aef]/20"
                    : "hover:bg-white text-[#111518]"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Time Inputs */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-2">
            <div className="space-y-2">
              <label className="text-xxxs md:text-xxs lg:text-xs font-black text-[#617789] uppercase tracking-widest">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) =>
                  setForm({
                    ...form,
                    startAt: `${form.date}T${e.target.value}`,
                  })
                }
                className="w-full h-11 sm:h-12 lg:h-14 px-4 lg:px-6 rounded-lg lg:rounded-xl border border-[#dbe1e6] bg-[#f8fafc] font-bold outline-none focus:border-[#399aef] transition-colors text-xxsm md:text-xsm lg:text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xxxs md:text-xxs lg:text-xs font-black text-[#617789] uppercase tracking-widest">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) =>
                  setForm({ ...form, endAt: `${form.date}T${e.target.value}` })
                }
                className="w-full h-11 sm:h-12 lg:h-14 px-4 lg:px-6 rounded-lg lg:rounded-xl border border-[#dbe1e6] bg-[#f8fafc] font-bold outline-none focus:border-[#399aef] transition-colors text-xxsm md:text-xsm lg:text-sm"
              />
            </div>
          </div>

          {/* Topics Section */}
          <div className="space-y-3 lg:space-y-4">
            <label className="text-xxxs md:text-xxs lg:text-xs font-black text-[#617789] uppercase tracking-widest">
              Topics
            </label>

            {/* Main Container: Overflows handled with flex-wrap */}
            <div className="w-full flex flex-wrap items-center gap-2 p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-[#f8fafc] border border-[#dbe1e6] min-h-14 focus-within:border-[#399aef] focus-within:ring-1 focus-within:ring-[#399aef]/10 transition-all">
              {/* Topic Chips */}
              {form.topics?.map((topic: string, i: number) => (
                <div
                  key={i}
                  className="group flex items-center max-w-full bg-white border border-[#dbe1e6] rounded-lg px-2.5 py-1.5 shadow-sm hover:border-[#399aef]/30 transition-all"
                >
                  {/* Text Area: break-all mobile-e boro text ke niche pathabe */}
                  <span className="text-[11px] sm:text-xxxs lg:text-xxs font-bold text-[#111518] uppercase tracking-tight break-all leading-tight">
                    {topic}
                  </span>

                  {/* Delete Icon */}
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        topics: form.topics?.filter(
                          (_: string, idx: number) => idx !== i,
                        ),
                      })
                    }
                    className="ml-2 p-0.5 rounded-md text-[#617789] hover:bg-red-50 hover:text-red-500 transition-colors shrink-0"
                  >
                    <X size={12} strokeWidth={3} />
                  </button>
                </div>
              ))}

              {/* Inline Input Field */}
              <input
                type="text"
                placeholder={"Add topics..."}
                className="flex-1 min-w-30 bg-transparent border-none outline-none text-xxsm font-semibold py-1 placeholder:text-[#94a3b8] focus:ring-0"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (e.shiftKey) {
                      // Shift+Enter → newline, allow default behavior
                      return;
                    }
                    // Enter without shift → add topic
                    e.preventDefault();
                    const val = e.currentTarget.value.trim();
                    if (val && !form.topics?.includes(val)) {
                      setForm({
                        ...form,
                        topics: [...(form.topics || []), val],
                      });
                    }
                    e.currentTarget.value = "";
                  }
                }}
              />
            </div>

            <p className="text-xxs text-[#94a3b8] font-medium italic">
              Press Enter to add a new topic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
