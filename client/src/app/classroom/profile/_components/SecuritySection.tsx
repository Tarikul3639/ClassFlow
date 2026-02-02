import { Lock, LogOut, UserX, AlertTriangle, Key, Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import AccountField from "./AccountField";
import { logout } from "@/redux/slices/auth/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { leaveClassroomThunk } from "@/redux/slices/classroom/thunks/classroom/leaveClassroomThunk";
import { logoutThunk } from "@/redux/slices/auth/thunks/logoutThunk";
import { deactivateAccountThunk } from "@/redux/slices/auth/thunks/deactivateAccountThunk";
import { deleteClassroomThunk } from "@/redux/slices/classroom/thunks/classroom/deleteClassroomThunk";
import { toast } from "sonner";

// Security Section Props
export interface SecuritySectionProps {
  classroomId?: string;
  isAdmin: boolean;
}

const SecuritySection = ({ classroomId, isAdmin }: SecuritySectionProps) => {
  const dispatch = useAppDispatch();

  // Dialog state
  const [dialogState, setDialogState] = useState<{
    type: "logout" | "leave" | "deactivate" | "delete" | null;
    loading: boolean;
  }>({ type: null, loading: false });

  // Loading states
  const isLeaveLoading = useAppSelector(
    (state) => state.classroom.requestStatus.leaveClassroom.loading,
  );
  const isDeleteLoading = useAppSelector(
    (state) => state.classroom.requestStatus.deleteClassroom?.loading || false,
  );
  const isDeactivateLoading = useAppSelector(
    (state) => state.auth.requestStatus.deactivateAccount?.loading || false,
  );
  const isLogoutLoading = useAppSelector(
    (state) => state.auth.requestStatus.logout?.loading || false,
  );

  // Handle logout
  const handleLogout = async () => {
    setDialogState({ type: "logout", loading: true });
    toast.loading("Logging out...", { id: "logout" });
    try {
      await dispatch(logoutThunk()).unwrap();
      dispatch(logout());
      localStorage.removeItem("access_token");
      toast.success("Logged out successfully!", { id: "logout" });
      setDialogState({ type: null, loading: false });
    } catch (error: any) {
      console.error("Logout failed:", error);
      toast.error(error || "Failed to logout. Please try again.", { id: "logout" });
      setDialogState({ type: null, loading: false });
    }
  };

  // Handle leave classroom
  const handleLeaveClassroom = async () => {
    if (!classroomId) return;

    setDialogState({ type: "leave", loading: true });
    toast.loading("Leaving classroom...", { id: "leave-classroom" });
    try {
      await dispatch(leaveClassroomThunk({ classroomId })).unwrap();
      toast.success("Successfully left the classroom!", { id: "leave-classroom" });
      setDialogState({ type: null, loading: false });
      // Optionally redirect to dashboard
    } catch (error: any) {
      console.error("Leave classroom failed:", error);
      toast.error(error || "Failed to leave classroom. Please try again.", { id: "leave-classroom" });
      setDialogState({ type: null, loading: false });
    }
  };

  // Handle delete classroom
  const handleDeleteClassroom = async () => {
    if (!classroomId) return;

    setDialogState({ type: "delete", loading: true });
    toast.loading("Deleting classroom...", { id: "delete-classroom" });
    try {
      await dispatch(deleteClassroomThunk({ classroomId })).unwrap();
      toast.success("Classroom deleted successfully!", { id: "delete-classroom" });
      setDialogState({ type: null, loading: false });
      // Optionally redirect to dashboard
    } catch (error: any) {
      console.error("Delete classroom failed:", error);
      toast.error(error || "Failed to delete classroom. Please try again.", { id: "delete-classroom" });
      setDialogState({ type: null, loading: false });
    }
  };

  // Handle deactivate account
  const handleDeactivateAccount = async () => {
    setDialogState({ type: "deactivate", loading: true });
    toast.loading("Deactivating account...", { id: "deactivate-account" });
    try {
      await dispatch(deactivateAccountThunk()).unwrap();
      dispatch(logout());
      localStorage.removeItem("access_token");
      toast.success("Account deactivated successfully!", { id: "deactivate-account" });
      setDialogState({ type: null, loading: false });
    } catch (error: any) {
      console.error("Deactivate account failed:", error);
      toast.error(error || "Failed to deactivate account. Please try again.", { id: "deactivate-account" });
      setDialogState({ type: null, loading: false });
    }
  };

  return (
    <>
      <section className="bg-white rounded-2xl shadow-sm border border-[#dbe1e6] overflow-hidden">
        {/* Header */}
        <div className="p-4 px-6 border-b border-[#dbe1e6] bg-gray-50/20 flex items-center justify-between">
          <h2 className="text-md font-black text-[#111518] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-red-500 flex items-center justify-center text-white">
              <Lock size={16} />
            </div>
            Security & Actions
          </h2>
        </div>

        <div className="divide-y divide-[#dbe1e6]">
          {/* Change Password */}
          <AccountField
            label="Password"
            value="********"
            icon={Key}
            isPassword
            onEdit={(label, value) => console.log("Change password")}
          />

          {/* Leave Classroom */}
          {!isAdmin && classroomId && (
            <div className="px-4 py-4">
              <button
                onClick={() => setDialogState({ type: "leave", loading: false })}
                disabled={isLeaveLoading}
                className="group w-full px-2 transition-all flex items-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-8 h-8 rounded-lg group-hover:bg-blue-100 flex items-center justify-center text-blue-600 transition-colors">
                  <UserX size={16} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xxsm font-black text-blue-700 group-hover:text-blue-800 transition-colors">
                    Leave Classroom
                  </p>
                  <p className="text-xxxs text-blue-600">
                    Exit from current classroom
                  </p>
                </div>
              </button>
            </div>
          )}

          {/* Logout */}
          <div className="px-4 py-4">
            <button
              onClick={() => setDialogState({ type: "logout", loading: false })}
              disabled={isLogoutLoading}
              className="group w-full px-2 transition-all flex items-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-8 h-8 rounded-lg group-hover:bg-orange-100 flex items-center justify-center text-orange-600 transition-colors">
                <LogOut size={16} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-xxsm font-black text-orange-700 group-hover:text-orange-800 transition-colors">
                  Log Out
                </p>
                <p className="text-xxxs text-orange-600">
                  Sign out from your account
                </p>
              </div>
            </button>
          </div>

          {/* Delete Classroom */}
          {isAdmin && classroomId && (
            <div className="px-4 py-4">
              <button
                onClick={() => setDialogState({ type: "delete", loading: false })}
                disabled={isDeleteLoading}
                className="group w-full px-2 transition-all flex items-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-8 h-8 rounded-lg group-hover:bg-red-100 flex items-center justify-center text-red-600 transition-colors">
                  <Trash2 size={16} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xxsm font-black text-red-700 group-hover:text-red-800 transition-colors">
                    Delete Classroom
                  </p>
                  <p className="text-xxxs text-red-600">
                    Permanently delete this classroom
                  </p>
                </div>
              </button>
            </div>
          )}

          {/* Deactivate Account */}
          <div className="px-4 py-4">
            <button
              onClick={() => setDialogState({ type: "deactivate", loading: false })}
              disabled={isDeactivateLoading}
              className="group w-full px-2 transition-all flex items-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-8 h-8 rounded-lg group-hover:bg-red-100 flex items-center justify-center text-red-600 transition-colors">
                <AlertTriangle size={16} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-xxsm font-black text-red-700 group-hover:text-red-800 transition-colors">
                  Deactivate Account
                </p>
                <p className="text-xxxs text-red-600">
                  Permanently delete your account
                </p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Dialogs */}
      <Dialog
        isOpen={dialogState.type === "logout"}
        loading={dialogState.loading}
        onClose={() => setDialogState({ type: null, loading: false })}
        variant="warning"
        title="Confirm Logout"
        description="Are you sure you want to log out from your account?"
        confirmText="Yes, Logout"
        onConfirm={handleLogout}
      />

      <Dialog
        isOpen={dialogState.type === "leave"}
        loading={dialogState.loading}
        onClose={() => setDialogState({ type: null, loading: false })}
        variant="warning"
        title="Leave Classroom"
        description="Are you sure you want to leave this classroom? You'll need a join code to rejoin."
        confirmText="Yes, Leave"
        onConfirm={handleLeaveClassroom}
      />

      <Dialog
        isOpen={dialogState.type === "delete"}
        loading={dialogState.loading}
        onClose={() => setDialogState({ type: null, loading: false })}
        variant="danger"
        title="Delete Classroom"
        description="This action is permanent and cannot be undone. All classroom data will be permanently deleted."
        confirmText="Yes, Delete Forever"
        onConfirm={handleDeleteClassroom}
      />

      <Dialog
        isOpen={dialogState.type === "deactivate"}
        loading={dialogState.loading}
        onClose={() => setDialogState({ type: null, loading: false })}
        variant="danger"
        title="Deactivate Account"
        description="This action is permanent and cannot be undone. All your data will be permanently deleted."
        confirmText="Yes, Delete Forever"
        onConfirm={handleDeactivateAccount}
      />
    </>
  );
};

export default SecuritySection;