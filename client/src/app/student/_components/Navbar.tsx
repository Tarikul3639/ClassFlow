"use client";
import React from "react";
import { GraduationCap, CloudSun, Bell } from "lucide-react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[85%] md:w-[75%] lg:w-[60%] max-w-5xl">
      <div className="bg-white/70 backdrop-blur-md border border-blue-100 px-4 md:px-6 py-2.5 md:py-3 rounded-full shadow-lg shadow-[#399aef]/5 flex justify-between items-center">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-2 md:gap-2.5 text-[#399aef] shrink-0"
        >
          <div className="bg-[#399aef] p-1.5 rounded-lg text-white">
            <GraduationCap size={18} className="md:w-5 md:h-5" />
          </div>
          <span className="text-base md:text-lg font-black tracking-tight text-[#111518]">
            ClassFlow
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Weather Section - Optimized for Mobile & Desktop */}
          <div className="flex items-center gap-2 text-xxs md:text-[12px] font-black text-[#617789] bg-blue-50/50 px-2.5 py-1.5 md:px-3 rounded-full border border-blue-100/50 min-w-0 shrink">
            <CloudSun size={14} className="text-[#399aef] shrink-0" />
            <span className="truncate">
              <span className="inline md:hidden">18°C</span> {/* Mobile View */}
              <span className="hidden md:inline">Partly Cloudy, 18°C</span>{" "}
              {/* Desktop View */}
            </span>
          </div>

          {/* Divider - Hidden on mobile */}
          <div className="h-6 w-px bg-[#dbe1e6] hidden md:block"></div>

          {/* Notification Bell */}
          <button className="p-2 rounded-xl hover:bg-gray-100 relative transition-colors text-[#617789] group">
            <Bell
              size={18}
              className="md:w-5 md:h-5 group-hover:rotate-12 transition-transform"
            />
            {/* Notification Dot */}
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Profile Avatar */}
          <Link
            href="/student/profile"
            className="w-8 h-8 md:w-9 md:h-9 rounded-full ring-2 ring-[#399aef]/10 overflow-hidden cursor-pointer border border-[#dbe1e6] hover:ring-[#399aef]/30 transition-all shrink-0"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
