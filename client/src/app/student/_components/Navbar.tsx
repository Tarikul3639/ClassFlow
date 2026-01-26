"use client";
import React, { useEffect, useState } from "react";
import { CloudSun, Bell } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Dialog } from "@/components/ui/Dialog";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [weather, setWeather] = useState<{ temp: number; desc: string } | null>(
    null
  );

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Dhaka&appid=YOUR_API_KEY&units=metric"
    )
      .then((res) => res.json())
      .then((data) => {
        // setWeather({ temp: data.main.temp, desc: data.weather[0].description });
      });
  }, []);

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[85%] md:w-[75%] lg:w-[60%] max-w-5xl">
        <div className="bg-white/70 backdrop-blur-md border border-blue-100 px-4 md:px-6 py-2.5 md:py-3 rounded-full shadow-lg shadow-[#399aef]/5 flex justify-between items-center">
          {/* Logo */}
          <Logo />

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Weather */}
            <div className="flex items-center gap-2 text-xxs md:text-xxsm font-black text-[#617789] bg-blue-50/50 px-2.5 py-1.5 md:px-3 rounded-full border border-blue-100/50 min-w-0 shrink">
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

            {/* Bell */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-xl hover:bg-gray-100 relative transition-colors text-[#617789] group"
            >
              <Bell
                size={18}
                className="md:w-5 md:h-5 group-hover:rotate-12 transition-transform"
              />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Avatar */}
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
