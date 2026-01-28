"use client";
import { Lock, LogOut } from "lucide-react";
import AccountField from "./AccountField";
import { Dialog } from "@/components/ui/Dialog";
import { useState } from "react";

interface AdminSecuritySectionProps {
  onEdit: (label: string, value: string) => void;
}

const AdminSecuritySection = ({ onEdit }: AdminSecuritySectionProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    console.log("Logging out...");
    // Example: Clear auth tokens, redirect to login, etc.
    setIsDialogOpen(false);
    setIsLoading(false);
  };

  return (
    <>
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
            onEdit={onEdit}
          />

          {/* Logout Section */}
          <div className="px-4 py-4">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="group w-full px-2 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg group-hover:bg-red-100 flex items-center justify-center text-red-600 transition-colors">
                <LogOut
                  size={16}
                  className="group-hover:transform group-hover:translate-x-0.5 transition-all duration-300"
                />
              </div>
              <div className="flex-1 text-left">
                <p className="text-xxsm font-black text-red-700 group-hover:text-red-800 transition-colors">
                  Log Out
                </p>
                <p className="text-xxxs text-red-600">
                  Sign out from your account
                </p>
              </div>
            </button>
          </div>
        </div>
      </section>
      <Dialog
        isOpen={isDialogOpen}
        loading={isLoading}
        onClose={() => setIsDialogOpen(false)}
        variant="danger"
        title="Confirm Logout"
        description="Are you sure you want to log out?"
        onConfirm={handleLogout}
      />
    </>
  );
};

export default AdminSecuritySection;
