import { GraduationCap } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2 md:gap-2.5 shrink-0 hover:scale-105 transition-transform duration-300"
    >
      {/* Icon with Gradient Background */}
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-linear-to-br from-[#399aef] to-[#2b8ad8] rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
        
        {/* Icon Container */}
        <div className="relative bg-linear-to-br from-[#399aef] to-[#2b8ad8] p-1.5 rounded-lg text-white shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300">
          <GraduationCap size={22} className="group-hover:rotate-6 transition-transform duration-300" />
        </div>
      </div>

      {/* Modern Text Design */}
      <div className="flex items-center">
        <span className="text-base md:text-lg font-black tracking-tight bg-linear-to-r from-[#111518] via-[#399aef] to-[#111518] bg-clip-text text-transparent bg-size-[200%_100%] group-hover:bg-size-[100%_100%] animate-gradient transition-all duration-500">
          Class
        </span>
        <span className="text-base md:text-lg font-black tracking-tight text-[#399aef] group-hover:text-[#2b8ad8] transition-colors duration-300">
          Flow
        </span>
      </div>
    </Link>
  );
};