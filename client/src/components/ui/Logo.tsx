import { GraduationCap } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 md:gap-2.5 text-[#399aef] shrink-0"
    >
      <div className="bg-[#399aef] p-1.5 rounded-lg text-white">
        <GraduationCap className="w-5 h-5 md:w-6 md:h-6" />
      </div>
      <span className="text-base md:text-lg font-black tracking-tight text-[#111518]">
        ClassFlow
      </span>
    </Link>
  );
};
