"use client";
import React, { useState } from "react";
import { X, UserPlus, Search, Check } from "lucide-react";
import { motion } from "framer-motion";

interface AssignCoAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample students data - Replace with actual data from your backend
const sampleStudents = [
  { id: "ST-2024-091", name: "John Doe", email: "john@example.com" },
  { id: "ST-2024-092", name: "Jane Smith", email: "jane@example.com" },
  { id: "ST-2024-093", name: "Mike Johnson", email: "mike@example.com" },
  { id: "ST-2024-094", name: "Sarah Williams", email: "sarah@example.com" },
];

const AssignCoAdminModal = ({
  isOpen,
  onClose,
}: AssignCoAdminModalProps) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const filteredStudents = sampleStudents.filter(
    (student) =>
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssign = () => {
    if (!selectedStudent) return;
    setLoading(true);
    // Implement assign co-admin logic here
    console.log(`Assigning co-admin: ${selectedStudent}`);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1000);
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
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#399aef] flex items-center justify-center text-white">
              <UserPlus size={14} />
            </div>
            <h3 className="text-xxsm font-black uppercase tracking-widest text-gray-500">
              Assign Co-Administrator
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-200 rounded-xl transition-colors text-gray-400"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, name, or email..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-[#dbe1e6] rounded-2xl text-xsm font-bold focus:outline-none focus:ring-4 focus:ring-[#399aef]/10 focus:border-[#399aef] transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Students List */}
          <div className="max-h-75 overflow-y-auto space-y-2 custom-scrollbar">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <button
                  key={student.id}
                  onClick={() => setSelectedStudent(student.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedStudent === student.id
                      ? "border-[#399aef] bg-[#399aef]/5"
                      : "border-[#dbe1e6] hover:border-[#399aef]/30 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-700">
                        {student.name}
                      </p>
                      <p className="text-xxs text-gray-500 mt-0.5">
                        {student.id}
                      </p>
                      <p className="text-xxs text-gray-400 mt-0.5">
                        {student.email}
                      </p>
                    </div>
                    {selectedStudent === student.id && (
                      <div className="w-6 h-6 rounded-full bg-[#399aef] flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-xsm font-bold text-gray-400">
                  No students found
                </p>
                <p className="text-xxs text-gray-400 mt-1">
                  Try a different search query
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl text-xxs font-black bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              onClick={handleAssign}
              disabled={!selectedStudent || loading}
              className={`flex-1 py-3 rounded-2xl text-xxs font-black transition-all flex items-center justify-center gap-2 uppercase tracking-widest ${
                selectedStudent && !loading
                  ? "bg-[#399aef] text-white hover:bg-[#2d84d1] shadow-lg shadow-blue-100"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <UserPlus size={16} strokeWidth={3} />{" "}
              {loading ? "Assigning..." : "Assign Co-Admin"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AssignCoAdminModal;