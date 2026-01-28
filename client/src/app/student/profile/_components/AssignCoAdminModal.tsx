"use client";
import React, { useState } from "react";
import { X, UserPlus, Search, Check, User } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AssignCoAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Student {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  studentId?: string;
  adminId?: string;
  blocked: boolean;
  role: "student" | "co_admin";
}

// Sample students data - Replace with actual data from your backend
const sampleStudents: Student[] = [
  {
    _id: "75b2c3d4e5f6a7b8c9d0e1f2",
    name: "Alex Rivera",
    email: "alex.rivera@edu.university.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    studentId: "ST-2024-089",
    blocked: false,
    role: "student",
  },
  {
    _id: "85c3d4e5f6a7b8c9d0e1f203",
    name: "Mia Chen",
    email: "mia.chen@edu.university.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
    studentId: "ST-2024-090",
    blocked: true,
    role: "student",
  },
  {
    _id: "95d4e5f6a7b8c9d0e1f203a",
    name: "Liam Smith",
    email: "liam.smith@edu.university.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
    adminId: "ADM-2024-005",
    blocked: false,
    role: "co_admin",
  },
];

const AssignCoAdminModal = ({ isOpen, onClose }: AssignCoAdminModalProps) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const filteredStudents = sampleStudents.filter((student) => {
    const searchLower = searchQuery.toLowerCase();
    const studentIdMatch = student.studentId?.toLowerCase().includes(searchLower);
    const adminIdMatch = student.adminId?.toLowerCase().includes(searchLower);
    const nameMatch = student.name.toLowerCase().includes(searchLower);
    const emailMatch = student.email.toLowerCase().includes(searchLower);
    
    return studentIdMatch || adminIdMatch || nameMatch || emailMatch;
  });

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
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#399aef] flex items-center justify-center text-white">
              <UserPlus size={13} />
            </div>
            <h3 className="text-xxxs font-black uppercase tracking-widest text-gray-500">
              Assign Co-Administrator
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-200 rounded-xl transition-colors text-gray-400"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, name, or email..."
              className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-[#dbe1e6] rounded-xl text-xxs font-bold focus:outline-none focus:ring-4 focus:ring-[#399aef]/10 focus:border-[#399aef] transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Students List */}
          <div className="max-h-75 overflow-y-auto space-y-2 custom-scrollbar">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <button
                  key={student._id}
                  onClick={() => setSelectedStudent(student._id)}
                  disabled={student.blocked || student.role === "co_admin"}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                    selectedStudent === student._id
                      ? "border-[#399aef] bg-[#399aef]/5"
                      : student.blocked || student.role === "co_admin"
                      ? "border-[#dbe1e6] bg-gray-100 opacity-60 cursor-not-allowed"
                      : "border-[#dbe1e6] hover:border-[#399aef]/30 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Avatar */}
                      <Avatar className="w-10 h-10 border-2 border-blue-200">
                        <AvatarImage src={student.avatarUrl} alt={student.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          <User size={16} />
                        </AvatarFallback>
                      </Avatar>

                      {/* Student Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xxs font-bold text-gray-700 truncate">
                            {student.name}
                          </p>
                          {student.blocked && (
                            <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xxxxs font-black">
                              BLOCKED
                            </span>
                          )}
                          {student.role === "co_admin" && (
                            <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-xxxxs font-black">
                              CO-ADMIN
                            </span>
                          )}
                        </div>
                        <p className="text-xxxs text-gray-500 truncate">
                          {student.role === "co_admin"
                            ? student.adminId
                            : student.studentId}
                        </p>
                        <p className="text-xxxs text-gray-400 truncate">
                          {student.email}
                        </p>
                      </div>
                    </div>

                    {/* Check Icon */}
                    {selectedStudent === student._id && (
                      <div className="w-5 h-5 rounded-full bg-[#399aef] flex items-center justify-center shrink-0">
                        <Check
                          size={12}
                          className="text-white"
                          strokeWidth={3}
                        />
                      </div>
                    )}
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-xxs font-bold text-gray-400">
                  No students found
                </p>
                <p className="text-xxxs text-gray-400 mt-1">
                  Try a different search query
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-xxxs font-black bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              onClick={handleAssign}
              disabled={!selectedStudent || loading}
              className={`flex-1 py-2.5 rounded-xl text-xxxs font-black transition-all flex items-center justify-center gap-2 uppercase tracking-widest ${
                selectedStudent && !loading
                  ? "bg-[#399aef] text-white hover:bg-[#2d84d1] shadow-lg shadow-blue-100"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <UserPlus size={14} strokeWidth={3} />
              {loading ? "Assigning..." : "Assign Co-Admin"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AssignCoAdminModal;