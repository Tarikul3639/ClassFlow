export enum ClassroomRole {
  ADMIN = 'admin',
  CO_ADMIN = 'co_admin',
  MEMBER = 'member',
}

export interface IClassroomMember {
  userId: {
    _id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
  role: ClassroomRole;
  joinedAt: string;
}

export interface IClassroom {
  _id: string;
  name: string;
  description?: string;
  
  // Academic info
  institute?: string;
  department?: string;
  intake?: string;
  section?: string;
  
  // Join code
  joinCode: string;
  isJoinCodeActive: boolean;
  
  // Creator
  createdBy: {
    _id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
  
  // Members
  members: IClassroomMember[];
  totalMembers: number;
  totalAdmins: number;
  
  // Settings
  isActive: boolean;
  isArchived: boolean;
  
  // Metadata
  coverImage?: string;
  
  // User-specific fields (added by backend)
  userRole: ClassroomRole;
  isAdmin: boolean;
  
  createdAt: string;
  updatedAt: string;
}

export interface ICreateClassroom {
  name: string;
  description?: string;
  institute?: string;
  department?: string;
  intake?: string;
  section?: string;
  coverImage?: string;
}

export interface IJoinClassroom {
  joinCode: string;
}

export interface IAssignRole {
  userId: string;
  role: ClassroomRole.CO_ADMIN | ClassroomRole.MEMBER;
}