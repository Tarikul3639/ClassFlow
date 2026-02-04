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
  selectCanAssignRole,
} from "@/redux/selectors/profile";

// Components
import ProfileHeader from "./_components/ProfileHeader";
import UserSection from "./_components/UserSection";
import SecuritySection from "./_components/security/SecuritySection";
import UserManagementSection from "./_components/user-management/UserManagement";
import EditModal from "./_components/EditModal";
import PasswordEditModal from "./_components/security/PasswordEditModal";
import ProfileSkeleton from "./_components/ProfileSkeleton";
import MetadataSection from "./_components/MetadataSection";
import { logout } from "@/redux/slices/auth/slice";
import { classroomId } from "@/redux/selectors/selectors";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Thunks
import {
  logoutThunk,
  changePasswordThunk,
  deactivateAccountThunk,
} from "@/redux/slices/auth/thunks/index";
import {
  leaveClassroomThunk,
  deleteClassroomThunk,
} from "@/redux/slices/classroom/thunks/classroom";
import {
  removeMemberThunk,
  assignRoleThunk,
  blockUserThunk,
  unblockUserThunk,
} from "@/redux/slices/classroom/thunks/classroom/member";

import { extractErrorMessage } from "@/lib/utils/error.utils";

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
  const router = useRouter();

  // Permissions
  const canAssignCoAdmin = useAppSelector(selectCanAssignCoAdmin);
  const canBlockUser = useAppSelector(selectCanBlockUser);
  const canAssignRole = useAppSelector(selectCanAssignRole);

  const [editingField, setEditingField] = useState<EditField | null>(null);
  const [isAssignCoAdminModalOpen, setIsAssignCoAdminModalOpen] =
    useState(false);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);

  const refreshing = useAppSelector(
    (state) => state.auth.requestStatus.refresh.loading,
  );

  const isLoading = useAppSelector(
    (state) => state.classroom.requestStatus.fetchClassroom.loading,
  );
  const error = useAppSelector(
    (state) => state.auth.requestStatus.changePassword?.error,
  );

  // ==================== Security Actions ====================

  // Handle logout
  const handleLogout = async () => {
    const logoutPromise = dispatch(logoutThunk()).unwrap();
    try {
      await logoutPromise;
      toast.promise(logoutPromise, {
        loading: "Logging out...",
        success: "Logged out successfully!",
        error: (err) => extractErrorMessage(err) || "Failed to logout",
      });
      dispatch(logout());
      localStorage.removeItem("access_token");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(extractErrorMessage(error) || "Failed to logout", {});
    }
  };

  // Handle leave classroom
  const handleLeaveClassroom = async () => {
    if (!classId) throw new Error("Classroom ID is missing");
    const leavePromise = dispatch(
      leaveClassroomThunk({ classroomId: classId }),
    ).unwrap();
    try {
      await leavePromise;
      toast.promise(leavePromise, {
        loading: "Leaving classroom...",
        success: "Successfully left the classroom!",
        error: (err) => extractErrorMessage(err) || "Failed to leave classroom",
      });
      router.push("/");
    } catch (error) {
      console.error("Leave classroom failed:", error);
      toast.error(
        extractErrorMessage(error) || "Failed to leave classroom",
        {},
      );
    }
  };

  // Handle delete classroom
  const handleDeleteClassroom = async () => {
    if (!classId) throw new Error("Classroom ID is missing");
    const deletePromise = dispatch(
      deleteClassroomThunk({ classroomId: classId }),
    ).unwrap();
    try {
      await deletePromise;
      toast.promise(deletePromise, {
        loading: "Deleting classroom...",
        success: "Classroom deleted successfully!",
        error: (err) =>
          extractErrorMessage(err) || "Failed to delete classroom",
      });
      router.push("/");
    } catch (error) {
      console.error("Delete classroom failed:", error);
      toast.error(
        extractErrorMessage(error) || "Failed to delete classroom",
        {},
      );
    }
  };

  // Handle deactivate account
  const handleDeactivateAccount = async () => {
    const deactivatePromise = dispatch(deactivateAccountThunk()).unwrap();
    try {
      await deactivatePromise;
      toast.promise(deactivatePromise, {
        loading: "Deactivating account...",
        success: "Account deactivated successfully!",
        error: (err) =>
          extractErrorMessage(err) || "Failed to deactivate account",
      });
      router.push("/");
    } catch (error) {
      console.error("Deactivate account failed:", error);
      toast.error(
        extractErrorMessage(error) || "Failed to deactivate account",
        {},
      );
    }
  };

  // Handle change password
  const handleSavePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    console.log("Changing password...");
    // TODO: Dispatch change password thunk
    toast.loading("Changing password...", { id: "change-password" });
    try {
      await dispatch(
        changePasswordThunk({ currentPassword, newPassword }),
      ).unwrap();
      toast.success("Password changed successfully!", {
        id: "change-password",
      });
      setIsPasswordChangeModalOpen(false);
    } catch (error: any) {
      console.error("Change password failed:", error);
      toast.error(error || "Failed to change password.", {
        id: "change-password",
      });
    }
  };

  // ==================== User Management Actions ====================

  const handleEdit = (
    label: string,
    value: string,
    type: EditField["type"] = "text",
  ) => {
    setEditingField({ label, value, type });
  };

  const handleBlockUser = async (userId: string) => {
    const blockPromise = dispatch(
      blockUserThunk({ classroomId: classId ?? "", userId }),
    ).unwrap();
    try {
      await blockPromise;
      toast.promise(blockPromise, {
        loading: "Blocking user...",
        success: "User blocked successfully!",
        error: (err) => extractErrorMessage(err) || "Failed to block user",
      });
    } catch (error) {
      console.error("Block user failed:", error);
      toast.error(extractErrorMessage(error) || "Failed to block user", {});
    }
  };

  const handleUnblockUser = async (userId: string) => {
    console.log("Unblocking user:", userId);
    const unblockPromise = dispatch(
      unblockUserThunk({ classroomId: classId ?? "", userId }),
    ).unwrap();
    try {
      await unblockPromise;
      toast.promise(unblockPromise, {
        loading: "Unblocking user...",
        success: "User unblocked successfully!",
        error: (err) => extractErrorMessage(err) || "Failed to unblock user",
      });
    } catch (error) {
      console.error("Unblock user failed:", error);
      toast.error(extractErrorMessage(error) || "Failed to unblock user", {});
    }
  };

  const handleRemoveCoAdmin = async (userId: string) => {
    const removePromise = dispatch(
      assignRoleThunk({ classroomId: classId ?? "", userId, role: "member" }),
    ).unwrap();
    try {
      await removePromise;
      toast.promise(removePromise, {
        loading: "Removing Co-Admin...",
        success: "Co-Admin removed successfully!",
        error: (err) => extractErrorMessage(err) || "Failed to remove Co-Admin",
      });
    } catch (error) {
      console.error("Remove Co-Admin failed:", error);
      toast.error(
        extractErrorMessage(error) || "Failed to remove Co-Admin",
        {},
      );
    }
  };

  const handleAddCoAdmin = async (userId: string) => {
    const addPromise = dispatch(
      assignRoleThunk({ classroomId: classId ?? "", userId, role: "co_admin" }),
    ).unwrap();
    try {
      await addPromise;
      toast.promise(addPromise, {
        loading: "Adding Co-Admin...",
        success: "Co-Admin added successfully!",
        error: (err) => extractErrorMessage(err) || "Failed to add Co-Admin",
      });
    } catch (error) {
      console.error("Add Co-Admin failed:", error);
      toast.error(extractErrorMessage(error) || "Failed to add Co-Admin", {});
    }
  };

  const handleRemoveMember = async (userId: string) => {
    // 1. Ekta unique promise define kora hocche
    const removePromise = dispatch(
      removeMemberThunk({ classroomId: classId ?? "", memberId: userId }),
    ).unwrap();

    // 2. Toast.promise diye Loading, Success ebong Error eksathe handle kora
    toast.promise(removePromise, {
      loading: "Removing member from classroom...",
      success: (data) => {
        return data.message || "Member removed successfully!";
      },
      error: (err) => {
        return extractErrorMessage(err) || "Failed to remove member";
      },
    });

    try {
      await removePromise;
    } catch (error) {
      console.error("Remove member failed:", error);
      toast.error(extractErrorMessage(error) || "Failed to remove member", {});
    }
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
      <main className="pt-28 flex-1 w-full max-w-3xl mx-auto p-3.5   sm:px-6 py-10 flex flex-col gap-6">
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
          onChangePassword={() => setIsPasswordChangeModalOpen(true)}
        />

        {/* Section 3: User Management (Admin Only) */}
        {isAdmin && adminProfile && (
          <UserManagementSection
            members={adminProfile.members}
            classroomInfo={adminProfile.classroomInfo}
            canAssignCoAdmin={canAssignCoAdmin}
            canBlockUser={canBlockUser}
            canAssignRole={canAssignRole}
            onAssignCoAdmin={() => setIsAssignCoAdminModalOpen(true)}
            onBlockUser={handleBlockUser}
            onUnblockUser={handleUnblockUser}
            onAddCoAdmin={handleAddCoAdmin}
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

          {isPasswordChangeModalOpen && (
            <PasswordEditModal
              isOpen={isPasswordChangeModalOpen}
              onClose={() => setIsPasswordChangeModalOpen(false)}
              onSave={handleSavePassword}
              error={error}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ProfilePage;
