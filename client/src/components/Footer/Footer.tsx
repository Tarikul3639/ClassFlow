import React from "react";
import { Sparkles, Code2, Zap } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="py-10 sm:py-12 border-t border-[#edf1f4] mt-20">
      <div className="max-w-2xl mx-auto px-6">
        {/* Main Content */}
        <div className="flex flex-col items-center gap-6">
          {/* Developer Branding - Centered & Premium */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              {/* Logo Badge */}
              <div className="relative group">
                <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-[#399aef] to-[#2d7ac7] flex items-center justify-center text-white shadow-lg shadow-blue-200/50 ring-4 ring-blue-50 transition-all duration-300">
                  <span className="text-lg font-black">T</span>
                </div>
                {/* Subtle Glow */}
                <div className="absolute inset-0 rounded-2xl bg-[#399aef] opacity-20 blur-xl -z-10" />
              </div>

              {/* Name & Title */}
              <div className="flex flex-col">
                <span className="text-xs font-black text-[#399aef] uppercase tracking-[0.2em] leading-none mb-1">
                  Designed & Built by
                </span>
                <span className="text-sm font-black text-[#111518] uppercase tracking-[0.15em]">
                  Tarikul Islam
                </span>
              </div>
            </div>

            {/* Tagline with Icons */}
            <div className="flex items-center gap-2 text-[#617789]">
              <Code2 size={14} className="text-[#399aef]" />
              <span className="text-xxxs font-bold uppercase tracking-widest">
                Crafted with Precision & Care
              </span>
              <Sparkles size={14} className="text-[#399aef]" />
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-linear-to-r from-transparent via-[#edf1f4] to-transparent" />

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f8fafc] border border-[#edf1f4]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#399aef]" />
              <span className="text-xxxs font-bold text-[#617789] uppercase tracking-wider">
                Next.js
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f8fafc] border border-[#edf1f4]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#399aef]" />
              <span className="text-xxxs font-bold text-[#617789] uppercase tracking-wider">
                TypeScript
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f8fafc] border border-[#edf1f4]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#399aef]" />
              <span className="text-xxxs font-bold text-[#617789] uppercase tracking-wider">
                Tailwind CSS
              </span>
            </div>
          </div>

          {/* Copyright & Version */}
          <div className="flex flex-col items-center gap-1 mt-2">
            <div className="flex items-center gap-2 text-[#399aef]/40">
              <Zap size={12} strokeWidth={3} />
              <span className="text-xxxxs font-black uppercase tracking-[0.2em]">
                ClassFlow Event Tracker
              </span>
            </div>
            <p className="text-xxxxs text-[#94a3b8] font-medium tracking-widest uppercase">
              © 2026 • Version 2.4.0 • All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};