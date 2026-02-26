import { User, Shield } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MemberActions from "./MemberActions";
import { IClassroomMember } from "@/redux/slices/classroom/types";
import { isMe as isIAm } from "@/redux/selectors/profile";
import { useAppSelector } from "@/redux/hooks";

interface MemberCardProps {
  member: IClassroomMember;
  canBlockUser: boolean;
  canAssignRole: boolean;
  onBlockUser: (userId: string) => void;
  onUnblockUser: (userId: string) => void;
  onAddCoAdmin: (userId: string) => void;
  onRemoveCoAdmin: (userId: string) => void;
  onRemoveMember: (userId: string) => void;
}

const MemberCard = ({
  member,
  canBlockUser,
  canAssignRole,
  onBlockUser,
  onUnblockUser,
  onAddCoAdmin,
  onRemoveCoAdmin,
  onRemoveMember,
}: MemberCardProps) => {
  const isMe = useAppSelector(isIAm(member.user._id));
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-[#dbe1e6] hover:border-[#399aef]/30 transition-all group">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Avatar */}
        <Avatar
          className={`w-11 h-11 border-2 ${
            member.role === "co_admin" ? "border-purple-200" : "border-blue-200"
          }`}
        >
          <AvatarImage src={member.user.avatarUrl} alt={member.user.name} />
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
          <p className="text-xxs text-gray-500 truncate">{member.user.email}</p>
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

      {/* Actions - Don't show for admin role and current user */}
      {member.role !== "admin" && !isMe && (
        <MemberActions
          memberId={member.user._id}
          memberRole={member.role}
          isBlocked={member.isBlocked}
          canBlockUser={canBlockUser}
          canAssignRole={canAssignRole}
          onBlockUser={onBlockUser}
          onUnblockUser={onUnblockUser}
          onAddCoAdmin={onAddCoAdmin}
          onRemoveCoAdmin={onRemoveCoAdmin}
          onRemoveMember={onRemoveMember}
        />
      )}
    </div>
  );
};

export default MemberCard;
