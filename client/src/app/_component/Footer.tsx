"use client";

import { GraduationCap, Github, Twitter, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-[#edf1f4] py-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Brand & Dev */}
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl bg-[#ecf3fb] border border-[#edf1f4] flex items-center justify-center text-[#399aef]">
              <GraduationCap size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-xsm font-black text-[#111518] uppercase tracking-wider">ClassFlow</span>
              <p className="text-xxs font-bold text-[#617789] uppercase tracking-widest">
                By <a href="https://tarikul-islam.me" className="text-[#399aef] hover:underline">Tarikul Islam</a>
              </p>
            </div>
          </div>

          {/* Center: Minimal Links (Fills the gap) */}
          <nav className="flex items-center gap-6">
            {["Privacy", "Support", "Docs"].map((item) => (
              <a key={item} href="#" className="text-xxs font-black text-[#617789]/60 hover:text-[#399aef] uppercase tracking-[0.2em] transition-colors">
                {item}
              </a>
            ))}
          </nav>

          {/* Right: Social & Admin Jump */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 pr-3 border-r border-[#edf1f4]">
              <a href="#" className="p-2 text-[#617789] hover:text-[#399aef] transition-colors">
                <Twitter size={16} fill="currentColor" strokeWidth={0} />
              </a>
              <a href="#" className="p-2 text-[#617789] hover:text-[#399aef] transition-colors">
                <Github size={16} fill="currentColor" strokeWidth={0} />
              </a>
            </div>
            
            <button className="group flex items-center gap-2 pl-2 border border-blue-200  rounded-lg p-2">
              <span className="text-xxs font-black uppercase tracking-widest px-2 text-[#399aef] transition-colors">
                Secure Access
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#399aef] text-white flex items-center justify-center border border-[#edf1f4] transition-all">
                <ShieldCheck size={14} />
              </div>
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-6 pt-6 border-t border-[#f8fafc] text-center">
          <p className="text-xxxs font-bold text-[#617789]/40 uppercase tracking-[0.3em]">
            © 2026 All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};