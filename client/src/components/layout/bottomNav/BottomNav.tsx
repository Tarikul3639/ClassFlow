"use client";
import { House, School, Users, CircleUser } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const items = [
  { icon: House, label: "Home", route: "/" },
  { icon: School, label: "Classes", route: "/classroom" },
  { icon: Users, label: "Members", route: "/classroom/members" },
  { icon: CircleUser, label: "Profile", route: "/classroom/profile" },
];

export const BottomNav = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed md:hidden bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white/90 backdrop-blur-lg rounded-full shadow-2xl border border-gray-500/10 px-4 py-2 flex items-center justify-around z-50">
      {items.map((item) => (
        <Link
          href={item.route}
          key={item.label}
          className={`flex flex-col items-center gap-0.5 ${pathname === item.route ? "text-primary" : "text-slate-400 hover:text-primary"}`}
        >
          <item.icon strokeWidth={2.5} className="w-4.5 h-4.5" />
          <span className="text-xxs font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};
