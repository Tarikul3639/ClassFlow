import { Logo } from "@/components/ui/Logo";
import { ArrowRight } from "lucide-react";

import Link from "next/link";

import React from "react";

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-50/50 sm:bg-blue-50/50 backdrop-blur-sm sm:backdrop-blur-md border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Logo />
          <div className="flex items-center gap-4">
            <Link
              href="#feature"
              className="hidden sm:flex items-center justify-center h-9 px-4 text-sm font-semibold text-text-muted hover:text-primary transition-colors cursor-pointer"
            >
              About
            </Link>
            <Link
              href="auth/sign-in"
              className="group flex items-center justify-center h-10 px-6 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-full shadow-soft-blue transition-all duration-200 transform active:scale-95 cursor-pointer"
            >
              <span className="mr-1">Login</span>
              <ArrowRight
                size={18}
                strokeWidth={2}
                className="group-hover:translate-x-0.5 transition-all duration-300"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
