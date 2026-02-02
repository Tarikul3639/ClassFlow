"use client";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
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
// import { logoutThunk } from "@/redux/slices/auth/thunks/logoutThunk";
import { leaveClassroomThunk } from "@/redux/slices/classroom/thunks/classroom/leaveClassroomThunk";
import { logout } from "@/redux/slices/auth/slice";
import { classroomId } from "@/redux/selectors/selectors";
import { toast } from "sonner";

export interface EditField {
  label: string;
  value: string;
  type?: "text" | "email" | "password";
}

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  // const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const profileUser = useAppSelector(selectProfileUser);
  const adminProfile = useAppSelector(selectAdminProfile);
  const isAdmin = useAppSelector(selectIsAdmin);
  const classId = useAppSelector(classroomId);
  // Permissions
  const canAssignCoAdmin = useAppSelector(selectCanAssignCoAdmin);
  const canBlockUser = useAppSelector(selectCanBlockUser);
  const canRemoveCoAdmin = useAppSelector(selectCanRemoveCoAdmin);
  const isLeaving = useAppSelector(
    (state) => state.classroom.requestStatus.leaveClassroom.loading,
  );

  const [editingField, setEditingField] = useState<EditField | null>(null);
  const [isAssignCoAdminModalOpen, setIsAssignCoAdminModalOpen] =
    useState(false);

  const refreshing = useAppSelector(
    (state) => state.auth.requestStatus.refresh.loading,
  );

  const isLoading = useAppSelector(
    (state) => state.classroom.requestStatus.fetchClassroom.loading,
  );

  const handleEdit = (
    label: string,
    value: string,
    type: EditField["type"] = "text",
  ) => {
    setEditingField({ label, value, type });
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
  if (isLoading || refreshing || !profileUser) {
    return (
      <div className="bg-[#f8fafc] min-h-screen flex flex-col font-display antialiased">
        <main className="pt-28 flex-1 w-full max-w-3xl mx-auto px-6 py-10">
          <ProfileSkeleton />
        </main>
      </div>
    );
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
        <UserSection user={profileUser} isAdmin={isAdmin} onEdit={handleEdit} classId={classId ?? ""} />

        {/* Section 2: Security & Actions */}
        <SecuritySection
          isAdmin={isAdmin}
          classroomId={classId ?? ""}
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
