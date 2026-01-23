import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, ChevronUp, ChevronRight, BookOpen, CheckCircle2, Folder, FileText, Check } from "lucide-react";

interface EventProps {
  event: any;
  isExpanded: boolean;
  onToggle: () => void;
}

const EventCard: React.FC<EventProps> = ({ event, isExpanded, onToggle }) => {
  return (
    <article 
      className="bg-white rounded-2xl shadow-sm border border-[#dbe1e6] overflow-hidden transition-all duration-300"
      style={{ borderLeftWidth: '5px', borderLeftColor: event.color }}
    >
      <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-5 relative">
        <div className="absolute top-4 right-4">
          <span 
            className="text-xxs font-black uppercase tracking-widest px-2.5 py-1 rounded-lg"
            style={{ backgroundColor: `${event.color}15`, color: event.color }}
          >
            {event.deadline}
          </span>
        </div>

        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${event.color}10`, color: event.color }}
        >
          {event.icon}
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-bold leading-tight">{event.title}</h2>
          <div className="flex items-center gap-3 mt-1.5 text-[13px] font-medium text-[#617789]">
            <span className="flex items-center gap-1.5"><Clock size={14} /> {event.time}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="flex items-center gap-1.5"><MapPin size={14} /> {event.location}</span>
          </div>
        </div>

        <button 
          onClick={onToggle}
          className="sm:self-center px-4 py-2 rounded-xl bg-[#F0F2F4] hover:bg-[#e5e7eb] text-[#111518] text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          {isExpanded ? 'Close' : 'Details'}
          {isExpanded ? <ChevronUp size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && event.topics && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-6"
          >
            <div className="bg-blue-50/50 rounded-xl p-5 border border-[#dbe1e6] grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-[11px] font-black text-[#617789] uppercase tracking-widest flex items-center gap-2">
                  <BookOpen size={14} /> Topics Covered
                </h3>
                <ul className="space-y-2.5">
                  {event.topics.map((t: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-bold text-[#445668]">
                      <CheckCircle2 size={16} className="text-[#399aef] mt-0.5 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-[11px] font-black text-[#617789] uppercase tracking-widest flex items-center gap-2">
                  <Folder size={14} /> Materials
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button className="flex items-center gap-2 px-3 py-2 bg-white border border-[#dbe1e6] rounded-xl text-xs font-bold hover:border-[#399aef] hover:text-[#399aef] transition-all group">
                    <FileText size={14} className="text-red-500 group-hover:scale-110 transition-transform" /> PDF Slides
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-white border border-[#dbe1e6] rounded-xl text-xs font-bold hover:border-[#399aef] hover:text-[#399aef] transition-all group">
                    <FileText size={14} className="text-blue-500 group-hover:scale-110 transition-transform" /> Lecture Notes
                  </button>
                </div>
              </div>
              <div className="md:col-span-2 pt-4 border-t border-[#dbe1e6] flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-5 h-5 border-2 border-[#dbe1e6] rounded-lg peer-checked:bg-green-500 peer-checked:border-green-500 transition-all"></div>
                    <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={4} />
                  </div>
                  <span className="text-sm font-bold text-[#617789] group-hover:text-[#111518]">Mark as Prepared</span>
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