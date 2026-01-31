"use client";

import React, { useEffect, useState } from "react";
import { CloudSun, Bell, LayoutDashboard, User } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog } from "@/components/ui/Dialog";
import NavbarSkeleton from "./NavbarSkeleton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectProfileUser } from "@/redux/selectors/profile";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useAppSelector(selectProfileUser);
  const loading = useAppSelector(
    (state) => state.auth.requestStatus.refresh.loading,
  );

  const pathname = usePathname();

  const [weather, setWeather] = useState<{
    temp: number;
    desc: string;
  } | null>(null);

  let dashboard = "";
  if (user && user.classrooms.length === 0) {
    dashboard = "/classroom";
  }
  if (user && user.classrooms.length === 1) {
    dashboard = `/classroom/${user.classrooms[0]}`;
  }

  useEffect(() => {
    // Demo data for weather since real API needs a key
    setWeather({ temp: 22, desc: "Mostly Sunny" });
  }, []);

  const isActive = (path: string) => pathname === path;

  // Show skeleton while loading
  if (loading) {
    return <NavbarSkeleton />;
  }

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[85%] md:w-[75%] lg:w-[60%] max-w-5xl font-display">
        <div className="bg-white/70 backdrop-blur-md border border-blue-100 px-4 md:px-6 py-2.5 md:py-3 rounded-full shadow-lg shadow-[#399aef]/5 flex justify-between items-center text-[#111518]">
          {/* Logo Section */}
          <Logo />

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Dashboard Link */}
            <Link
              href={dashboard}
              className={`
                flex items-center gap-2.5 px-4 py-2 rounded-full transition-all duration-500 group relative
                ${
                  isActive(dashboard)
                    ? "bg-linear-to-r from-[#399aef]/10 to-[#399aef]/5 text-[#399aef] shadow-[inset_0_0_0_1px_rgba(57,154,239,0.1)]"
                    : "text-[#617789] hover:bg-linear-to-r hover:from-[#399aef]/10 hover:to-[#399aef]/5 hover:text-[#399aef] hover:shadow-[inset_0_0_0_1px_rgba(57,154,239,0.1)]"
                }
              `}
            >
              <LayoutDashboard
                size={17}
                strokeWidth={isActive(dashboard) ? 2.5 : 2}
                className={
                  isActive(dashboard)
                    ? "animate-pulse-subtle"
                    : "opacity-70 group-hover:opacity-100"
                }
              />

              <span
                className={`
                  hidden sm:flex text-xxs font-black uppercase tracking-[0.12em] transition-opacity
                  ${
                    isActive(dashboard)
                      ? "opacity-100"
                      : "opacity-70 group-hover:opacity-100"
                  }
                `}
              >
                Dashboard
              </span>

              {/* Active state indicator line */}
              {isActive(dashboard) && (
                <span className="absolute inset-x-4 -bottom-px h-px bg-linear-to-r from-transparent via-[#399aef]/40 to-transparent" />
              )}
            </Link>

            {/* Weather Section */}
            <div className="hidden xs:flex items-center gap-2 text-xxs md:text-[11px] font-black text-[#617789] bg-blue-50/50 px-2.5 py-1.5 md:px-3 rounded-full border border-blue-100/50 min-w-0 shrink">
              <CloudSun size={14} className="text-[#399aef] shrink-0" />
              <span className="truncate">
                <span className="inline lg:hidden">
                  {weather?.temp || "18"}°C
                </span>
                <span className="hidden lg:inline">
                  {weather?.desc || "Clear"}, {weather?.temp || "18"}°C
                </span>
              </span>
            </div>

            <div className="h-6 w-px bg-[#dbe1e6] hidden md:block" />

            {/* Notification Bell */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-xl hover:bg-gray-100 relative transition-colors text-[#617789] group"
            >
              <Bell
                size={18}
                className="md:w-5 md:h-5 group-hover:rotate-12 transition-transform"
              />
              <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>

            {/* Profile Avatar Link */}
            <Link
              href="/classroom/profile"
              className={`group relative w-8 h-8 rounded-full shrink-0
                transition-all duration-300 ease-in-out flex items-center justify-center
                ${
                  isActive("/classroom/profile")
                    ? "ring-2 ring-[#399aef] ring-offset-2 scale-110 shadow-lg shadow-blue-100"
                    : "ring-1 ring-slate-200 hover:ring-[#399aef]/50 hover:ring-offset-2 hover:scale-105"
                }
              `}
            >
              {/* Modern Glow Effect */}
              <span
                className={`absolute inset-0 rounded-full blur-lg transition-opacity duration-500
                  ${
                    isActive("/classroom/profile")
                      ? "opacity-40 bg-[#399aef]"
                      : "opacity-0 group-hover:opacity-20 bg-blue-400"
                  }
                `}
              />

              <Avatar className="relative w-full h-full rounded-full border border-white/50 bg-slate-50 overflow-hidden shadow-inner">
                <AvatarImage
                  src={user?.avatarUrl}
                  alt={user?.name || "User"}
                  className="object-cover w-full h-full"
                />

                {/* High-Contrast Fallback */}
                <AvatarFallback
                  className="
                    w-full h-full
                    bg-linear-to-br from-[#399aef] to-[#2d84d1]
                    text-white font-black
                    text-xsm! md:text-[14px]
                    flex items-center justify-center
                    tracking-tighter select-none
                  "
                >
                  {user?.name ? user.name.substring(0, 2).toUpperCase() : ""}
                </AvatarFallback>
              </Avatar>

              {/* Active Indicator Dot */}
              {isActive("/classroom/profile") && (
                <span className="absolute -top-1 -right-1 w-2.5 md:w-3 h-2.5 md:h-3 bg-[#399aef] border-2 border-white rounded-full z-10" />
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Dialog */}
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
