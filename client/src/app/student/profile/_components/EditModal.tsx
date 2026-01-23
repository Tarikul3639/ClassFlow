"use client";
import { X, Check } from "lucide-react";
import { motion } from "framer-motion";

interface EditModalProps {
  field: { label: string; value: string };
  onClose: () => void;
}

// --- Edit Modal Component ---
const EditModal = ({ field, onClose }: EditModalProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-100 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden"
    >
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h3 className="text-[12px] font-black uppercase tracking-widest text-gray-500">
          Edit {field.label}
        </h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      <div className="p-5 space-y-4">
        <div className="space-y-1.5">
          <label className="text-xxs font-bold text-[#399aef]">
            New {field.label}
          </label>
          <input
            autoFocus
            defaultValue={field.value}
            className="w-full px-4 py-2.5 bg-gray-50 border border-[#dbe1e6] rounded-xl text-[13px] font-bold focus:outline-none focus:ring-2 focus:ring-[#399aef]/20 focus:border-[#399aef] transition-all"
          />
        </div>
        <div className="flex gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-[11px] font-black bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
          >
            CANCEL
          </button>
          <button className="flex-1 py-2.5 rounded-xl text-[11px] font-black bg-[#399aef] text-white hover:bg-[#2d84d1] shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2">
            <Check size={14} strokeWidth={3} /> SAVE CHANGES
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);
export default EditModal;
