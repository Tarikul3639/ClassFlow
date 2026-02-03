import MemberCard from "./MemberCard";
import EmptyMembers from "./EmptyMembers";
import { IClassroomMember } from "@/redux/slices/classroom/types";

interface MembersListProps {
  members: IClassroomMember[];
  canBlockUser: boolean;
  canRemoveCoAdmin: boolean;
  onBlockUser: (userId: string) => void;
  onUnblockUser: (userId: string) => void;
  onRemoveCoAdmin: (userId: string) => void;
  onRemoveMember: (userId: string) => void;
}

const MembersList = ({
  members,
  canBlockUser,
  canRemoveCoAdmin,
  onBlockUser,
  onUnblockUser,
  onRemoveCoAdmin,
  onRemoveMember,
}: MembersListProps) => {
  return (
    <div>
      <h3 className="text-xxs font-black text-gray-500 uppercase tracking-wider mb-3">
        Classroom Members ({members.length})
      </h3>

      {members.length > 0 ? (
        <div className="space-y-2">
          {members.map((member) => (
            <MemberCard
              key={member.user._id}
              member={member}
              canBlockUser={canBlockUser}
              canRemoveCoAdmin={canRemoveCoAdmin}
              onBlockUser={onBlockUser}
              onUnblockUser={onUnblockUser}
              onRemoveCoAdmin={onRemoveCoAdmin}
              onRemoveMember={onRemoveMember}
            />
          ))}
        </div>
      ) : (
        <EmptyMembers />
      )}
    </div>
  );
};

export default MembersList;
