import {
  ClassroomRole,
  IClassroomMember,
} from "@/redux/slices/classroom/types";
import { IUser } from "@/redux/slices/auth/types";

// ==================== Profile Data ====================

// User Profile (Admin or Student)
export interface IBaseUser extends IUser {
  // Classroom context
  currentClassroom: {
    _id: string;
    name: string;
    role: ClassroomRole;
    joinedAt: string;
  };

  // Academic info from classroom
  institute: string;
  department: string;
  intake: string;
  section?: string;
}

// Admin-specific data
export interface IAdminProfile extends IBaseUser {
  // Managed users in current classroom
  members: IClassroomMember[];

  // Classroom info
  classroomInfo: {
    joinCode: string;
    isJoinCodeActive: boolean;
    totalMembers: number;
    totalAdmins: number;
    totalEvents: number;
    totalBlockedMembers: number;
  };
}

// User Management Section Props (Admin only)
export interface UserManagementSectionProps {
  members: IClassroomMember[];
  classroomInfo: IAdminProfile["classroomInfo"];
  canAssignCoAdmin: boolean;
  canBlockUser: boolean;
  canRemoveCoAdmin: boolean;
  onAssignCoAdmin: () => void;
  onBlockUser: (userId: string) => void;
  onUnblockUser: (userId: string) => void;
  onRemoveCoAdmin: (userId: string) => void;
  onRemoveMember: (userId: string) => void;
}
