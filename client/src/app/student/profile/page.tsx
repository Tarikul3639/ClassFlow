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
  Shield,
  UserCog,
  Building2,
  Users,
  UserPlus,
  Ban,
  CheckCircle,
  MoreVertical,
  Trash2,
} from "lucide-react";

import ProfileHeader from "./_components/ProfileHeader";
import AccountField from "./_components/AccountField";
import EditModal from "./_components/EditModal";
import AssignCoAdminModal from "./_components/AssignCoAdminModal";
import { IStudentProfile, IAdminProfile } from "@/types/profile";

// Sample Student Data
const StudentData: IStudentProfile = {
  _id: "65a1b2c3d4e5f6a7b8c9d0e1",
  name: "Alex Rivera",
  email: "alex.rivera@edu.university.com",
  role: "student",
  studentId: "ST-2024-089",
  classSectionId: "cs-001",
  department: "Computer Science & Engineering",
  intake: "Spring 2024",
  section: "A-1",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2026-01-20T14:45:00Z",
};

// Sample Admin Data with managed students
const AdminData: IAdminProfile = {
  _id: "65a1b2c3d4e5f6a7b8c9d0e2",
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@edu.university.com",
  role: "admin",
  adminId: "ADM-2023-001",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  permissions: {
    canCreateClassroom: true,
    canAssignAdmin: true,
    canRemoveAdmin: true,
    canManageStudents: true,
    canManageTeachers: true,
    canEditClassContent: true,
  },
  instituteId: "inst-001",
  departmentId: "dept-cse-001",
  managedStudents: [
    {
      studentId: "ST-2024-089",
      blocked: false,
      role: "student",
    },
    {
      studentId: "ST-2024-090",
      blocked: true,
      role: "student",
    },
    {
      studentId: "ADM-2024-005",
      blocked: false,
      role: "co_admin",
    },
  ],
  createdAt: "2023-08-01T09:00:00Z",
  updatedAt: "2026-01-25T11:30:00Z",
};

