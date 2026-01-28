"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { IEvent } from "@/types/event";
import { Calendar } from "@/components/ui/calendar";
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
        <Calendar
          mode="single"
          selected={form.date ? new Date(form.date + "T00:00:00") : undefined}
          onSelect={(date) => {
            if (!date) return;

            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const dd = String(date.getDate()).padStart(2, "0");

            setForm({
              ...form,
              date: `${yyyy}-${mm}-${dd}`,
            });
          }}
          className="w-full lg:w-80 bg-[#f8fafc] border border-[#dbe1e6] rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6"
          classNames={{
            today: "bg-[#8f9499] rounded-md text-white",
            outside: "text-muted-foreground opacity-40",
            disabled: "opacity-50 cursor-not-allowed",
          }}
        />

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
                className="w-full h-11 sm:h-12 px-4 lg:px-6 rounded-lg border border-[#dbe1e6] bg-[#f8fafc] font-semibold outline-none focus:border-[#399aef] transition-colors text-xxsm md:text-xsm lg:text-sm"
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
                className="w-full h-11 sm:h-12 px-4 lg:px-6 rounded-lg border border-[#dbe1e6] bg-[#f8fafc] font-semibold outline-none focus:border-[#399aef] transition-colors text-xxsm md:text-xsm lg:text-sm"
              />
            </div>
          </div>

          {/* Topics Section */}
          <div className="space-y-3 lg:space-y-4">
            <label className="text-xxxs md:text-xxs lg:text-xs font-black text-[#617789] uppercase tracking-widest">
              Topics
            </label>

            <textarea
              value={form.topics}
              onChange={(e) => setForm({ ...form, topics: e.target.value })}
              className="form-textarea flex w-full rounded-lg text-[#111518] border border-[#dbe1e6] bg-white min-h-40 p-4 text-base font-normal focus:ring-2 focus:ring-primary/20 focus:outline-primary/50 resize-none"
              placeholder="Enter detailed topics or instructions for students here..."
            />
          </div>
        </div>
      </div>
    </section>
  );
};
