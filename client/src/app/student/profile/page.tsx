"use client";
import React, { useState } from "react";
import { AnimatePresence } from "motion/react";

import ProfileHeader from "./_components/ProfileHeader";
import StudentAccountSection from "./_components/StudentAccountSection";
import StudentSecuritySection from "./_components/StudentSecuritySection";
import AdminAccountSection from "./_components/AdminAccountSection";
import UserManagementSection from "./_components/UserManagementSection";
import ClassSectionsSection from "./_components/ClassSectionsSection";
import AdminSecuritySection from "./_components/AdminSecuritySection";
import MetadataSection from "./_components/MetadataSection";
import ProfileActions from "./_components/ProfileActions";
import EditModal from "./_components/EditModal";
import AssignCoAdminModal from "./_components/AssignCoAdminModal";
import ProfileSkeleton from "./_components/ProfileSkeleton";
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
  ],
  createdAt: "2023-08-01T09:00:00Z",
  updatedAt: "2026-01-25T11:30:00Z",
};

// --- Main Profile View ---
const ProfilePage = () => {
  const [profileType] = useState<"student" | "admin">("admin");
  const [isLoading, setIsLoading] = useState(false); // Change to true to see skeleton
  const profileData = profileType === "student" ? StudentData : AdminData;

  const [editingField, setEditingField] = useState<null | {
    label: string;
    value: string;
  }>(null);

  const [isAssignCoAdminModalOpen, setIsAssignCoAdminModalOpen] =
    useState(false);

  const handleEdit = (label: string, value: string) => {
    setEditingField({ label, value });
  };

  if (!isLoading) {
    return (
      <div className="bg-[#f8fafc] min-h-screen flex flex-col font-display antialiased text-[#111518]">
        <main className="pt-28 flex-1 w-full max-w-3xl mx-auto px-6 py-10 flex flex-col gap-6">
          <ProfileSkeleton type={profileType} />
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col font-display antialiased text-[#111518]">
      <main className="pt-28 flex-1 w-full max-w-3xl mx-auto px-6 py-10 flex flex-col gap-6">
        <ProfileHeader data={profileData} />

        {profileData.role === "student" ? (
          <>
            <StudentAccountSection
              data={profileData as IStudentProfile}
              onEdit={handleEdit}
            />
            <StudentSecuritySection onEdit={handleEdit} />
          </>
        ) : (
          <>
            <AdminAccountSection
              data={profileData as IAdminProfile}
              onEdit={handleEdit}
            />

            <UserManagementSection
              data={profileData as IAdminProfile}
              onAssignCoAdmin={() => setIsAssignCoAdminModalOpen(true)}
            />
            {(profileData as IAdminProfile).classSectionIds &&
              (profileData as IAdminProfile).classSectionIds!.length > 0 && (
                <ClassSectionsSection
                  classSectionIds={
                    (profileData as IAdminProfile).classSectionIds!
                  }
                />
              )}
            <AdminSecuritySection onEdit={handleEdit} />
          </>
        )}

        <ProfileActions />
        <MetadataSection
          createdAt={profileData.createdAt}
          updatedAt={profileData.updatedAt}
        />

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