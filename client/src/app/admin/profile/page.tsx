"use client";
import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import {
  User,
  Mail,
  Fingerprint,
  Lock,
  ShieldCheck,
  GraduationCap,
  LayoutPanelTop,
  Album,
} from "lucide-react";

import ProfileHeader from "./_components/ProfileHeader";
import AccountField from "./_components/AccountField";
import EditModal from "./_components/EditModal";
import { IStudentProfile } from "@/types/profile";

const StudentData: IStudentProfile = {
  _id: "65a1b2c3d4e5f6a7b8c9d0e1", // MongoDB standard ObjectId format
  name: "Alex Rivera",
  email: "alex.rivera@edu.university.com",
  studentId: "ST-2024-089",
  department: "Computer Science & Engineering",
  intake: "Spring 2024",
  section: "A-1",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  password: "password123",
};

// --- Main Student Profile View ---

const StudentProfile = () => {
  const [editingField, setEditingField] = useState<null | {
    label: string;
    value: string;
  }>(null);
  const handleEdit = (label: string, value: string) => {
    setEditingField({ label, value });
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col font-display antialiased text-[#111518]">
      <main className="pt-28 flex-1 w-full max-w-3xl mx-auto px-6 py-10 flex flex-col gap-6">
        <ProfileHeader data={StudentData} />

        <section className="bg-white rounded-2xl shadow-sm border border-[#dbe1e6] overflow-hidden">
          <div className="p-4 px-6 border-b border-[#dbe1e6] bg-gray-50/20 flex items-center justify-between">
            <h2 className="text-md font-black text-[#111518] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-[#399aef] flex items-center justify-center text-white">
                <User size={16} />
              </div>
              Account Information
            </h2>
          </div>

          <div className="divide-y divide-[#dbe1e6]">
            <AccountField
              label="Email Address"
              value={StudentData.email}
              icon={Mail}
              onEdit={handleEdit}
            />
            <AccountField
              label="Student ID"
              value={StudentData.studentId}
              icon={Fingerprint}
              onEdit={handleEdit}
            />
            <AccountField
              label="Department"
              value={StudentData.department}
              icon={GraduationCap}
              onEdit={handleEdit}
            />
            <AccountField
              label="Intake"
              value={StudentData.intake}
              icon={LayoutPanelTop}
              onEdit={handleEdit}
            />
            <AccountField
              label="Section"
              value={StudentData.section}
              icon={Album}
              onEdit={handleEdit}
            />
            <AccountField
              label="Password"
              value={StudentData.password}
              icon={Lock}
              isPassword={true}
              onEdit={handleEdit}
            />
          </div>
        </section>

        <div className="flex flex-row justify-end items-center gap-3">
          <button className="px-4 py-2.5 text-xxs font-black text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest rounded-xl hover:border-red-100 border border-transparent flex items-center gap-2">
            Deactivate
          </button>
          <button className="px-5 py-2.5 text-[11px] font-black bg-[#399aef]/10 text-[#399aef] rounded-xl transition-all flex items-center gap-2">
            <ShieldCheck size={14} />
            Security Settings
          </button>
        </div>

        {/* 5. Modal Logic with Animation Support */}
        <AnimatePresence>
          {editingField && (
            <EditModal
              field={editingField}
              onClose={() => setEditingField(null)}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default StudentProfile;
