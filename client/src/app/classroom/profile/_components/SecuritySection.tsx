import { Lock, LogOut, UserX, AlertTriangle, Key } from "lucide-react";
import { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import AccountField from "./AccountField";

// Security Section Props
export interface SecuritySectionProps {
  onLogout: () => void;
  onLeaveClassroom: () => void;
  onDeactivateAccount: () => void;
  isAdmin: boolean;
}

const SecuritySection = ({
  onLogout,
  onLeaveClassroom,
  onDeactivateAccount,
  isAdmin,
}: SecuritySectionProps) => {
  const [dialogState, setDialogState] = useState<{
    type: 'logout' | 'leave' | 'deactivate' | null;
    loading: boolean;
  }>({ type: null, loading: false });

  const handleAction = async (action: () => void) => {
    setDialogState(prev => ({ ...prev, loading: true }));
    await action();
    setDialogState({ type: null, loading: false });
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
            value="••••••••••"
            icon={Key}
            isPassword
            onEdit={(label, value) => console.log('Change password')}
          />

          {/* Logout */}
          <div className="px-4 py-4">
            <button
              onClick={() => setDialogState({ type: 'logout', loading: false })}
              className="group w-full px-2 transition-all flex items-center gap-3 cursor-pointer"
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

          {/* Leave Classroom */}
          {!isAdmin && (
            <div className="px-4 py-4">
              <button
                onClick={() => setDialogState({ type: 'leave', loading: false })}
                className="group w-full px-2 transition-all flex items-center gap-3 cursor-pointer"
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

          {/* Deactivate Account */}
          <div className="px-4 py-4">
            <button
              onClick={() => setDialogState({ type: 'deactivate', loading: false })}
              className="group w-full px-2 transition-all flex items-center gap-3 cursor-pointer"
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
        isOpen={dialogState.type === 'logout'}
        loading={dialogState.loading}
        onClose={() => setDialogState({ type: null, loading: false })}
        variant="warning"
        title="Confirm Logout"
        description="Are you sure you want to log out from your account?"
        confirmText="Yes, Logout"
        onConfirm={() => handleAction(onLogout)}
      />

      <Dialog
        isOpen={dialogState.type === 'leave'}
        loading={dialogState.loading}
        onClose={() => setDialogState({ type: null, loading: false })}
        variant="warning"
        title="Leave Classroom"
        description="Are you sure you want to leave this classroom? You'll need a join code to rejoin."
        confirmText="Yes, Leave"
        onConfirm={() => handleAction(onLeaveClassroom)}
      />

      <Dialog
        isOpen={dialogState.type === 'deactivate'}
        loading={dialogState.loading}
        onClose={() => setDialogState({ type: null, loading: false })}
        variant="danger"
        title="Deactivate Account"
        description="This action is permanent and cannot be undone. All your data will be permanently deleted."
        confirmText="Yes, Delete Forever"
        onConfirm={() => handleAction(onDeactivateAccount)}
      />
    </>
  );
};

export default SecuritySection;