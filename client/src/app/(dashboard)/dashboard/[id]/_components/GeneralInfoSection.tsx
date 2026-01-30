"use client";

import { IEvent, EventType } from "@/redux/slices/classroom/types";
import { PlusCircle, CheckCircle2, Circle } from "lucide-react";

export const GeneralInfoSection = ({ form, setForm }: { form: IEvent; setForm: React.Dispatch<React.SetStateAction<IEvent>> }) => (
  <section className="space-y-3 sm:space-y-5 lg:space-y-6">
    {/* Section Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-lg bg-[#399aef]/10 flex items-center justify-center text-[#399aef]">
          <PlusCircle size={16} className="lg:w-5 lg:h-5" />
        </div>
        <h3 className="text-xsm sm:text-sm lg:text-base font-black text-[#111518] uppercase tracking-wider">
          General Info
        </h3>
      </div>

      {/* isCompleted Toggle Badge */}
      <button
        type="button"
        onClick={() => setForm({ ...form, isCompleted: !form.isCompleted })}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
          form.isCompleted 
            ? "bg-blue-50 border-blue-200 text-blue-500" 
            : "bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300"
        }`}
      >
        {form.isCompleted ? (
          <CheckCircle2 size={14} className="fill-blue-500 text-white" />
        ) : (
          <Circle size={14} />
        )}
        <span className="text-xxs lg:text-xxs font-black uppercase tracking-widest">
          {form.isCompleted ? "Completed" : "Mark as Done"}
        </span>
      </button>
    </div>

    {/* Form Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 lg:gap-6">
      {/* Event Title */}
      <div className="md:col-span-2 space-y-2">
        <label className="text-xxxs md:text-xxs lg:text-xs font-black text-[#617789] uppercase tracking-widest">
          Event Title
        </label>
        <input
          type="text"
          value={form.title ?? ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full h-11 sm:h-12 px-5 lg:px-6 rounded-lg border border-[#dbe1e6] bg-[#f8fafc] focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-bold text-[#111518] text-xxsm md:text-xsm lg:text-sm"
          placeholder="e.g. Mid-term Assessment Preparation"
        />
      </div>

      {/* Event Type */}
      <div className="space-y-2">
        <label className="text-xxxs md:text-xxs lg:text-xs font-black text-[#617789] uppercase tracking-widest">
          Event Type
        </label>
        <div className="relative group">
          <select
            value={form.type ?? "lecture"}
            onChange={(e) => setForm({ ...form, type: e.target.value as EventType })}
            className="w-full h-11 sm:h-12 px-5 lg:px-6 rounded-lg border border-[#dbe1e6] bg-[#f8fafc] focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-bold text-[#111518] appearance-none text-xxsm md:text-xsm lg:text-sm cursor-pointer">
            <option value="lecture">Lecture</option>
            <option value="quiz">Quiz</option>
            <option value="class">Class</option>
            <option value="assignment">Assignment</option>
            <option value="ct">Class Test</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#617789] group-hover:text-[#399aef] transition-colors">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="lg:w-3 lg:h-2">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-xxxs md:text-xxs lg:text-xs font-black text-[#617789] uppercase tracking-widest">
          Location
        </label>
        <input
          type="text"
          value={form.location ?? ""}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full h-11 sm:h-12 px-5 lg:px-6 rounded-lg border border-[#dbe1e6] bg-[#f8fafc] focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-bold text-[#111518] text-xxsm md:text-xsm lg:text-sm"
          placeholder="Room or URL"
        />
      </div>
    </div>
  </section>
);