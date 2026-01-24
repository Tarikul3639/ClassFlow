"use client";
import { CirclePlay } from "lucide-react";
import Link from "next/link";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center px-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xxs xs:text-xs font-bold uppercase tracking-wider mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Version 1.0 Live
        </div>

        {/* Main Heading - Responsive Scale */}
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-main tracking-tight leading-[1.15] sm:leading-[1.1] mb-6">
          Manage your academic <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600">
            journey with ease.
          </span>
        </h1>

        {/* Description - Text sizes Adjusted */}
        <p className="text-sm xs:text-base sm:text-lg md:text-xl text-text-muted mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
          ClassFlow is the smart academic activity management system designed to
          keep students and teachers perfectly synced.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col xs:flex-row items-center justify-center gap-4">
          <Link
            href="/student"
            className="w-full xs:w-auto h-12 px-8 bg-primary hover:bg-blue-400 text-white text-sm sm:text-base font-semibold rounded-full shadow-soft-blue transition-all duration-200 transform hover:scale-[1.01] cursor-pointer flex items-center justify-center"
          >
            Get Started
          </Link>
          <button 
            className="w-full xs:w-auto h-12 px-8 bg-white border border-neutral-border hover:border-primary/50 text-text-main text-sm sm:text-base font-semibold rounded-full transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <CirclePlay size={20} strokeWidth={1.5} className="text-primary" />
            How it works
          </button>
        </div>
      </div>
    </section>
  );
};