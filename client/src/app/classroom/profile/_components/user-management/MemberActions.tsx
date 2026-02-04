import {
  MoreHorizontal,
  Ban,
  CheckCircle,
  ShieldAlert,
  UserMinus,
  Settings2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface MemberActionsProps {
  memberId: string;
  memberRole: string;
  isBlocked: boolean;
  canBlockUser: boolean;
  canAssignRole: boolean;
  onBlockUser: (userId: string) => void;
  onUnblockUser: (userId: string) => void;
  onAddCoAdmin: (userId: string) => void;
  onRemoveCoAdmin: (userId: string) => void;
  onRemoveMember: (userId: string) => void;
}

const MemberActions = ({
  memberId,
  memberRole,
  isBlocked,
  canBlockUser,
  canAssignRole,
  onBlockUser,
  onUnblockUser,
  onAddCoAdmin,
  onRemoveCoAdmin,
  onRemoveMember,
}: MemberActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center w-7 h-7 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-all focus:outline-none focus:ring-1 focus:ring-slate-200">
          <MoreHorizontal size={16} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="w-44 p-2.5 bg-white border border-slate-200 shadow-md rounded-xl animate-in fade-in slide-in-from-top-1"
      >
        {/* Header Section */}
        <DropdownMenuLabel className="px-1 py-2 text-xxs! font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Settings2 size={14} />
          Manage Member
        </DropdownMenuLabel>

        <div className="space-y-0.5">
          {canBlockUser && (
            <DropdownMenuItem
              onClick={() =>
                isBlocked ? onUnblockUser(memberId) : onBlockUser(memberId)
              }
              className={`cursor-pointer px-2.5 py-2 flex items-center gap-2 text-xsm! font-medium rounded-md transition-colors ${
                isBlocked
                  ? "text-emerald-600 hover:bg-emerald-100 focus:bg-emerald-50"
                  : "text-slate-600 hover:bg-slate-100! focus:bg-slate-50"
              }`}
            >
              {isBlocked ? <CheckCircle size={14} /> : <Ban size={14} />}
              <span>{isBlocked ? "Unblock" : "Block User"}</span>
            </DropdownMenuItem>
          )}

          {memberRole === "co_admin" && canAssignRole && (
            <DropdownMenuItem
              onClick={() => onRemoveCoAdmin(memberId)}
              className="cursor-pointer px-2.5 py-2 flex items-center gap-2 text-xsm! font-medium text-slate-600 hover:bg-slate-100 focus:bg-slate-50 rounded-md transition-colors"
            >
              <ShieldAlert size={14} />
              <span>Demote Admin</span>
            </DropdownMenuItem>
          )}
        </div>
        {memberRole !== "admin" &&
          memberRole !== "co_admin" &&
          canAssignRole && (
            <DropdownMenuItem
              onClick={() => onAddCoAdmin(memberId)}
              className="cursor-pointer px-2.5 py-2 flex items-center gap-2 text-xsm! font-medium text-slate-600 hover:bg-slate-100 focus:bg-slate-50 rounded-md transition-colors"
            >
              <ShieldAlert size={14} />
              <span>Assign Co-Admin</span>
            </DropdownMenuItem>
          )}

        <DropdownMenuSeparator className="my-0.5 bg-slate-100" />

        {/* Danger Zone Header (Optional but looks pro) */}
        <DropdownMenuItem
          onClick={() => onRemoveMember(memberId)}
          className="cursor-pointer px-2.5 py-2 flex items-center gap-2 text-xsm! font-medium text-red-500 hover:bg-red-100 focus:bg-red-50 rounded-md transition-colors"
        >
          <UserMinus size={14} />
          <span>Remove Member</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MemberActions;
