"use client";

import React from "react";
import { Crown, Shield } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MemberActionMenu from "./MemberActionMenu";

type MemberRole = "admin" | "co_admin" | "member";

type Member = {
  user: {
    _id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
  role: MemberRole;
  isBlocked: boolean;
};

type MemberCardProps = {
  member: Member;
  hasManagementAccess: boolean;
  isAdmin: boolean;
  onAssignCoAdmin: (userId: string) => void;
  onBlockUser: (userId: string) => void;
  onUnblockUser: (userId: string) => void;
  onRemoveCoAdmin: (userId: string) => void;
  onRemoveMember: (userId: string) => void;
};

const MemberCard: React.FC<MemberCardProps> = ({
  member,
  hasManagementAccess,
  isAdmin,
  onAssignCoAdmin,
  onBlockUser,
  onUnblockUser,
  onRemoveCoAdmin,
  onRemoveMember,
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-[#dbe1e6] hover:border-[#399aef]/30 transition-all group">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Avatar */}
        <div className="relative">
          <Avatar
            className={`w-11 h-11 border-2 ${
              member.role === "admin"
                ? "border-blue-200"
                : member.role === "co_admin"
                  ? "border-purple-200"
                  : "border-gray-200"
            }`}
          >
            <AvatarImage src={member.user.avatarUrl} alt={member.user.name} />
            <AvatarFallback
              className={`font-black ${
                member.role === "admin"
                  ? "bg-blue-100 text-blue-700"
                  : member.role === "co_admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-700"
              }`}
            >
              {member.user.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {member.role === "admin" && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white">
              <Crown size={10} className="text-white" />
            </div>
          )}
          {member.role === "co_admin" && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-linear-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center border-2 border-white">
              <Shield size={10} className="text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-xsm font-bold text-gray-800 truncate">
            {member.user.name}
          </p>
          <p className="text-xxs text-gray-500 truncate">{member.user.email}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span
              className={`px-2 py-0.5 rounded-md text-xxxxs font-black uppercase ${
                member.role === "admin"
                  ? "bg-blue-100 text-blue-700"
                  : member.role === "co_admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-700"
              }`}
            >
              {member.role === "admin"
                ? "Admin"
                : member.role === "co_admin"
                  ? "Co-Admin"
                  : "Student"}
            </span>
            {member.isBlocked && hasManagementAccess && (
              <span className="px-2 py-0.5 rounded-md text-xxxxs font-black bg-red-100 text-red-700">
                Blocked
              </span>
            )}
          </div>
        </div>
      </div>

      {hasManagementAccess && member.role !== "admin" && (
        <MemberActionMenu
          member={member}
          isAdmin={isAdmin}
          onAssignCoAdmin={onAssignCoAdmin}
          onBlockUser={onBlockUser}
          onUnblockUser={onUnblockUser}
          onRemoveCoAdmin={onRemoveCoAdmin}
          onRemoveMember={onRemoveMember}
        />
      )}
    </div>
  );
};

export default MemberCard;
