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
import { useAppSelector } from "@/redux/hooks";
import { AuthRequired } from "@/components/ui/AuthRequired";
import { isAdmin as selectIsAdmin, classroomId, classroomName } from "@/redux/selectors/selectors";
import { UserRole } from "@/redux/slices/auth/types";
import { IClassroom } from "@/redux/slices/classroom/types";

// --- Main Profile View ---
const ProfilePage = () => {
  const isAdmin = useAppSelector(selectIsAdmin);
  const classId = useAppSelector(classroomId);
  const className = useAppSelector(classroomName);

  const { user, isAuthenticated, requestStatus } = useAppSelector(
    (state) => state.auth,
  );

  const [editingField, setEditingField] = useState<null | {
    label: string;
    value: string;
  }>(null);

  const [isAssignCoAdminModalOpen, setIsAssignCoAdminModalOpen] =
    useState(false);

  const handleEdit = (label: string, value: string) => {
    setEditingField({ label, value });
  };

  if (requestStatus.signIn.loading) {
    return (
      <div className="bg-[#f8fafc] min-h-screen flex flex-col font-display antialiased text-[#111518]">
        <main className="pt-28 flex-1 w-full max-w-3xl mx-auto px-6 py-10 flex flex-col gap-6">
          <ProfileSkeleton type={isAdmin ? UserRole.ADMIN : UserRole.STUDENT} />
        </main>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <AuthRequired />;
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col font-display antialiased text-[#111518]">
      <main className="pt-28 flex-1 w-full max-w-3xl mx-auto px-6 py-10 flex flex-col gap-6">
        <ProfileHeader user={user} isAdmin={isAdmin} className={className ?? undefined} />
        {!isAdmin && (
          <>
            <StudentAccountSection data={user} onEdit={handleEdit} />
            <StudentSecuritySection onEdit={handleEdit} />
          </>
        )}
        {isAdmin && (
          <>
            <AdminAccountSection data={user} onEdit={handleEdit} />

            <UserManagementSection
              data={user}
              onAssignCoAdmin={() => setIsAssignCoAdminModalOpen(true)}
            />

            {classId && (
              <ClassSectionsSection classId={classId} />
            )}

            <AdminSecuritySection onEdit={handleEdit} />
          </>
        )}

        <ProfileActions />
        <MetadataSection
          createdAt={user.createdAt}
          updatedAt={user.updatedAt}
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
