"use client";
import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import { useAppSelector } from "@/redux/hooks";
import { AuthRequired } from "@/components/ui/AuthRequired";
import {
  selectProfileUser,
  selectAdminProfile,
  selectIsAdmin,
  selectCanAssignCoAdmin,
  selectCanBlockUser,
  selectCanRemoveCoAdmin,
} from "@/redux/selectors/profile";

// Components
import ProfileHeader from "./_components/ProfileHeader";
import UserSection from "./_components/UserSection";
import SecuritySection from "./_components/SecuritySection";
import UserManagementSection from "./_components/UserManagementSection";
import EditModal from "./_components/EditModal";
import AssignCoAdminModal from "./_components/AssignCoAdminModal";
import ProfileSkeleton from "./_components/ProfileSkeleton";
import MetadataSection from "./_components/MetadataSection";

export interface EditField {
  label: string;
  value: string;
  type?: "text" | "email" | "password";
}

const ProfilePage = () => {
  // const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAuthenticated = true; // Temporary for testing
  const profileUser = useAppSelector(selectProfileUser);
  const adminProfile = useAppSelector(selectAdminProfile);
  const isAdmin = useAppSelector(selectIsAdmin);

  // Permissions
  const canAssignCoAdmin = useAppSelector(selectCanAssignCoAdmin);
  const canBlockUser = useAppSelector(selectCanBlockUser);
  const canRemoveCoAdmin = useAppSelector(selectCanRemoveCoAdmin);

  const [editingField, setEditingField] = useState<EditField | null>(null);
  const [isAssignCoAdminModalOpen, setIsAssignCoAdminModalOpen] =
    useState(false);

  const handleEdit = (
    label: string,
    value: string,
    type: EditField["type"] = "text",
  ) => {
    setEditingField({ label, value, type });
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // TODO: Dispatch logout thunk
  };

  const handleLeaveClassroom = () => {
    console.log("Leaving classroom...");
    // TODO: Dispatch leave classroom thunk
  };

  const handleDeactivateAccount = () => {
    console.log("Deactivating account...");
    // TODO: Dispatch deactivate account thunk
  };

  const handleBlockUser = (userId: string) => {
    console.log("Blocking user:", userId);
    // TODO: Dispatch block user thunk
  };

  const handleUnblockUser = (userId: string) => {
    console.log("Unblocking user:", userId);
    // TODO: Dispatch unblock user thunk
  };

  const handleRemoveCoAdmin = (userId: string) => {
    console.log("Removing co-admin:", userId);
    // TODO: Dispatch remove co-admin thunk
  };

  const handleRemoveMember = (userId: string) => {
    console.log("Removing member:", userId);
    // TODO: Dispatch remove member thunk
  };

  // Loading state
  // if (isAuthenticated && !profileUser) {
  //   return (
  //     <div className="bg-[#f8fafc] min-h-screen flex flex-col font-display antialiased">
  //       <main className="pt-28 flex-1 w-full max-w-3xl mx-auto px-6 py-10">
  //         <ProfileSkeleton type="admin" />
  //       </main>
  //     </div>
  //   );
  // }

  // Not authenticated
  if (!isAuthenticated || !profileUser) {
    return <AuthRequired />;
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col font-display antialiased text-[#111518]">
      <main className="pt-28 flex-1 w-full max-w-3xl mx-auto px-6 py-10 flex flex-col gap-6">
        {/* Header */}
        <ProfileHeader
          user={profileUser}
          isAdmin={isAdmin}
          classroomName={profileUser.currentClassroom.name}
        />

        {/* Section 1: User Information */}
        <UserSection user={profileUser} isAdmin={isAdmin} onEdit={handleEdit} />

        {/* Section 2: Security & Actions */}
        <SecuritySection
          onLogout={handleLogout}
          onLeaveClassroom={handleLeaveClassroom}
          onDeactivateAccount={handleDeactivateAccount}
          isAdmin={isAdmin}
        />

        {/* Section 3: User Management (Admin Only) */}
        {isAdmin && adminProfile && (
          <UserManagementSection
            members={adminProfile.members}
            classroomInfo={adminProfile.classroomInfo}
            canAssignCoAdmin={canAssignCoAdmin}
            canBlockUser={canBlockUser}
            canRemoveCoAdmin={canRemoveCoAdmin}
            onAssignCoAdmin={() => setIsAssignCoAdminModalOpen(true)}
            onBlockUser={handleBlockUser}
            onUnblockUser={handleUnblockUser}
            onRemoveCoAdmin={handleRemoveCoAdmin}
            onRemoveMember={handleRemoveMember}
          />
        )}

        {/* Section 4: Metadata */}
        <MetadataSection
          createdAt={profileUser.createdAt || ""}
          updatedAt={profileUser.updatedAt || ""}
        />

        {/* Modals */}
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
