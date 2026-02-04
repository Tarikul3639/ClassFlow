"use client";
import React, { useState, useRef, useCallback } from "react";
import {
  X,
  Camera,
  Check,
  User,
  RefreshCw,
  Loader,
  AlertCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profileUpdateThunk } from "@/redux/slices/auth/thunks/profileUpdateThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: {
    name: string;
    avatarUrl?: string;
  };
}

const ProfileEditModal = ({
  isOpen,
  onClose,
  currentData,
}: ProfileEditModalProps) => {
  const [preview, setPreview] = useState(currentData.avatarUrl);
  const [name, setName] = useState(currentData.name);

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(
    (state) => state.auth.requestStatus.profileUpdate,
  );

  const regenerateAvatar = useCallback(() => {
    const newSeed = Math.random().toString(36).substring(7);
    setPreview(`https://api.dicebear.com/7.x/avataaars/svg?seed=${newSeed}`);
  }, []);

  const handleSave = async () => {
    try {
      await dispatch(profileUpdateThunk({ name, avatarUrl: preview })).unwrap();

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="fixed inset-0 z-100 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 16 }}
        transition={{ duration: 0, ease: "easeInOut" }}
        className="bg-white w-full max-w-md rounded-4xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#399aef] flex items-center justify-center text-white">
              <User size={14} />
            </div>
            <h3 className="text-xxsm font-black uppercase tracking-widest text-gray-500">
              Edit Profile
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-200 rounded-xl transition-colors text-gray-400"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full border-4 border-[#399aef]/10 p-1 shadow-inner overflow-hidden">
                <Avatar className="w-full h-full">
                  <AvatarImage
                    src={preview || currentData.avatarUrl}
                    alt="Preview"
                  />
                  <AvatarFallback className="w-full h-full font-black text-4xl bg-blue-50">
                    {name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <button
                type="button"
                onClick={regenerateAvatar}
                className="absolute bottom-0 right-0 p-1.5 bg-white border border-slate-200 rounded-full text-[#399aef] hover:bg-slate-50 shadow-sm transition-all active:scale-90 cursor-pointer"
                title="Change Avatar"
              >
                <RefreshCw size={14} />
              </button>
            </div>
            <p className="text-xxs font-bold text-gray-400 uppercase tracking-tighter">
              Click camera to change photo
            </p>
          </div>

          {/* Name Input */}
          <div className="space-y-1.5">
            <label className="text-xxs font-black text-[#399aef] uppercase tracking-widest ml-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-gray-50 border border-[#dbe1e6] rounded-2xl text-[14px] font-bold focus:outline-none focus:ring-4 focus:ring-[#399aef]/10 focus:border-[#399aef] transition-all placeholder:text-gray-300"
            />
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

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl text-[11px] font-black bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-2xl text-[11px] font-black bg-[#399aef] text-white hover:bg-[#2d84d1] shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              {loading ? (
                <Loader size={14} className="animate-spin" />
              ) : (
                <Check size={16} strokeWidth={3} />
              )}
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileEditModal;
