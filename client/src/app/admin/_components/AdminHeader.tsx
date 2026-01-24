// _components/AdminHeader.tsx
import { Plus } from "lucide-react";

export const AdminHeader = ({ count }: { count: number }) => (
  <header className="flex flex-row items-center justify-between gap-4">
    <div className="space-y-1">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
        Event Management
      </h1>
      <div className="flex items-center gap-2 text-[#399aef] font-bold text-[11px] sm:text-sm uppercase tracking-wider">
        <span className="flex w-1.5 h-1.5 rounded-full bg-[#399aef] animate-pulse" />
        <p>{count} total activities</p>
      </div>
    </div>
    <button className="flex h-11 w-11 sm:h-12 sm:w-auto sm:px-5 items-center justify-center gap-2 rounded-2xl bg-[#399aef] text-white hover:bg-[#2d84d1] transition-all shadow-lg shadow-blue-100 active:scale-95 shrink-0">
      <Plus size={20} strokeWidth={3} />
      <span className="hidden sm:inline font-black text-xs uppercase tracking-widest">Add Event</span>
    </button>
  </header>
);