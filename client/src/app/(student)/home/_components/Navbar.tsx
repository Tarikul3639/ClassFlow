import React from "react";
import { GraduationCap, CloudSun, Bell } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[60%] max-w-4xl">
      <div className="bg-white/80 backdrop-blur-md border border-[#dbe1e6] px-6 py-3 rounded-full shadow-lg shadow-[#399aef]/5 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2.5 text-[#399aef]">
          <div className="bg-[#399aef] p-1.5 rounded-lg text-white">
            <GraduationCap size={20} />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#111518]">
            ClassFlow
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-5">
          <div className="hidden sm:flex items-center gap-2 text-[12px] font-bold text-[#617789] bg-blue-50/50 px-3 py-1.5 rounded-full border border-blue-100">
            <CloudSun size={16} className="text-[#399aef]" />
            <span>Partly Cloudy, 18°C</span>
          </div>

          <div className="h-8 w-px bg-[#dbe1e6] hidden sm:block"></div>

          <button className="p-2 rounded-xl hover:bg-gray-100 relative transition-colors text-[#617789] group">
            <Bell
              size={20}
              className="group-hover:rotate-12 transition-transform"
            />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <Link href="/profile" className="w-9 h-9 rounded-full ring-2 ring-[#399aef]/10 overflow-hidden cursor-pointer border border-[#dbe1e6] hover:ring-[#399aef]/30 transition-all">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="avatar"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
