"use client";

import React, { useEffect, useState } from "react";
import { CloudSun, LayoutDashboard } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationBell } from "@/components/Notifications/NotificationBell";
import NavbarSkeleton from "./NavbarSkeleton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectProfileUser } from "@/redux/selectors/profile";

const Navbar: React.FC = () => {
  const user = useAppSelector(selectProfileUser);
  const loading = useAppSelector(
    (state) =>
      state.auth.requestStatus.refresh.loading ||
      state.auth.requestStatus.signIn.loading,
  );

  const pathname = usePathname();

  const [weather, _] = useState<{
    temp: number;
    desc: string;
  } | null>(null);

  let dashboard = "/classroom";
  if (user && user.classrooms.length === 0) {
    dashboard = "/classroom";
  }
  if (user && user.classrooms.length === 1) {
    dashboard = `/classroom/${user.classrooms[0]}`;
  }

  useEffect(() => {
    // Demo data for weather since real API needs a key
    // setWeather({ temp: 22, desc: "Mostly Sunny" });
  }, []);

  const isActive = (path: string) => pathname === path;

  // Show skeleton while loading
  if (loading) {
    return <NavbarSkeleton />;
  }

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[85%] md:w-[75%] lg:w-[60%] max-w-5xl font-display">
        {/* Modern Glass Container with Gradient Border */}
        <div className="relative group">
          {/* Gradient Border Effect */}
          <div className="absolute -inset-px bg-linear-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-full blur-sm group-hover:blur-md transition-all duration-500" />

          {/* Main Navbar */}
          <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 px-4 md:px-6 py-2.5 md:py-3 rounded-full shadow-[0_8px_32px_rgba(57,154,239,0.12)] hover:shadow-[0_12px_48px_rgba(57,154,239,0.18)] transition-all duration-500 flex justify-between items-center text-[#111518]">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 rounded-full opacity-[0.02] bg-[radial-gradient(circle_at_50%_50%,rgba(57,154,239,0.4),transparent_50%)]" />

            {/* Logo Section */}
            <div className="relative z-10">
              <Logo />
            </div>

            {/* Right Actions */}
            <div className="relative z-10 flex items-center gap-2 md:gap-4">
              {/* Dashboard Link - Modern Pill Design */}
              <Link
                href={dashboard}
                className={`
                  group/dash relative flex items-center gap-3 px-4 py-2 rounded-xl
                  transition-all duration-500 ease-out overflow-hidden
                  ${
                    isActive(dashboard)
                      ? "bg-linear-to-r from-[#399aef] to-[#2b8ad8] text-white font-semibold shadow-sm shadow-blue-500/30"
                      : "text-[#617789] hover:bg-linear-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-[#399aef]"
                  }
                `}
              >
                {/* Animated Background Shine */}
                {!isActive(dashboard) && (
                  <span className="absolute inset-0 -translate-x-full group-hover/dash:translate-x-full transition-transform duration-1000 ease-out bg-linear-to-r from-transparent via-white/20 to-transparent" />
                )}

                {/* Icon with Micro Animation */}
                <LayoutDashboard
                  strokeWidth={isActive(dashboard) ? 2.5 : 2}
                  className={`
                    transition-all duration-300 size-4
                    ${
                      isActive(dashboard)
                        ? "text-white scale-105"
                        : "text-[#617789] group-hover/dash:text-[#399aef] group-hover/dash:scale-110 group-hover/dash:rotate-3"
                    }
                  `}
                />

                {/* Text with Smooth Transition */}
                <span
                  className={`
                    hidden sm:inline text-xs font-medium tracking-wide
                    transition-all duration-300
                    ${isActive(dashboard) ? "opacity-100" : "opacity-70 group-hover/dash:opacity-100"}
                  `}
                >
                  Dashboard
                </span>

                {/* Modern Active Indicator - Dot */}
                {isActive(dashboard) && (
                  <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white  rounded-full shadow-lg animate-pulse" />
                )}
              </Link>

              {/* Weather Section - Frosted Glass Card */}
              <div className="hidden xs:flex items-center gap-2 text-xxs md:text-[11px] font-black text-[#617789] bg-linear-to-br from-blue-50/80 to-cyan-50/80 backdrop-blur-sm px-2.5 py-1.5 md:px-3 rounded-full border border-blue-200/30 shadow-inner min-w-0 shrink hover:shadow-md hover:scale-[1.02] transition-all duration-300">
                <CloudSun
                  size={14}
                  className="text-[#399aef] shrink-0 animate-[spin_20s_linear_infinite]"
                />
                <span className="truncate">
                  <span className="inline lg:hidden">
                    {weather?.temp || "18"}°C
                  </span>
                  <span className="hidden lg:inline">
                    {weather?.desc || "Clear"}, {weather?.temp || "18"}°C
                  </span>
                </span>
              </div>

              {/* Modern Divider with Gradient */}
              <div className="h-6 w-px bg-linear-to-b from-transparent via-[#dbe1e6] to-transparent hidden md:block" />

              {/* Notification Bell Component */}
              <NotificationBell />

              {/* Profile Avatar - Modern Glow Design */}
              {user && (
                <Link
                  href="/classroom/profile"
                  className={`
                  group/avatar relative w-8 h-8 rounded-full shrink-0
                  transition-all duration-500 ease-out flex items-center justify-center
                  ${
                    isActive("/classroom/profile")
                      ? "ring-2 ring-[#399aef] ring-offset-2 ring-offset-white/50 scale-110 shadow-xl shadow-blue-400/40"
                      : "ring-1 ring-slate-200/60 hover:ring-[#399aef]/60 hover:ring-offset-2 hover:ring-offset-white/50 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/20"
                  }
                `}
                >
                  {/* Rotating Gradient Glow */}
                  <span
                    className={`
                    absolute inset-0 rounded-full blur-xl transition-all duration-500
                    ${
                      isActive("/classroom/profile")
                        ? "opacity-50 bg-linear-to-tr from-[#399aef] via-cyan-400 to-blue-500 animate-[spin_3s_linear_infinite]"
                        : "opacity-0 group-hover/avatar:opacity-30 bg-linear-to-tr from-blue-400 via-cyan-300 to-blue-500"
                    }
                  `}
                  />

                  {/* Avatar Container */}
                  <Avatar className="relative w-full h-full rounded-full border-2 border-white/80 bg-linear-to-br from-slate-50 to-blue-50 overflow-hidden shadow-inner hover:border-white transition-all duration-300">
                    <AvatarImage
                      src={user?.avatarUrl}
                      alt={user?.name || "User"}
                      className="object-cover w-full h-full group-hover/avatar:scale-110 transition-transform duration-500"
                    />

                    {/* Modern Gradient Fallback */}
                    <AvatarFallback
                      className="
                      w-full h-full
                      bg-linear-to-br from-[#399aef] via-[#2d84d1] to-[#2b8ad8]
                      text-white font-black
                      text-xsm! md:text-[14px]
                      flex items-center justify-center
                      tracking-tighter select-none
                      group-hover/avatar:scale-110 transition-transform duration-300
                    "
                    >
                      {user?.name
                        ? user.name.substring(0, 2).toUpperCase()
                        : ""}
                    </AvatarFallback>
                  </Avatar>

                  {/* Active Indicator with Pulse */}
                  {isActive("/classroom/profile") && (
                    <span className="absolute -top-1 -right-1 w-2.5 md:w-3 h-2.5 md:h-3 bg-linear-to-br from-[#399aef] to-cyan-500 border-2 border-white rounded-full z-10 shadow-lg animate-pulse" />
                  )}
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
