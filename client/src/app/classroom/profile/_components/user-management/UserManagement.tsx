import { UserCog, UserPlus } from "lucide-react";
import { UserManagementSectionProps } from "@/types/profile";
import OverView from "./OverView";
import JoinCodeCard from "./JoinCodeCard";
import MembersList from "./MembersList";

const UserManagementSection = ({
  members,
  classroomInfo,
  canAssignCoAdmin,
  canBlockUser,
  canAssignRole,
  onAssignCoAdmin,
  onBlockUser,
  onUnblockUser,
  onAddCoAdmin,
  onRemoveCoAdmin,
  onRemoveMember,
}: UserManagementSectionProps) => {
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
      </div>

      <div className="p-6 space-y-6">
        {/* Classroom Stats */}
        <OverView
          totalMembers={classroomInfo.totalMembers}
          totalAdmins={classroomInfo.totalAdmins}
          totalBlockedMembers={classroomInfo.totalBlockedMembers}
        />

        {/* Join Code */}
        <JoinCodeCard joinCode={classroomInfo.joinCode} />

        {/* Members List */}
        <MembersList
          members={members}
          canBlockUser={canBlockUser}
          canAssignRole={canAssignRole}
          onBlockUser={onBlockUser}
          onUnblockUser={onUnblockUser}
          onRemoveCoAdmin={onRemoveCoAdmin}
          onRemoveMember={onRemoveMember}
          onAddCoAdmin={onAddCoAdmin}
        />
      </div>
    </section>
  );
};

export default UserManagementSection;
