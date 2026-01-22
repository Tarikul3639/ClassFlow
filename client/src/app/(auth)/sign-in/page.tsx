"use client";
import React, { useState } from "react";
import { User, Lock, GraduationCap, IdCard, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface RoleOption {
  label: string;
  icon: React.ReactElement<LucideIcon>;
}

const ROLE: RoleOption[] = [
  { label: "Student", icon: <GraduationCap size={18} /> },
  { label: "Admin", icon: <IdCard size={18} /> },
];

const LoginPage: React.FC = () => {
  const [role, setRole] = useState<RoleOption>(ROLE[0]);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Logging in as ${role.label}:`, formData);
  };

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col justify-center font-display antialiased">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-105 bg-white backdrop-blur-sm rounded-2xl shadow-xl shadow-[#399aef]/10 p-8 border border-white">
          
          {/* Headline Section */}
          <div className="mb-8 text-center">
            <h1 className="text-[#111518] tracking-tight text-2xl sm:text-3xl font-bold pb-1">
              Welcome back
            </h1>
            <p className="text-[#617789] text-xs sm:text-sm font-medium">
              Log in to your ClassFlow account to continue
            </p>
          </div>

          {/* Role Toggle */}
          <div className="flex mb-8 bg-[#F0F2F4] p-1 rounded-xl">
            {ROLE.map((r) => (
              <button
                key={r.label}
                type="button"
                onClick={() => setRole(r)}
                className="relative flex-1 py-2.5 text-xs sm:text-sm font-bold"
              >
                <div
                  className={`relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 ${
                    role.label === r.label ? "text-[#111518]" : "text-[#617789]"
                  }`}
                >
                  {r.icon}
                  <span>{r.label}</span>
                </div>

                {role.label === r.label && (
                  <motion.div
                    layoutId="role-indicator"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="absolute inset-0 rounded-lg bg-white"
                  />
                )}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Input Field Label Refinement */}
            <div className="space-y-2">
              <label className="text-[#111518] text-xs font-bold ml-1">
                Email or {role.label} ID
              </label>
              <div className="relative group mt-1">
                <input
                  type="text"
                  placeholder="Enter your email or ID"
                  className="w-full h-12 pl-4 pr-11 rounded-xl border border-[#dbe1e6] bg-white text-sm text-black focus:ring-4 focus:ring-[#399aef]/10 focus:border-[#399aef] outline-none transition-all placeholder:text-gray-400"
                  onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                />
                <User className="absolute right-4 top-1/2 -translate-y-1/2 text-[#617789] size-5 group-focus-within:text-[#399aef] transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[#111518] text-xs font-bold">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[#399aef] text-xs font-bold hover:text-[#2d7bc2] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full h-12 pl-4 pr-11 rounded-xl border border-[#dbe1e6] bg-white text-sm text-black focus:ring-4 focus:ring-[#399aef]/10 focus:border-[#399aef] outline-none transition-all placeholder:text-gray-400"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-[#617789] size-5 group-focus-within:text-[#399aef] transition-colors" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-[#399aef] text-white text-sm font-bold rounded-xl hover:bg-[#3289d6] shadow-lg shadow-[#399aef]/20 active:scale-[0.98] transition-all mt-2"
            >
              Login
            </button>
          </form>

          {/* Registration Footer */}
          <div className="mt-8 pt-6 border-t border-neutral-border text-center">
            <p className="text-[#617789] text-xs font-medium">
              Don't have an account?
              <Link
                href="/sign-up"
                className="text-[#399aef] font-bold hover:underline ml-1.5"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;