// --- Main Profile View ---
const ProfilePage = () => {
  const [profileType] = useState<"student" | "admin">("admin");
  const profileData = profileType === "student" ? StudentData : AdminData;

  const [editingField, setEditingField] = useState<null | {
    label: string;
    value: string;
  }>(null);

  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [isAssignCoAdminModalOpen, setIsAssignCoAdminModalOpen] =
    useState(false);

  const handleEdit = (label: string, value: string) => {
    setEditingField({ label, value });
  };

  const toggleDropdown = (studentId: string) => {
    setOpenDropdownId(openDropdownId === studentId ? null : studentId);
  };

  const handleBlockUnblock = (studentId: string, currentStatus: boolean) => {
    console.log(
      `${currentStatus ? "Unblocking" : "Blocking"} user: ${studentId}`
    );
    setOpenDropdownId(null);
  };

  const handleRemoveCoAdmin = (studentId: string) => {
    console.log(`Removing co-admin: ${studentId}`);
    setOpenDropdownId(null);
  };

  const renderStudentProfile = (data: IStudentProfile) => (
    <>
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
            value={data.email}
            icon={Mail}
            onEdit={handleEdit}
          />
          <AccountField
            label="Student ID"
            value={data.studentId}
            icon={Fingerprint}
            onEdit={handleEdit}
          />
          <AccountField
            label="Department"
            value={data.department || "N/A"}
            icon={GraduationCap}
            onEdit={handleEdit}
          />
          <AccountField
            label="Intake"
            value={data.intake || "N/A"}
            icon={LayoutPanelTop}
            onEdit={handleEdit}
          />
          <AccountField
            label="Section"
            value={data.section || "N/A"}
            icon={Album}
            onEdit={handleEdit}
          />
          <AccountField
            label="Class Section ID"
            value={data.classSectionId}
            icon={Building2}
            onEdit={handleEdit}
          />
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-[#dbe1e6] overflow-hidden">
        <div className="p-4 px-6 border-b border-[#dbe1e6] bg-gray-50/20 flex items-center justify-between">
          <h2 className="text-md font-black text-[#111518] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-purple-500 flex items-center justify-center text-white">
              <Lock size={16} />
            </div>
            Security
          </h2>
        </div>

        <div className="divide-y divide-[#dbe1e6]">
          <AccountField
            label="Password"
            value="••••••••••"
            icon={Lock}
            isPassword={true}
            onEdit={handleEdit}
          />
        </div>
      </section>
    </>
  );

  const renderAdminProfile = (data: IAdminProfile) => (
    <>
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
            value={data.email}
            icon={Mail}
            onEdit={handleEdit}
          />
          <AccountField
            label="Admin ID"
            value={data.adminId}
            icon={Fingerprint}
            onEdit={handleEdit}
          />
          <AccountField
            label="Role"
            value={data.role === "admin" ? "Administrator" : "Co-Administrator"}
            icon={Shield}
            onEdit={handleEdit}
          />
          {data.instituteId && (
            <AccountField
              label="Institute ID"
              value={data.instituteId}
              icon={Building2}
              onEdit={handleEdit}
            />
          )}
          {data.departmentId && (
            <AccountField
              label="Department ID"
              value={data.departmentId}
              icon={GraduationCap}
              onEdit={handleEdit}
            />
          )}
        </div>
      </section>

      {/* User Management Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#dbe1e6] overflow-hidden">
        <div className="p-4 px-6 border-b border-[#dbe1e6] bg-gray-50/20 flex items-center justify-between">
          <h2 className="text-md font-black text-[#111518] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-purple-500 flex items-center justify-center text-white">
              <UserCog size={16} />
            </div>
            User Management
          </h2>
          {data.permissions.canAssignAdmin && (
            <button
              onClick={() => setIsAssignCoAdminModalOpen(true)}
              className="px-3 py-2 bg-[#399aef] text-white text-xxs font-black rounded-xl hover:bg-[#2d84d1] transition-all flex items-center gap-2"
            >
              <UserPlus size={14} />
              <span className="hidden sm:inline">Assign Co-Admin</span>
            </button>
          )}
        </div>

        <div className="p-6">
          {data.managedStudents && data.managedStudents.length > 0 ? (
            <div className="space-y-3">
              {data.managedStudents.map((student, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-[#dbe1e6] hover:border-[#399aef]/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        student.role === "co_admin"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {student.role === "co_admin" ? (
                        <Shield size={18} />
                      ) : (
                        <User size={18} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-700">
                        {student.studentId}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`px-2 py-0.5 rounded-lg text-xxxs font-black uppercase ${
                            student.role === "co_admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {student.role === "co_admin"
                            ? "Co-Admin"
                            : "Student"}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-lg text-xxxs font-black ${
                            student.blocked
                              ? "bg-red-100 text-red-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {student.blocked ? "Blocked" : "Active"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Button */}
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(student.studentId)}
                      className="p-2 text-gray-400 hover:text-[#399aef] hover:bg-white rounded-lg transition-all"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {openDropdownId === student.studentId && (
                        <>
                          {/* Backdrop to close dropdown */}
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenDropdownId(null)}
                          />
                          
                          <div className="absolute right-0 top-12 z-20 w-48 bg-white rounded-xl shadow-lg border border-[#dbe1e6] overflow-hidden">
                            {data.permissions.canManageStudents && (
                              <button
                                onClick={() =>
                                  handleBlockUnblock(
                                    student.studentId,
                                    student.blocked
                                  )
                                }
                                className={`w-full px-4 py-3 text-left text-xs font-bold transition-all flex items-center gap-3 ${
                                  student.blocked
                                    ? "text-emerald-700 hover:bg-emerald-50"
                                    : "text-red-700 hover:bg-red-50"
                                }`}
                              >
                                {student.blocked ? (
                                  <>
                                    <CheckCircle size={16} />
                                    <span>Unblock User</span>
                                  </>
                                ) : (
                                  <>
                                    <Ban size={16} />
                                    <span>Block User</span>
                                  </>
                                )}
                              </button>
                            )}

                            {student.role === "co_admin" &&
                              data.permissions.canRemoveAdmin && (
                                <>
                                  <div className="h-px bg-[#dbe1e6]" />
                                  <button
                                    onClick={() =>
                                      handleRemoveCoAdmin(student.studentId)
                                    }
                                    className="w-full px-4 py-3 text-left text-xs font-bold text-orange-700 hover:bg-orange-50 transition-all flex items-center gap-3"
                                  >
                                    <Shield size={16} />
                                    <span>Remove Co-Admin</span>
                                  </button>
                                </>
                              )}

                            {data.permissions.canManageStudents && (
                              <>
                                <div className="h-px bg-[#dbe1e6]" />
                                <button
                                  onClick={() => {
                                    console.log(
                                      `Deleting user: ${student.studentId}`
                                    );
                                    setOpenDropdownId(null);
                                  }}
                                  className="w-full px-4 py-3 text-left text-xs font-bold text-red-600 hover:bg-red-50 transition-all flex items-center gap-3"
                                >
                                  <Trash2 size={16} />
                                  <span>Delete User</span>
                                </button>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Users size={24} className="text-gray-400" />
              </div>
              <p className="text-sm font-bold text-gray-400">
                No managed users yet
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Start by assigning co-admins or managing students
              </p>
            </div>
          )}
        </div>
      </section>

      {data.classSectionIds && data.classSectionIds.length > 0 && (
        <section className="bg-white rounded-2xl shadow-sm border border-[#dbe1e6] overflow-hidden">
          <div className="p-4 px-6 border-b border-[#dbe1e6] bg-gray-50/20 flex items-center justify-between">
            <h2 className="text-md font-black text-[#111518] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-orange-500 flex items-center justify-center text-white">
                <Users size={16} />
              </div>
              Assigned Class Sections
            </h2>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-2">
              {data.classSectionIds.map((sectionId, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold border border-blue-100"
                >
                  {sectionId}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white rounded-2xl shadow-sm border border-[#dbe1e6] overflow-hidden">
        <div className="p-4 px-6 border-b border-[#dbe1e6] bg-gray-50/20 flex items-center justify-between">
          <h2 className="text-md font-black text-[#111518] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-red-500 flex items-center justify-center text-white">
              <Lock size={16} />
            </div>
            Security
          </h2>
        </div>

        <div className="divide-y divide-[#dbe1e6]">
          <AccountField
            label="Password"
            value="••••••••••"
            icon={Lock}
            isPassword={true}
            onEdit={handleEdit}
          />
        </div>
      </section>
    </>
  );

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col font-display antialiased text-[#111518]">
      <main className="pt-28 flex-1 w-full max-w-3xl mx-auto px-6 py-10 flex flex-col gap-6">
        <ProfileHeader data={profileData} />

        {profileData.role === "student"
          ? renderStudentProfile(profileData as IStudentProfile)
          : renderAdminProfile(profileData as IAdminProfile)}

        <div className="flex flex-row justify-end items-center gap-3">
          <button className="px-4 py-2.5 text-xxs font-black text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest rounded-xl hover:border-red-100 border border-transparent flex items-center gap-2">
            Deactivate
          </button>
          <button className="px-5 py-2.5 text-[11px] font-black bg-[#399aef]/10 text-[#399aef] rounded-xl transition-all flex items-center gap-2">
            <ShieldCheck size={14} />
            Security Settings
          </button>
        </div>

        {/* Metadata Section */}
        <div className="bg-gray-50 rounded-xl p-4 border border-[#dbe1e6]">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xxs font-black text-gray-400 uppercase tracking-widest mb-1">
                Created At
              </p>
              <p className="text-xs font-bold text-gray-600">
                {new Date(profileData.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xxs font-black text-gray-400 uppercase tracking-widest mb-1">
                Last Updated
              </p>
              <p className="text-xs font-bold text-gray-600">
                {new Date(profileData.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Logic with Animation Support */}
        <AnimatePresence>
          {editingField && (
            <EditModal
              field={editingField}
              onClose={() => setEditingField(null)}
            />
          )}
          {isAssignCoAdminModalOpen && (
            <AssignCoAdminModal
              isOpen={isAssignCoAdminModalOpen}
              onClose={() => setIsAssignCoAdminModalOpen(false)}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ProfilePage;