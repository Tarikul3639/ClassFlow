"use client";
import React, { useState, useRef } from "react";
import { X, Camera, Check, User } from "lucide-react";
import { motion } from "framer-motion";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: {
    name: string;
    avatar: string;
  };
}

const ProfileEditModal = ({
  isOpen,
  onClose,
  currentData,
}: ProfileEditModalProps) => {
  if (!isOpen) return null;
  const [preview, setPreview] = useState(currentData.avatar);
  const [name, setName] = useState(currentData.name);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSave = () => {
    // Implement save logic here (e.g., API call)
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="bg-white w-full max-w-md rounded-4xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#399aef] flex items-center justify-center text-white">
              <User size={14} />
            </div>
            <h3 className="text-[12px] font-black uppercase tracking-widest text-gray-500">
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
                <img
                  src={
                    preview ||
                    currentData.avatar ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                  }
                  alt="Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-[#399aef] text-white p-2 rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform active:scale-95"
              >
                <Camera size={16} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
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
              <Check size={16} strokeWidth={3} /> Save Profile
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileEditModal;
