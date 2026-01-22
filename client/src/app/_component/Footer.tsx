"use client";
import Link from "next/link";
import { GraduationCap, Twitter, Github } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-neutral-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-6">
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-primary/5 group-hover:bg-primary/10 text-text-muted group-hover:text-primary transition-all duration-300">
            <GraduationCap size={24} strokeWidth={2} />
          </div>
          <span className="text-xl font-bold tracking-tight text-text-muted">
            ClassFlow
          </span>
        </Link>
        <p className="text-text-muted text-sm font-medium">
          Developed by{" "}
          <a
            href="https://tarikul-islam.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-primary hover:underline font-semibold"
          >
            Tarikul Islam
          </a>{" "}
          | © 2026
        </p>

        <div className="flex gap-6 mt-2">
          <a
            href="#"
            className="text-gray-400 hover:text-primary transition-colors"
          >
            <span className="sr-only">Twitter</span>
            <Twitter size={20} fill="currentColor" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-primary transition-colors"
          >
            <span className="sr-only">GitHub</span>
            <Github size={20} fill="currentColor" />
          </a>
        </div>
      </div>
    </footer>
  );
};