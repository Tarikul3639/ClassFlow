"use client";

import React, { useState, useMemo } from "react";

import { usePathname } from "next/navigation";

import { Logo } from "@/components/ui/Logo";
import { NotificationBell } from "@/components/Notifications/NotificationBell";
import NavbarSkeleton from "./NavbarSkeleton";

import { useAppSelector } from "@/redux/hooks";
import { selectProfileUser } from "@/redux/selectors/profile";

import NavItem from "./NavItem";
import WeatherWidget from "./WeatherWidget";
import UserAvatar from "./UserAvatar";

const Navbar: React.FC = () => {
  const user = useAppSelector(selectProfileUser);
  const loading = useAppSelector(
    (state) =>
      state.auth.requestStatus.refresh.loading ||
      state.auth.requestStatus.signIn.loading,
  );

  const pathname = usePathname();
  const [weather] = useState<{ temp: number; desc: string } | null>(null);

  // Memoized Dashboard Path
  const dashboardPath = useMemo(() => {
    if (user && user.classrooms.length === 1) {
      return `/class/${user.classrooms[0]}`;
    }
    return "/class";
  }, [user]);

  if (loading) return <NavbarSkeleton />;

  return (
    <header className="sticky top-0 z-50 px-8 pt-4 pb-4 font-display max-w-4xl mx-auto">
      <div className="relative group">
        {/* Gradient Border Effect */}
        <div className="absolute -inset-px bg-linear-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-full blur-sm group-hover:blur-md transition-all duration-500" />

        <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 px-4 md:px-6 py-2.5 rounded-full shadow-[0_8px_32px_rgba(57,154,239,0.12)] flex justify-between items-center text-[#111518]">
          <Logo />

          {/* Navigation Links with Slide Animation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-white/20 relative">
            <NavItem
              href={dashboardPath}
              label="Home"
              active={pathname === dashboardPath || pathname === "/class"}
            />
            <NavItem
              href={`/class/${user?.classrooms[0]}/info`}
              label="Info"
              active={pathname === `/class/${user?.classrooms[0]}/info`}
            />
            <NavItem
              href={`/class/${user?.classrooms[0]}/people`}
              label="People"
              active={pathname === `/class/${user?.classrooms[0]}/people`}
            />
          </nav>

          <div className="flex items-center gap-4">
            <WeatherWidget weather={weather} />

            <div className="h-6 w-px bg-linear-to-b from-transparent via-[#dbe1e6] to-transparent hidden md:block" />

            <NotificationBell />

            {user && (
              <UserAvatar
                user={user}
                isActive={pathname === `/class/${user?.classrooms[0]}/profile`}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
