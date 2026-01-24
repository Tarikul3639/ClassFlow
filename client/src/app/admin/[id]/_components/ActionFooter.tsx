"use client";

import Link from "next/link";
import { Save, X } from "lucide-react";

export const ActionFooter = () => (
  <div className="px-5 sm:px-10 pb-8 sm:pb-10 pt-4 backdrop-blur-md sticky bottom-0 z-50">
    <div className="max-w-4xl mx-auto p-2 sm:p-3 rounded-3xl sm:rounded-4xl flex items-center justify-between gap-2 shadow-[#111518]/20">
      
      {/* Cancel Button */}
      <Link href="/admin" className="flex-1">
        <button className="w-full flex items-center justify-center gap-2 px-5 py-3.5 sm:py-4 rounded-3xl sm:rounded-4xl  bg-gray-200 text-black hover:text-red-500 hover:bg-red-100 transition-all duration-300">
          <X size={14} className="sm:w-4 sm:h-4" />
          <span className="text-xxxs sm:text-xxxxs lg:text-xxxs font-black uppercase tracking-[0.25em]">
            Discard
          </span>
        </button>
      </Link>

      {/* Divider */}
      <div className="w-px h-8 bg-white/10 hidden sm:block" />

      {/* Save Button */}
      <button 
        type="submit"
        className="flex-[1.5] sm:flex-1 group relative flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-3xl sm:rounded-4xl bg-[#399aef] text-white overflow-hidden transition-all duration-500 hover:bg-[#2d82cc] hover:shadow-[0_0_20px_rgba(57,154,239,0.4)] active:scale-[0.96]"
      >
        {/* Shine effect */}
        <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] -translate-x-full group-hover:animate-shine" />
        
        <Save size={14} className="sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline text-xxxs sm:text-xxxxs lg:text-xxxs font-black uppercase tracking-[0.25em]">
          Confirm Changes
        </span>
        <span className="sm:hidden text-xxxs sm:text-xxxxs lg:text-xxxs font-black uppercase tracking-[0.25em]">
          save
        </span>
      </button>
      
    </div>
  </div>
);