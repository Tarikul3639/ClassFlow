"use client";
import React, { useState } from "react";
import { X, Key, Check, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PasswordEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (currentPassword: string, newPassword: string) => void;
  error?: string | null;
}

const PasswordEditModal = ({
  isOpen,
  onClose,
  onSave,
  error,
}: PasswordEditModalProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSave = () => {
    if (!currentPassword || !newPassword) return;
    onSave(currentPassword, newPassword);
  };

  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 8 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header - Same Style */}
            <div className="p-4 px-5 sm:p-5 sm:px-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#399aef] flex items-center justify-center text-white">
                  <Key size={14} className="sm:w-4 sm:h-4" />
                </div>
                <h3 className="text-xxs sm:text-xxsm font-black uppercase tracking-widest text-gray-500">
                  Change Password
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 hover:bg-gray-200 rounded-xl transition-all duration-150 text-gray-400 hover:text-gray-600 active:scale-95"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-5 sm:space-y-6">
              {/* Info Banner - Modern & Compact */}
              <div className="relative overflow-hidden p-3.5 sm:p-4 bg-linear-to-br from-blue-50/50 to-indigo-50/30 border border-blue-100/60 rounded-2xl flex items-start gap-3">
                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-transparent pointer-events-none" />

                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/80 backdrop-blur-sm border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                  <Lock
                    size={16}
                    className="sm:w-4.5 sm:h-4.5"
                    strokeWidth={2.5}
                  />
                </div>
                <div className="relative flex-1 min-w-0">
                  <p className="text-xxs sm:text-[11px] font-black text-blue-900 uppercase tracking-wider">
                    Secure Your Account
                  </p>
                  <p className="text-[11px] sm:text-xxs text-blue-600/80 mt-0.5 font-medium leading-relaxed">
                    Use at least 8 characters with mix of letters & numbers
                  </p>
                </div>
              </div>

              {/* Input Fields - Faster animations */}
              <div className="space-y-4">
                {/* Current Password */}
                <div className="space-y-2">
                  <label className="text-xxs sm:text-xxs font-black text-gray-500 uppercase tracking-[0.15em] ml-0.5 block">
                    Current Password
                  </label>
                  <div className="relative group">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      autoComplete="current-password"
                      className={`w-full px-4 py-3 sm:py-3 bg-gray-50/80 border rounded-xl sm:rounded-2xl text-xsm sm:text-[14px] font-semibold focus:outline-none transition-all duration-150 placeholder:text-gray-300 placeholder:font-normal ${
                        error
                          ? "border-red-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-400 bg-red-50/30"
                          : "border-gray-200 focus:ring-2 focus:ring-[#399aef]/20 focus:border-[#399aef] focus:bg-white"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-[#399aef] transition-all duration-150 rounded-lg hover:bg-gray-100/50 active:scale-95"
                    >
                      {showCurrentPassword ? (
                        <EyeOff size={17} className="sm:w-4.5 sm:h-4.5" />
                      ) : (
                        <Eye size={17} className="sm:w-4.5 sm:h-4.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <label className="text-xxs sm:text-xxs font-black text-gray-500 uppercase tracking-[0.15em] ml-0.5 block">
                    New Password
                  </label>
                  <div className="relative group">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      autoComplete="new-password"
                      className={`w-full px-4 py-3 sm:py-3 bg-gray-50/80 border rounded-lg sm:rounded-xl text-xsm sm:text-[14px] font-semibold focus:outline-none transition-all duration-150 placeholder:text-gray-300 placeholder:font-normal ${
                        error
                          ? "border-red-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-400 bg-red-50/30"
                          : "border-gray-200 focus:ring-2 focus:ring-[#399aef]/20 focus:border-[#399aef] focus:bg-white"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-[#399aef] transition-all duration-150 rounded-lg hover:bg-gray-100/50 active:scale-95"
                    >
                      {showNewPassword ? (
                        <EyeOff size={17} className="sm:w-4.5 sm:h-4.5" />
                      ) : (
                        <Eye size={17} className="sm:w-4.5 sm:h-4.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Message - Faster animation */}
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-2 px-3.5 py-2.5 bg-red-50 border border-red-100 rounded-xl"
                    >
                      <AlertCircle
                        size={14}
                        strokeWidth={2.5}
                        className="text-red-500 shrink-0"
                      />
                      <span className="text-xxs sm:text-xs font-medium text-red-600 leading-tight">
                        {error}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Buttons - Modern & Responsive */}
              <div className="flex gap-2.5 sm:gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 sm:py-3.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xxs font-black bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all duration-150 uppercase tracking-[0.15em] active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!currentPassword || !newPassword}
                  className="flex-1 py-3 sm:py-3.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xxs font-black bg-[#399aef] text-white hover:bg-[#2d84d1] shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-150 flex items-center justify-center gap-2 uppercase tracking-[0.15em] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:bg-[#399aef] active:scale-[0.98] disabled:active:scale-100"
                >
                  <Check size={15} strokeWidth={3} className="sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline sm:inline">
                    Update Password
                  </span>
                  <span className="xs:hidden sm:hidden">Update</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PasswordEditModal;
