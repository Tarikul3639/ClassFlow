// ==================== Enums ====================
export enum ClassroomRole {
  ADMIN = 'admin',
  CO_ADMIN = 'co_admin',
  MEMBER = 'member',
}

export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
}

// ==================== Base User ====================
export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// ==================== Classroom Member ====================
export interface IClassroomMember {
  user: IUser;
  role: ClassroomRole;
  isBlocked: boolean;
  blockedBy?: string;
  blockedAt?: string;
  joinedAt: string;
}

// ==================== Classroom ====================
export interface IClassroom {
  _id: string;
  name: string;
  description?: string;
  institute: string;
  department: string;
  intake: string;
  section?: string;
  joinCode?: string; // Only visible to admins
  isJoinCodeActive: boolean;
  createdBy: string;
  members: IClassroomMember[];
  isActive: boolean;
  isArchived: boolean;
  coverImage?: string;
  totalMembers: number;
  totalEvents: number;
  myRole?: ClassroomRole; // Current user's role
  createdAt: string;
  updatedAt: string;
}

// ==================== Profile Data ====================

// User Profile (Admin or Student)
export interface IUserProfile extends IUser {
  // Classroom context
  currentClassroom: {
    id: string;
    name: string;
    role: ClassroomRole;
    isAdmin: boolean; // Computed from role
    joinedAt: string;
  };
  
  // Academic info from classroom
  institute: string;
  department: string;
  intake: string;
  section?: string;
}

// Admin-specific data
export interface IAdminProfile extends IUserProfile {
  // Managed users in current classroom
  managedMembers: {
    _id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    role: ClassroomRole;
    isBlocked: boolean;
    blockedBy?: string;
    blockedAt?: string;
    joinedAt: string;
  }[];
  
  // Classroom info
  classroomInfo: {
    joinCode: string;
    isJoinCodeActive: boolean;
    totalMembers: number;
    totalAdmins: number;
    totalBlockedMembers: number;
  };
}

// Student-specific data
export interface IStudentProfile extends IUserProfile {
  // No additional fields for now
}

// ==================== UI Component Props ====================

// User Section Props
export interface UserSectionProps {
  user: IUserProfile;
  isAdmin: boolean;
  onEdit: (field: string, value: string) => void;
}

// Security Section Props
export interface SecuritySectionProps {
  onLogout: () => void;
  onLeaveClassroom: () => void;
  onDeactivateAccount: () => void;
  isAdmin: boolean;
}

// User Management Section Props (Admin only)
export interface UserManagementSectionProps {
  members: IAdminProfile['managedMembers'];
  classroomInfo: IAdminProfile['classroomInfo'];
  canAssignCoAdmin: boolean;
  canBlockUser: boolean;
  canRemoveCoAdmin: boolean;
  onAssignCoAdmin: () => void;
  onBlockUser: (userId: string) => void;
  onUnblockUser: (userId: string) => void;
  onRemoveCoAdmin: (userId: string) => void;
  onRemoveMember: (userId: string) => void;
}

// Edit Field
export interface EditField {
  label: string;
  value: string;
  type?: 'text' | 'email' | 'password';
}