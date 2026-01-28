// _components/AdminFooter.tsx
import React from "react";
import { ArrowLeftRight, User } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { setViewMode } from "@/redux/slices/auth/slice";

export const AdminFooter: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleChangeViewMode = (mode: "admin" | "student") => {
    // Dispatch action to change view mode
    dispatch(setViewMode(mode));
  };
  return (
    <footer className="py-8 border-t border-[#dbe1e6]/60 flex flex-col sm:flex-row gap-6 items-center justify-between">
      {/* Developer Branding Section */}
      <div className="flex flex-col items-center sm:items-start gap-1.5">
        <div className="flex items-center gap-2.5">
          {/* Logo with Initial T */}
          <div className="w-7 h-7 rounded-md bg-[#399aef] flex items-center justify-center text-white shadow-lg shadow-blue-100 ring-2 ring-white transition-transform hover:scale-110">
            <span className="text-xs font-black">T</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xxxs font-black text-[#399aef] uppercase tracking-widest leading-none mb-0.5">
              Lead Developer
            </span>
            <span className="text-xxs font-black text-[#111518] uppercase tracking-[0.2em]">
              Tarikul Islam
            </span>
          </div>
        </div>
        <p className="text-xxxs font-bold text-[#617789] uppercase tracking-widest opacity-50 mt-1">
          Admin Control Center • 2026
        </p>
      </div>

      {/* Modern Switcher Button */}
      <button
        onClick={() => handleChangeViewMode("student")}
        className="relative group"
      >
        <div className="flex items-center gap-3 pl-2 pr-5 py-2 rounded-2xl bg-white/50 border border-[#efe9e9] group-hover:border-[#399aef] transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:shadow-[0_8px_20px_rgba(57,154,239,0.1)] group-active:scale-95 overflow-hidden">
          {/* Avatar Icon */}
          <div className="w-8 h-8 rounded-lg bg-[#f8fafc] group-hover:bg-[#399aef] flex items-center justify-center text-[#617789] group-hover:text-white transition-all duration-500 group-hover:rotate-12">
            <User size={16} strokeWidth={2.5} />
          </div>

          <div className="flex flex-col">
            <span className="text-xxxs font-black text-[#399aef] uppercase tracking-tighter leading-none">
              Switch Mode
            </span>
            <span className="text-xs font-bold text-[#617789] uppercase tracking-widest mt-1 group-hover:text-[#111518] transition-colors">
              Student View
            </span>
          </div>

          {/* Floating Arrow Icon */}
          <div className="ml-3 transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">
            <ArrowLeftRight
              size={14}
              className="text-[#cbd5e1] group-hover:text-[#399aef]"
            />
          </div>
        </div>

        {/* Outer Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-[#399aef] opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none" />
      </button>
    </footer>
  );
};
