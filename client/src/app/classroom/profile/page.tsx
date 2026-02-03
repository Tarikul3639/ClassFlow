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
import UserManagementSection from "./_components/user-management/UserManagement";
import EditModal from "./_components/EditModal";
import AssignCoAdminModal from "./_components/AssignCoAdminModal";
import ProfileSkeleton from "./_components/ProfileSkeleton";
import MetadataSection from "./_components/MetadataSection";
import { logout } from "@/redux/slices/auth/slice";
import { classroomId } from "@/redux/selectors/selectors";
import { toast } from "sonner";
import { logoutThunk } from "@/redux/slices/auth/thunks/logoutThunk";
import { leaveClassroomThunk } from "@/redux/slices/classroom/thunks/classroom/leaveClassroomThunk";
import { deactivateAccountThunk } from "@/redux/slices/auth/thunks/deactivateAccountThunk";
import { deleteClassroomThunk } from "@/redux/slices/classroom/thunks/classroom/deleteClassroomThunk";

export interface EditField {
  label: string;
  value: string;
  type?: "text" | "email" | "password";
}

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const profileUser = useAppSelector(selectProfileUser);
  const adminProfile = useAppSelector(selectAdminProfile);
  const isAdmin = useAppSelector(selectIsAdmin);
  const classId = useAppSelector(classroomId);
  
  // Permissions
  const canAssignCoAdmin = useAppSelector(selectCanAssignCoAdmin);
  const canBlockUser = useAppSelector(selectCanBlockUser);
  const canRemoveCoAdmin = useAppSelector(selectCanRemoveCoAdmin);

  const [editingField, setEditingField] = useState<EditField | null>(null);
  const [isAssignCoAdminModalOpen, setIsAssignCoAdminModalOpen] = useState(false);

  const refreshing = useAppSelector(
    (state) => state.auth.requestStatus.refresh.loading,
  );

  const isLoading = useAppSelector(
    (state) => state.classroom.requestStatus.fetchClassroom.loading,
  );

  // ==================== Security Actions ====================

  // Handle logout
  const handleLogout = async () => {
    toast.loading("Logging out...", { id: "logout" });
    try {
      await dispatch(logoutThunk()).unwrap();
      dispatch(logout());
      localStorage.removeItem("access_token");
      toast.success("Logged out successfully!", { id: "logout" });
    } catch (error: any) {
      console.error("Logout failed:", error);
      toast.error(error || "Failed to logout. Please try again.", { id: "logout" });
    }
  };

  // Handle leave classroom
  const handleLeaveClassroom = async () => {
    if (!classId) return;

    toast.loading("Leaving classroom...", { id: "leave-classroom" });
    try {
      await dispatch(leaveClassroomThunk({ classroomId: classId })).unwrap();
      toast.success("Successfully left the classroom!", { id: "leave-classroom" });
      // Optionally redirect to dashboard
    } catch (error: any) {
      console.error("Leave classroom failed:", error);
      toast.error(error || "Failed to leave classroom. Please try again.", { id: "leave-classroom" });
    }
  };

  // Handle delete classroom
  const handleDeleteClassroom = async () => {
    if (!classId) return;

    toast.loading("Deleting classroom...", { id: "delete-classroom" });
    try {
      await dispatch(deleteClassroomThunk({ classroomId: classId })).unwrap();
      toast.success("Classroom deleted successfully!", { id: "delete-classroom" });
      // Optionally redirect to dashboard
    } catch (error: any) {
      console.error("Delete classroom failed:", error);
      toast.error(error || "Failed to delete classroom. Please try again.", { id: "delete-classroom" });
    }
  };

  // Handle deactivate account
  const handleDeactivateAccount = async () => {
    toast.loading("Deactivating account...", { id: "deactivate-account" });
    try {
      await dispatch(deactivateAccountThunk()).unwrap();
      dispatch(logout());
      localStorage.removeItem("access_token");
      toast.success("Account deactivated successfully!", { id: "deactivate-account" });
    } catch (error: any) {
      console.error("Deactivate account failed:", error);
      toast.error(error || "Failed to deactivate account. Please try again.", { id: "deactivate-account" });
    }
  };

  // Handle change password
  const handleChangePassword = () => {
    console.log("Change password clicked");
    // TODO: Implement password change logic
  };

  // ==================== User Management Actions ====================

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
        <UserSection 
          user={profileUser} 
          isAdmin={isAdmin} 
          onEdit={handleEdit} 
          classId={classId ?? ""} 
        />

        {/* Section 2: Security & Actions */}
        <SecuritySection
          isAdmin={isAdmin}
          classroomId={classId ?? ""}
          onLogout={handleLogout}
          onLeaveClassroom={handleLeaveClassroom}
          onDeleteClassroom={handleDeleteClassroom}
          onDeactivateAccount={handleDeactivateAccount}
          onChangePassword={handleChangePassword}
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