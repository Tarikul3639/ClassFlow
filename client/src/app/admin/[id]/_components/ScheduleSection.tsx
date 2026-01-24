import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
interface ScheduleSectionProps {
  topics: string[];
  setTopics: (topics: string[]) => void;
}

export const ScheduleSection = ({ topics, setTopics }: ScheduleSectionProps) => (
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
            <span key={`${d}-${i}`} className="text-xxxxs sm:text-xxxxs lg:text-xxxs font-black text-[#617789] pb-2">
              {d}
            </span>
          ))}
          {Array.from({ length: 31 }).map((_, i) => (
            <div
              key={i}
              className={`h-7 sm:h-8 lg:h-9 flex items-center justify-center text-xxsm sm:text-xsm lg:text-sm font-bold rounded-lg cursor-pointer transition-all ${
                i === 4 ? "bg-[#399aef] text-white shadow-lg shadow-[#399aef]/20" : "hover:bg-white text-[#111518]"
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
              className="w-full h-11 sm:h-12 lg:h-14 px-4 lg:px-6 rounded-lg lg:rounded-xl border border-[#dbe1e6] bg-[#f8fafc] font-bold outline-none focus:border-[#399aef] transition-colors text-xxsm md:text-xsm lg:text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xxxs md:text-xxs lg:text-xs font-black text-[#617789] uppercase tracking-widest">
              End Time
            </label>
            <input
              type="time"
              className="w-full h-11 sm:h-12 lg:h-14 px-4 lg:px-6 rounded-lg lg:rounded-xl border border-[#dbe1e6] bg-[#f8fafc] font-bold outline-none focus:border-[#399aef] transition-colors text-xxsm md:text-xsm lg:text-sm"
            />
          </div>
        </div>

        {/* Topics Section */}
        <div className="space-y-3 lg:space-y-4">
          <label className="text-xxxs md:text-xxs lg:text-xs font-black text-[#617789] uppercase tracking-widest">
            Topics
          </label>
          <div className="flex flex-wrap gap-2 lg:gap-3 p-2 sm:p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-[#f8fafc] border border-[#dbe1e6]">
            {topics.map((topic: string, i: number) => (
              <span
                key={i}
                className="flex items-center gap-1.5 lg:gap-2 pl-2.5 pr-1.5 py-1 lg:py-1.5 rounded-md lg:rounded-lg bg-white border border-[#dbe1e6] text-xxxs sm:text-xxxs lg:text-xxs font-black uppercase text-[#399aef] tracking-widest shadow-sm"
              >
                {topic}
                <X
                  size={10}
                  className="cursor-pointer text-[#617789] hover:text-red-500 transition-colors lg:w-3.5 lg:h-3.5"
                  onClick={() => setTopics(topics.filter((_: any, idx: number) => idx !== i))}
                />
              </span>
            ))}
            <input
              type="text"
              placeholder="Add topic..."
              className="bg-transparent border-none outline-none text-xxsm sm:text-xsm lg:text-sm font-bold px-2 py-1 min-w-30 placeholder:font-medium placeholder:text-[#94a3b8]"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);