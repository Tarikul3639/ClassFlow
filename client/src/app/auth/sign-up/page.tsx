"use client";

import React, { useState, useCallback } from "react";
import {
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { signUpThunk } from "@/redux/slices/auth/thunks/signUpThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading: isLoading, error } = useAppSelector(
    (state) => state.auth?.requestStatus?.signUp || {},
  );

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignUpFormData>(() => ({
    name: "",
    email: "",
    password: "",
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()
      .toString(36)
      .substring(7)}`,
  }));

  const regenerateAvatar = useCallback(() => {
    const newSeed = Math.random().toString(36).substring(7);
    setFormData((prev) => ({
      ...prev,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newSeed}`,
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signUpThunk(formData))
      .unwrap()
      .then(() => {
        // Set client-side auth marker for middleware (cross-domain cookie support)
        document.cookie = "cf_auth=1; path=/; max-age=604800; SameSite=Lax";
        router.push("/classroom");
      })
      .catch(() => {});
  };

  const getInitials = (name: string) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "CF";
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col font-display antialiased">
      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-blue-100/50 p-6 sm:p-8 border border-slate-200"
        >
          {/* Header */}
          <div className="text-center mb-4">
            {/* Compact Avatar Section */}
            <div className="flex flex-col items-center mb-4">
              <div className="relative">
                <Avatar className="w-20 h-20 border-4 border-[#399aef]/10 shadow-sm ring-1 ring-blue-200">
                  <AvatarImage src={formData.avatarUrl} alt="Avatar" />
                  <AvatarFallback className="bg-[#399aef] text-white font-bold">
                    {getInitials(formData.name)}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={regenerateAvatar}
                  className="absolute bottom-0 right-0 p-1.5 bg-white border border-slate-200 rounded-full text-[#399aef] hover:bg-slate-50 shadow-sm transition-all active:scale-90"
                  title="Change Avatar"
                >
                  <RefreshCw size={14} />
                </button>
              </div>
              <span className="text-xxs text-slate-400 mt-2 font-medium uppercase tracking-wider">
                Profile Avatar
              </span>
            </div>
            <h1 className="text-[#0f172a] text-2xl font-extrabold tracking-tight">
              Create Account
            </h1>
            <p className="text-[#475569] text-sm font-medium mt-1.5">
              Join ClassFlow to track your progress effortlessly.
            </p>
          </div>

          {/* Error Message */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="flex items-center gap-2.5 py-3 px-4 rounded-xl bg-red-50 border border-red-100">
                  <AlertCircle className="text-red-500 shrink-0" size={16} />
                  <p className="text-red-700 text-xs font-bold leading-tight">
                    {typeof error === "string"
                      ? error
                      : "Registration failed. Try again."}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Groups */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[#0f172a] text-xsm font-bold ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-4 group-focus-within:text-[#399aef] transition-colors" />
                  <input
                    required
                    type="text"
                    placeholder="Alex Johnson"
                    className="w-full h-11 pl-11 pr-4 rounded-lg border border-slate-200 bg-white text-sm text-[#0f172a] font-medium focus:ring-4 focus:ring-[#399aef]/10 focus:border-[#399aef] outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#0f172a] text-xsm font-bold ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-4 group-focus-within:text-[#399aef] transition-colors" />
                  <input
                    required
                    type="email"
                    placeholder="name@university.edu"
                    className="w-full h-11 pl-11 pr-4 rounded-lg border border-slate-200 bg-white text-sm text-[#0f172a] font-medium focus:ring-4 focus:ring-[#399aef]/10 focus:border-[#399aef] outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#0f172a] text-xsm font-bold ml-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-4 group-focus-within:text-[#399aef] transition-colors" />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    className="w-full h-11 pl-11 pr-12 rounded-lg border border-slate-200 bg-white text-sm text-[#0f172a] font-medium focus:ring-4 focus:ring-[#399aef]/10 focus:border-[#399aef] outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#399aef] transition-colors"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-[#399aef] text-white text-[14px] font-medium rounded-xl hover:bg-[#3289d6] shadow-lg shadow-blue-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-7 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin size-5" />
                  Creating...
                </>
              ) : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="py-3 pt-6 border-t border-slate-100 text-center">
            <p className="text-[#64748b] text-xs sm:text-xxsm font-medium">
              Already have an account?
              <Link
                href="/auth/sign-in"
                className="text-[#399aef] font-bold hover:underline ml-1.5"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default RegisterPage;
