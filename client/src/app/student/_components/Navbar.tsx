"use client";
import React, { useEffect, useState } from "react";
import { CloudSun, Bell, LayoutDashboard } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Dialog } from "@/components/ui/Dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [weather, setWeather] = useState<{ temp: number; desc: string } | null>(
    null,
  );

  useEffect(() => {
    // Demo data for weather since real API needs a key
    setWeather({ temp: 22, desc: "Mostly Sunny" });
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[85%] md:w-[75%] lg:w-[60%] max-w-5xl font-display">
        <div className="bg-white/70 backdrop-blur-md border border-blue-100 px-4 md:px-6 py-2.5 md:py-3 rounded-full shadow-lg shadow-[#399aef]/5 flex justify-between items-center text-[#111518]">
          {/* Logo Section */}
          <Logo />

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Dashboard Link - Optimized Glass Pill Style */}
            <Link
              href="/student"
              className={`
    flex items-center gap-2.5 px-4 py-2 rounded-full transition-all duration-500 group relative
    ${
      isActive("/student")
        ? "bg-linear-to-r from-[#399aef]/10 to-[#399aef]/5 text-[#399aef] shadow-[inset_0_0_0_1px_rgba(57,154,239,0.1)]"
        : "text-[#617789] hover:bg-linear-to-r hover:from-[#399aef]/10 hover:to-[#399aef]/5 hover:text-[#399aef] hover:shadow-[inset_0_0_0_1px_rgba(57,154,239,0.1)]"
    }
  `}
            >
              <LayoutDashboard
                size={17}
                strokeWidth={isActive("/student") ? 2.5 : 2}
                className={
                  isActive("/student")
                    ? "animate-pulse-subtle"
                    : "opacity-70 group-hover:opacity-100"
                }
              />

              <span
                className={`
    hidden sm:flex text-xxs font-black uppercase tracking-[0.12em] transition-opacity
    ${isActive("/student") ? "opacity-100" : "opacity-70 group-hover:opacity-100"}
  `}
              >
                Dashboard
              </span>

              {/* Active state indicator line */}
              {isActive("/admin") && (
                <span className="absolute inset-x-4 -bottom-px h-px bg-linear-to-r from-transparent via-[#399aef]/40 to-transparent" />
              )}
            </Link>

            {/* Weather Section */}
            <div className="hidden xs:flex items-center gap-2 text-xxs md:text-[11px] font-black text-[#617789] bg-blue-50/50 px-2.5 py-1.5 md:px-3 rounded-full border border-blue-100/50 min-w-0 shrink">
              <CloudSun size={14} className="text-[#399aef] shrink-0" />
              <span className="truncate">
                <span className="inline md:hidden">
                  {weather?.temp || "18"}°C
                </span>
                <span className="hidden md:inline">
                  {weather?.desc || "Clear"}, {weather?.temp || "18"}°C
                </span>
              </span>
            </div>

            <div className="h-6 w-px bg-[#dbe1e6] hidden md:block"></div>

            {/* Notification Bell */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-xl hover:bg-gray-100 relative transition-colors text-[#617789] group"
            >
              <Bell
                size={18}
                className="md:w-5 md:h-5 group-hover:rotate-12 transition-transform"
              />
              <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Profile Avatar Link */}
            <Link
              href="/student/profile"
              className={`relative w-8 h-8 md:w-9 md:h-9 rounded-full transition-all shrink-0 border-2 ${
                isActive("/student/profile")
                  ? "ring-2 ring-[#399aef] ring-offset-2 border-[#399aef] scale-105"
                  : "border-[#dbe1e6] hover:border-[#399aef] hover:scale-105"
              }`}
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Dialog should be outside nav */}
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        title="Notifications"
        variant="info"
        description="Currently, ClassFlow runs on Version 1.0. Version 3.0, Inshallah, will bring real-time Notifications for a more interactive experience."
      />
    </>
  );
};

export default Navbar;
