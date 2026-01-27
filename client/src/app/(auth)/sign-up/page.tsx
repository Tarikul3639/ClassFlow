"use client";

import React, { useState } from "react";
import {
  User,
  Lock,
  GraduationCap,
  IdCard,
  Mail,
  Building2,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { signUpThunk } from "@/redux/slices/auth/thunks/auth.thunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { SignUpFormState } from "@/types/auth";

interface RoleOption {
  label: string;
  value: "student" | "admin";
  icon: React.ReactNode;
}

const ROLES: RoleOption[] = [
  { label: "Student", value: "student", icon: <GraduationCap size={18} /> },
  { label: "Admin", value: "admin", icon: <IdCard size={18} /> },
];

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { fetching: isLoading, error } = useAppSelector(
    (state) => state.auth?.requestStatus?.signUp || {},
  );

  const [role, setRole] = useState<RoleOption>(ROLES[0]);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignUpFormState>({
    name: "",
    studentId: "",
    adminId: "",
    role: "student",
    classSectionId: "",
    email: "",
    department: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signUpThunk({ ...formData, role: role.value }))
      .unwrap()
      .then(() => {
        router.push("/sign-in");
      })
      .catch(() => {});
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col font-display antialiased">
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-10 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-130 bg-white rounded-2xl shadow-2xl shadow-blue-100 p-6 sm:p-10 border border-slate-200 text-center"
        >
          {/* Header Icon */}
          <div className="mx-auto mb-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#399aef]/10 flex items-center justify-center text-[#399aef]">
            <GraduationCap size={28} className="sm:size-8" />
          </div>

          <div className="mb-8">
            <h1 className="text-[#0f172a] text-2xl sm:text-3xl font-extrabold tracking-tight pb-1.5">
              Create Account
            </h1>
            <p className="text-[#475569] text-xsm sm:text-[14px] font-medium leading-relaxed">
              Join ClassFlow to track your academic progress effortlessly.
            </p>
          </div>

          {/* Smooth Error Badge */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="flex items-center gap-2 py-3 px-4 rounded-xl bg-red-50 border border-red-200 text-left">
                  <AlertCircle className="text-red-600 shrink-0" size={18} />
                  <p className="text-red-700 text-xsm font-bold">
                    {typeof error === "string"
                      ? error
                      : "Registration failed. Please check your data."}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Role Toggle */}
          <div className="flex mb-8 bg-slate-100 p-1.5 rounded-xl">
            {ROLES.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => {
                  setRole(r);
                  setFormData((prev) => ({ ...prev, role: r.value }));
                }}
                className="relative flex-1 py-2 sm:py-2.5 text-xsm sm:text-sm font-bold transition-all"
              >
                <div
                  className={`relative z-10 flex items-center justify-center gap-2 ${
                    role.value === r.value ? "text-[#0f172a]" : "text-[#64748b]"
                  }`}
                >
                  {r.icon}
                  <span>{r.label}</span>
                </div>
                {role.value === r.value && (
                  <motion.div
                    layoutId="role-bg"
                    className="absolute -inset-0.5 rounded-lg bg-white shadow-md"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className=" space-y-3 sm:space-y-5 text-left"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-[#0f172a] text-xsm font-bold ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-4 group-focus-within:text-[#399aef] transition-colors" />
                  <input
                    required
                    type="text"
                    placeholder="Alex Johnson"
                    className="w-full h-11 sm:h-12 pl-11 pr-4 rounded-md sm:rounded-lg md:rounded-xl border border-slate-200 bg-white text-xsm sm:text-[14px] text-black font-medium focus:ring-4 focus:ring-[#399aef]/10 focus:border-[#399aef] outline-none transition-all placeholder:text-slate-400"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* ID Number */}
              <div className="space-y-2">
                <label className="text-[#0f172a] text-xsm font-bold ml-1">
                  {role.label} ID
                </label>
                <div className="relative group">
                  <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-4 group-focus-within:text-[#399aef] transition-colors" />
                  <input
                    required
                    type="text"
                    placeholder="ID Number"
                    className="w-full h-11 sm:h-12 pl-11 pr-4 rounded-md sm:rounded-lg md:rounded-xl border border-slate-200 bg-white text-xsm sm:text-[14px] text-black font-medium focus:ring-4 focus:ring-[#399aef]/10 focus:border-[#399aef] outline-none transition-all placeholder:text-slate-400"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ...(role.value === "student"
                          ? { studentId: e.target.value }
                          : { adminId: e.target.value }),
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[#0f172a] text-xsm font-bold ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-4 group-focus-within:text-[#399aef] transition-colors" />
                <input
                  required
                  type="email"
                  placeholder="name@university.edu"
                  className="w-full h-11 sm:h-12 pl-11 pr-4 rounded-md sm:rounded-lg md:rounded-xl border border-slate-200 bg-white text-xsm sm:text-[14px] text-black font-medium focus:ring-4 focus:ring-[#399aef]/10 focus:border-[#399aef] outline-none transition-all placeholder:text-slate-400"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Department Selector */}
            <div className="space-y-2">
              <label className="text-[#0f172a] text-xsm font-bold ml-1">
                Department
              </label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-4 z-10" />
                <select
                  required
                  className="w-full h-11 sm:h-12 pl-11 pr-4 rounded-md sm:rounded-lg md:rounded-xl border border-slate-200 bg-white text-xsm sm:text-[14px] text-black font-medium focus:ring-4 focus:ring-[#399aef]/10 focus:border-[#399aef] outline-none transition-all appearance-none cursor-pointer"
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                >
                  <option value="" className="text-slate-400">
                    Choose Department
                  </option>
                  <option value="cs">Computer Science</option>
                  <option value="eng">Engineering</option>
                  <option value="bus">Business Administration</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[#0f172a] text-xsm font-bold ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-4 group-focus-within:text-[#399aef] transition-colors" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className="w-full h-11 sm:h-12 pl-11 pr-12 rounded-md sm:rounded-lg md:rounded-xl border border-slate-200 bg-white text-xsm sm:text-[14px] text-black font-medium focus:ring-4 focus:ring-[#399aef]/10 focus:border-[#399aef] outline-none transition-all placeholder:text-slate-400"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#399aef] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 sm:h-12 bg-[#399aef] text-white text-xsm lg:text-2sm font-medium rounded-md sm:rounded-lg md:rounded-xl hover:bg-[#3289d6] shadow-xl shadow-blue-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin size-5" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  Create Account <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="pt-6 sm:pt-8 border-t border-slate-100">
            <p className="text-[#64748b] text-xsm lg:text-[14px] font-medium">
              Already have an account?
              <Link
                href="/sign-in"
                className="text-[#399aef] font-bold hover:underline ml-1.5 transition-colors"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
      <footer className="py-6 text-center text-slate-500 text-xxsm sm:text-xxsm px-4 font-medium">
        © 2026 ClassFlow Academic Tracker. All rights reserved.
      </footer>
    </div>
  );
};

export default RegisterPage;
