"use client";

import React, { useState } from "react";
import {
  User,
  Lock,
  ArrowRight,
  Loader2,
  GraduationCap,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { signInThunk } from "@/redux/slices/auth/thunks/auth.thunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AnimatePresence } from "framer-motion";

const SignInPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state) => state.auth?.requestStatus?.signIn?.fetching,
  );
  const error = useAppSelector(
    (state) => state.auth?.requestStatus?.signIn?.error,
  );

  const [showPassword, setShowPassword] = useState(false); // Toggle State
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      signInThunk({
        email: formData.identifier,
        password: formData.password,
      }),
    );
  };

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col font-display antialiased">
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-105 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl shadow-[#399aef]/10 p-6 sm:p-8 border border-white text-center"
        >
          {/* Icon Decoration */}
          <div className="mx-auto mb-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#399aef]/10 flex items-center justify-center text-[#399aef]">
            <GraduationCap size={28} className="sm:w-8 sm:h-8" />
          </div>

          <div className="mb-6 sm:mb-8">
            <h1 className="text-[#111518] text-xl sm:text-2xl font-bold pb-2">
              Welcome back
            </h1>
            <p className="text-[#617789] text-xxsm sm:text-xsm font-medium leading-relaxed px-2">
              Log in to your ClassFlow account to continue managing your
              academic journey.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                // 1. Initial state (Small, transparent, and slightly up)
                initial={{ opacity: 0, scale: 0.95, y: -10, height: 0 }}
                // 2. Animate to (Natural size, visible, and slides down)
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  height: "auto",
                  transition: {
                    height: { duration: 0.3 },
                    opacity: { duration: 0.2 },
                    // Spring makes it feel more "physical" and less robotic
                    scale: { type: "spring", stiffness: 300, damping: 25 },
                  },
                }}
                // 3. Exit state (Fades out quickly)
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  height: 0,
                  transition: { duration: 0.2 },
                }}
                className="overflow-hidden mb-6"
              >
                <div className="flex items-center gap-3 p-3.5 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle className="size-5 text-red-500" />
                  <p className="text-xsm font-medium text-red-500">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form
            onSubmit={handleLogin}
            className="space-y-4 sm:space-y-5 text-left"
          >
            {/* Identity Field */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-[#111518] text-xxsm sm:text-xsm font-bold ml-1">
                Email or User ID
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#617789] size-4 sm:size-5 group-focus-within:text-[#399aef] transition-colors" />
                <input
                  required
                  type="text"
                  placeholder="name@example.com"
                  className="w-full h-11 sm:h-12 pl-10 sm:pl-11 pr-4 rounded-xl border border-[#dbe1e6] bg-white text-xsm sm:text-[14px] text-black focus:ring-4 focus:ring-[#399aef]/10 focus:border-[#399aef] outline-none transition-all placeholder:text-gray-400"
                  onChange={(e) =>
                    setFormData({ ...formData, identifier: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[#111518] text-xxsm sm:text-xsm font-bold">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[#399aef] text-[11px] sm:text-xxsm font-bold hover:underline transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#617789] size-4 sm:size-5 group-focus-within:text-[#399aef] transition-colors" />
                <input
                  required
                  type={showPassword ? "text" : "password"} // Dynamic Type
                  placeholder="Enter your password"
                  className="w-full h-11 sm:h-12 pl-10 sm:pl-11 pr-12 rounded-xl border border-[#dbe1e6] bg-white text-xsm sm:text-[14px] text-black focus:ring-4 focus:ring-[#399aef]/10 focus:border-[#399aef] outline-none transition-all placeholder:text-gray-400"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                {/* Visibility Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#617789] hover:text-[#399aef] transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group w-full h-11 sm:h-12 bg-[#399aef] text-white text-sm font-medium rounded-xl hover:bg-[#3289d6] shadow-lg shadow-[#399aef]/20 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin size-5" />{" "}
                  <span>SignIn...</span>
                </>
              ) : (
                <>
                  Sign In{" "}
                  <ArrowRight
                    size={18}
                    strokeWidth={3}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </>
              )}
            </button>
          </form>

          {/* Registration Footer */}
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#dbe1e6]">
            <p className="text-[#617789] text-xxsm font-medium">
              Don't have an account?
              <Link
                href="/sign-up"
                className="text-[#399aef] font-bold hover:underline ml-1 transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="py-4 sm:py-6 text-center text-[#617789] text-xxs sm:text-xs px-4">
        © 2026 ClassFlow Academic Tracker. All rights reserved.
      </footer>
    </div>
  );
};

export default SignInPage;
