import React from "react";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-5 text-center border-t border-[#dbe1e6] bg-white">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2.5 opacity-40">
          <GraduationCap className="text-[#399aef]" size={24} />
          <span className="text-sm font-black tracking-tight text-[#111518]">
            ClassFlow
          </span>
        </div>
        <p className="text-xxs font-black text-gray-400 tracking-widest uppercase">
          © 2024 Academic Management System. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Support"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-xxs font-black text-gray-400 hover:text-[#399aef] transition-colors uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
