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
  LayoutGrid,
  LifeBuoy,
  LucideIcon 
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface RoleOption {
  label: string;
  icon: React.ReactElement<LucideIcon>;
}

const ROLES: RoleOption[] = [
  { label: "Student", icon: <GraduationCap size={18} /> },
  { label: "Admin", icon: <IdCard size={18} /> },
];

const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<RoleOption>(ROLES[0]);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    email: "",
    department: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Registering as ${role.label}:`, formData);
  };

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col font-display antialiased">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-[480px] bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl shadow-[#399aef]/10 p-8 border border-white">
          
          <div className="mb-8 text-center">
            <h1 className="text-[#111518] tracking-tight text-2xl sm:text-3xl font-bold pb-1">
              Create Account
            </h1>
            <p className="text-[#617789] text-[13px] sm:text-sm font-medium">
              Join ClassFlow to track your academic progress
            </p>
          </div>

          {/* Role Toggle */}
          <div className="flex mb-8 bg-[#F0F2F4] p-1 rounded-xl">
            {ROLES.map((r) => (
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
                    className="absolute inset-0 rounded-lg bg-white shadow-sm"
                  />
                )}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[#111518] text-[13px] font-bold ml-1">Full Name</label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="e.g. Alex Johnson"
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-[#dbe1e6] bg-white text-[14px] text-black focus:ring-4 focus:ring-[#399aef]/10 focus:border-[#399aef] outline-none transition-all placeholder:text-gray-400"
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#617789] size-5 group-focus-within:text-[#399aef] transition-colors" />
              </div>
            </div>

            {/* ID Number */}
            <div className="space-y-2">
              <label className="text-[#111518] text-[13px] font-bold ml-1">{role.label} ID Number</label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder={`Enter your ${role.label.toLowerCase()} ID`}
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-[#dbe1e6] bg-white text-[14px] text-black focus:ring-4 focus:ring-[#399aef]/10 focus:border-[#399aef] outline-none transition-all placeholder:text-gray-400"
                  onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                />
                <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-[#617789] size-5 group-focus-within:text-[#399aef] transition-colors" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[#111518] text-[13px] font-bold ml-1">Email Address</label>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="name@university.edu"
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-[#dbe1e6] bg-white text-[14px] text-black focus:ring-4 focus:ring-[#399aef]/10 focus:border-[#399aef] outline-none transition-all placeholder:text-gray-400"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#617789] size-5 group-focus-within:text-[#399aef] transition-colors" />
              </div>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="text-[#111518] text-[13px] font-bold ml-1">Department</label>
              <div className="relative group">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-[#617789] size-5 group-focus-within:text-[#399aef] transition-colors z-10" />
                <select 
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-[#dbe1e6] bg-white text-[14px] text-black focus:ring-4 focus:ring-[#399aef]/10 focus:border-[#399aef] outline-none transition-all appearance-none cursor-pointer"
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                >
                  <option value="">Select Department</option>
                  <option value="cs">Computer Science</option>
                  <option value="eng">Engineering</option>
                  <option value="bus">Business Administration</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[#111518] text-[13px] font-bold ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#617789] size-5 group-focus-within:text-[#399aef] transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className="w-full h-12 pl-11 pr-12 rounded-xl border border-[#dbe1e6] bg-white text-[14px] text-black focus:ring-4 focus:ring-[#399aef]/10 focus:border-[#399aef] outline-none transition-all placeholder:text-gray-400"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#617789] hover:text-[#399aef] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-[#399aef] text-white text-sm font-bold rounded-xl hover:bg-[#3289d6] shadow-lg shadow-[#399aef]/20 active:scale-[0.98] transition-all mt-4"
            >
              Create Account
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-[#f0f2f4] text-center">
            <p className="text-[#617789] text-[13px] font-medium">
              Already have an account?
              <Link
                href="/sign-in"
                className="text-[#399aef] font-bold hover:underline ml-1.5"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;