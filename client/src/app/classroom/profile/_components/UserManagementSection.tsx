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
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";
import { UserManagementSectionProps } from "@/types/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const UserManagementSection = ({
  members,
  classroomInfo,
  canAssignCoAdmin,
  canBlockUser,
  canRemoveCoAdmin,
  onAssignCoAdmin,
  onBlockUser,
  onUnblockUser,
  onRemoveCoAdmin,
  onRemoveMember,
}: UserManagementSectionProps) => {
  const [copiedJoinCode, setCopiedJoinCode] = useState(false);

  const copyJoinCode = () => {
    navigator.clipboard.writeText(classroomInfo.joinCode);
    setCopiedJoinCode(true);
    toast.success("Join code copied to clipboard!");
    setTimeout(() => setCopiedJoinCode(false), 2000);
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-[#dbe1e6] overflow-hidden">
      {/* Header */}
      <div className="p-4 px-6 border-b border-[#dbe1e6] bg-gray-50/20 flex items-center justify-between">
        <h2 className="text-md font-black text-[#111518] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-purple-500 flex items-center justify-center text-white">
            <UserCog size={16} />
          </div>
          User Management
        </h2>
        {canAssignCoAdmin && (
          <button
            onClick={onAssignCoAdmin}
            className="px-3 py-2 bg-[#399aef] text-white text-xxs font-black rounded-xl hover:bg-[#2d84d1] transition-all flex items-center gap-2"
          >
            <UserPlus size={14} />
            <span className="hidden sm:inline">Assign Co-Admin</span>
          </button>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Classroom Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xxxxs font-black text-blue-600 uppercase tracking-wider">
              Total Members
            </p>
            <p className="text-xl font-black text-blue-700 mt-1">
              {classroomInfo.totalMembers}
            </p>
          </div>
          <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
            <p className="text-xxxxs font-black text-purple-600 uppercase tracking-wider">
              Admins
            </p>
            <p className="text-xl font-black text-purple-700 mt-1">
              {classroomInfo.totalAdmins}
            </p>
          </div>
          <div className="p-3 bg-red-50 rounded-xl border border-red-100">
            <p className="text-xxxxs font-black text-red-600 uppercase tracking-wider">
              Blocked
            </p>
            <p className="text-xl font-black text-red-700 mt-1">
              {classroomInfo.totalBlockedMembers}
            </p>
          </div>
        </div>

        {/* Join Code */}
        <div className="p-4 bg-linear-to-r from-[#399aef]/5 to-purple-500/5 rounded-xl border border-[#399aef]/20">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <p className="text-xxxs font-black text-gray-500 uppercase tracking-wider mb-1">
                Classroom Join Code
              </p>
              <p className="text-lg font-black text-[#399aef] tracking-[0.3em]">
                {classroomInfo.joinCode}
              </p>
            </div>
            <button
              onClick={copyJoinCode}
              className="p-3 bg-white hover:bg-[#399aef]/10 rounded-xl border border-[#399aef]/20 transition-all"
            >
              {copiedJoinCode ? (
                <Check size={18} className="text-green-600" />
              ) : (
                <Copy size={18} className="text-[#399aef]" />
              )}
            </button>
          </div>
        </div>

        {/* Members List */}
        <div>
          <h3 className="text-xxs font-black text-gray-500 uppercase tracking-wider mb-3">
            Classroom Members ({members.length})
          </h3>

          {members.length > 0 ? (
            <div className="space-y-2">
              {members.map((member) => (
                <div
                  key={member.user._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-[#dbe1e6] hover:border-[#399aef]/30 transition-all group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Avatar */}
                    <Avatar
                      className={`w-11 h-11 border-2 ${
                        member.role === "co_admin"
                          ? "border-purple-200"
                          : "border-blue-200"
                      }`}
                    >
                      <AvatarImage
                        src={member.user.avatarUrl}
                        alt={member.user.name}
                      />
                      <AvatarFallback
                        className={`${
                          member.role === "co_admin"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {member.role === "co_admin" ? (
                          <Shield size={18} />
                        ) : (
                          <User size={18} />
                        )}
                      </AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xsm font-bold text-gray-800 truncate">
                        {member.user.name}
                      </p>
                      <p className="text-xxs text-gray-500 truncate">
                        {member.user.email}
                      </p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span
                          className={`px-2 py-0.5 rounded-md text-xxxxs font-black uppercase ${
                            member.role === "co_admin"
                              ? "bg-purple-100 text-purple-700"
                              : member.role === "admin"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {member.role === "co_admin"
                            ? "Co-Admin"
                            : member.role === "admin"
                            ? "Admin"
                            : "Student"}
                        </span>
                        {member.isBlocked && (
                          <span className="px-2 py-0.5 rounded-md text-xxxxs font-black bg-red-100 text-red-700">
                            Blocked
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions - Don't show for admin role */}
                  {member.role !== "admin" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 text-gray-400 hover:text-[#399aef] hover:bg-white rounded-lg transition-all">
                          <MoreVertical size={18} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44 bg-white">
                        {canBlockUser && (
                          <DropdownMenuItem
                            onClick={() =>
                              member.isBlocked
                                ? onUnblockUser(member.user._id)
                                : onBlockUser(member.user._id)
                            }
                            className={
                              member.isBlocked
                                ? "text-green-700"
                                : "text-red-700"
                            }
                          >
                            {member.isBlocked ? (
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

                        {member.role === "co_admin" && canRemoveCoAdmin && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => onRemoveCoAdmin(member.user._id)}
                              className="text-orange-700"
                            >
                              <Shield size={16} />
                              <span>Remove Co-Admin</span>
                            </DropdownMenuItem>
                          </>
                        )}

                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onRemoveMember(member.user._id)}
                          className="text-red-600"
                        >
                          <Trash2 size={16} />
                          <span>Remove Member</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Users size={24} className="text-gray-400" />
              </div>
              <p className="text-sm font-bold text-gray-400">No members yet</p>
              <p className="text-xs text-gray-400 mt-1">
                Share the join code to invite students
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserManagementSection;