"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const AdminHeader = ({ id }: { id?: string }) => {
  const router = useRouter();
  
  return (
    <div className="px-6 sm:px-10 pt-3 sm:pt-4 pb-4 sm:pb-6 lg:pb-8 border-b border-[#f1f5f9] flex flex-col gap-6">
      <div className="flex items-center gap-4 sm:gap-5 lg:gap-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white border border-[#dbe1e6] hover:border-[#399aef] hover:bg-[#399aef]/5 transition-all duration-300 shadow-sm"
        >
          <ChevronLeft
            size={20}
            className="text-[#617789] lg:w-6 lg:h-6 group-hover:text-[#399aef] group-hover:-translate-x-0.5 transition-all"
            strokeWidth={2.5}
          />
        </button>

        {/* Text Content */}
        <div className="flex flex-col gap-0.5 sm:gap-1 lg:gap-1.5">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-[#111518] tracking-tight leading-tight">
            {id == "new" ? "Create New Event" : "Edit Event"}
          </h1>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#399aef] animate-pulse hidden sm:block" />
            <p className="text-[#617789] font-black uppercase text-xxxxs sm:text-xxxs lg:text-xxs tracking-[0.2em] opacity-70">
              Event System • ID: {id || "NEW_SESSION"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};