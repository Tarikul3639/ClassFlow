"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, Trash2, Loader2 } from "lucide-react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  variant?: "success" | "danger" | "warning" | "info";
  confirmText?: string;
  loading?: boolean;
}

export const Dialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  variant = "info",
  confirmText = "Confirm",
  loading = false,
}: DialogProps) => {
  const configs = {
    success: {
      icon: <CheckCircle2 size={18} />,
      color: "#22c55e",
      bg: "bg-green-500/10",
      btn: "bg-green-600 hover:bg-green-700 shadow-green-500/10",
    },
    danger: {
      icon: <Trash2 size={18} />,
      color: "#ef4444",
      bg: "bg-red-500/10",
      btn: "bg-red-500 hover:bg-red-600 shadow-red-500/10",
    },
    warning: {
      icon: <AlertCircle size={18} />,
      color: "#f59e0b",
      bg: "bg-amber-500/10",
      btn: "bg-amber-500 hover:bg-amber-600 shadow-amber-500/10",
    },
    info: {
      icon: <AlertCircle size={18} />,
      color: "#399aef",
      bg: "bg-[#399aef]/10",
      btn: "bg-[#111518] hover:bg-[#399aef] shadow-[#111518]/10",
    },
  };

  const current = configs[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with High Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed top-0 left-0 w-screen h-screen z-100 bg-[#111518]/10 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <div className="fixed inset-0 z-101 flex items-center justify-center p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
              className="w-full max-w-85 bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.12)] pointer-events-auto overflow-hidden border border-[#f1f5f9]"
            >
              <div className="p-6 pb-7 flex flex-col items-center">
                {/* Icon Section */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${current.bg}`}
                  style={{ color: current.color }}
                >
                  {current.icon}
                </div>

                {/* Typography Block */}
                <div className="text-center space-y-1.5 mb-7">
                  <h3 className="text-sm sm:text-2sm font-black text-[#111518] uppercase tracking-[0.08em]">
                    {title}
                  </h3>
                  <p className="text-xxsm text-[#617789] leading-relaxed tracking-wide px-3 opacity-80">
                    {description}
                  </p>
                </div>

                {/* Refined Actions */}
                <div className="flex flex-col xs:flex-row items-center gap-2.5 w-full">
                  <button
                    onClick={onClose}
                    disabled={loading}
                    className="w-full xs:flex-1 py-3.5 px-5 rounded-lg border border-[#dbe1e6] bg-white text-[#617789] text-xxxs font-black uppercase tracking-[0.15em] hover:bg-[#f8fafc] hover:border-[#617789]/30 hover:text-[#111518] transition-all duration-300 disabled:opacity-50"
                  >
                    Discard
                  </button>

                  <button
                    onClick={onConfirm}
                    disabled={loading}
                    className={`w-full xs:flex-1 py-3.5 px-5 rounded-lg text-white text-xxxs font-black uppercase tracking-[0.15em] transition-all shadow-lg active:scale-[0.96] disabled:opacity-70 flex items-center justify-center gap-2 ${current.btn}`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin h-3.5 w-3.5 text-white/90" />
                        <span className="opacity-90">Wait...</span>
                      </>
                    ) : (
                      confirmText
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
