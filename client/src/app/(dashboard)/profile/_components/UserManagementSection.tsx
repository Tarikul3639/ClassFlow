"use client";
import { useState } from "react";
import {
  UserCog,
  UserPlus,
  Users,
  User,
  Shield,
  Ban,
  CheckCircle,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { IAdminProfile } from "@/types/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserManagementSectionProps {
  data: IAdminProfile;
  onAssignCoAdmin: () => void;
}

const UserManagementSection = ({
  data,
  onAssignCoAdmin,
}: UserManagementSectionProps) => {
  const handleBlockUnblock = (userId: string, currentStatus: boolean) => {
    console.log(`${currentStatus ? "Unblocking" : "Blocking"} user: ${userId}`);
  };

  const handleRemoveCoAdmin = (userId: string) => {
    console.log(`Removing co-admin: ${userId}`);
  };

  const handleDeleteUser = (userId: string) => {
    console.log(`Deleting user: ${userId}`);
  };

  return (
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
            onClick={onAssignCoAdmin}
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
            {data.managedStudents.map((user) => (
              <div
                key={user._id}
                className="relative flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-[#dbe1e6] hover:border-[#399aef]/30 transition-all group"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Avatar using Shadcn */}
                  <div className="relative shrink-0">
                    <Avatar
                      className={`w-12 h-12 border-2 ${
                        user.role === "co_admin"
                          ? "border-purple-200"
                          : "border-blue-200"
                      }`}
                    >
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback
                        className={`${
                          user.role === "co_admin"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {user.role === "co_admin" ? (
                          <Shield size={20} />
                        ) : (
                          <User size={20} />
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xsm font-bold text-gray-800 truncate">
                      {user.name}
                    </p>
                    <p className="text-xxs text-gray-500 truncate">
                      {user.email}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span
                        className={`px-2 py-0.5 rounded-lg text-xxxxs font-black uppercase ${
                          user.role === "co_admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role === "co_admin" ? "Co-Admin" : "Student"}
                      </span>
                      <span className="text-xxxs text-gray-400">•</span>
                      <span className="text-xxxxs font-bold text-gray-600">
                        {user.role === "co_admin"
                          ? user.adminId
                          : user.studentId}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-lg text-xxxxs font-black ${
                          user.blocked
                            ? "bg-red-100 text-red-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {user.blocked ? "Blocked" : "Active"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dropdown Menu using Shadcn */}
                <div className="relative shrink-0 ml-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 text-gray-400 hover:text-[#399aef] hover:bg-white rounded transition-all focus:outline-none focus:ring-2 focus:ring-[#399aef]/30">
                        <MoreVertical size={18} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 bg-white rounded-lg shadow-lg border border-[#dbe1e6] p-0"
                    >
                      {data.permissions.canManageStudents && (
                        <DropdownMenuItem
                          onClick={() =>
                            handleBlockUnblock(user._id, user.blocked)
                          }
                          className={`px-4 py-3 text-xs font-bold transition-all flex items-center gap-3 cursor-pointer ${
                            user.blocked
                              ? "text-emerald-700 hover:bg-emerald-50 focus:bg-emerald-50"
                              : "text-red-700 hover:bg-red-50 focus:bg-red-50"
                          }`}
                        >
                          {user.blocked ? (
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
                        </DropdownMenuItem>
                      )}

                      {user.role === "co_admin" &&
                        data.permissions.canRemoveAdmin && (
                          <>
                            <DropdownMenuSeparator className="bg-[#dbe1e6]" />
                            <DropdownMenuItem
                              onClick={() => handleRemoveCoAdmin(user._id)}
                              className="px-4 py-3 text-xs font-bold text-orange-700 hover:bg-orange-50 focus:bg-orange-50 transition-all flex items-center gap-3 cursor-pointer"
                            >
                              <Shield size={16} />
                              <span>Remove Co-Admin</span>
                            </DropdownMenuItem>
                          </>
                        )}

                      {data.permissions.canManageStudents && (
                        <>
                          <DropdownMenuSeparator className="bg-[#dbe1e6]" />
                          <DropdownMenuItem
                            onClick={() => handleDeleteUser(user._id)}
                            className="px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-50 focus:bg-red-50 transition-all flex items-center gap-3 cursor-pointer"
                          >
                            <Trash2 size={16} />
                            <span>Delete User</span>
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
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
  );
};

export default UserManagementSection;
