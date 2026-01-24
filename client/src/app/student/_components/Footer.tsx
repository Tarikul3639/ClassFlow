// components/Footer.tsx
import React from "react";
import { GraduationCap, ShieldCheck } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-8 text-center border-t border-[#dbe1e6] bg-white">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand Section */}
        <div className="relative flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="text-[#399aef]" size={22} />
            <span className="text-xs font-black tracking-[0.15em] text-[#111518] uppercase">
              ClassFlow
            </span>
          </div>
          <p className="text-xxxs font-bold text-gray-400 tracking-widest uppercase mt-1">
            Developed by Tarikul Islam
          </p>
           <span className="absolute inset-0 top-2 blur-3xl rounded-full bg-[#072ef0] opacity-50 z-50"/>
        </div>

        {/* Rights Section */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-xxs font-black text-gray-400 tracking-widest uppercase">
            © 2026 Academic Management System
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Support"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xxxs font-black text-gray-400 hover:text-[#399aef] transition-colors uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Admin Switcher - Industrial Style */}
        <Link href="/admin" className="group">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#f8fafc] border border-[#dbe1e6] group-hover:border-[#399aef] transition-all active:scale-95">
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-black text-[#399aef] uppercase tracking-tighter leading-none">
                Master Control
              </span>
              <span className="text-xxs font-bold text-[#617789] uppercase tracking-widest mt-0.5 group-hover:text-[#111518]">
                Admin Panel
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-white border border-[#dbe1e6] group-hover:bg-[#399aef] group-hover:text-white flex items-center justify-center transition-colors shadow-sm">
              <ShieldCheck size={16} strokeWidth={2.5} />
            </div>
          </div>
        </Link>

      </div>
    </footer>
  );
};

export default Footer;