import { UserRole } from "./auth";
import { IClassSectionSummary } from "./academic";

/* =======================
   BASE USER
======================= */

export interface IBaseProfile {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

/* =======================
   STUDENT USER
======================= */

export interface IStudentProfile extends IBaseProfile {
  role: "student";

  studentId: string; // backend reference
  classSectionId: string; // reference to ClassSection

  // optional frontend display
  classInfo?: IClassSectionSummary;

  department?: string;
  intake?: string;
  section?: string;
  
  // Additional profile fields
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  guardianName?: string;
  guardianPhone?: string;
  bloodGroup?: string;
  enrollmentDate?: string;

  createdAt: string;
  updatedAt: string;
}

/* =======================
   ADMIN USER
======================= */

export interface IAdminProfile extends IBaseProfile {
  role: "admin" | "co_admin";
  adminId: string;

  // optional: scope restriction for co_admin
  instituteId?: string;
  departmentId?: string;
  classSectionIds?: string[];

  // permissions control
  permissions: {
    canCreateClassroom: boolean;        // create classrooms
    canAssignAdmin: boolean;            // assign co_admin
    canRemoveAdmin: boolean;            // remove co_admin
    canManageStudents: boolean;         // block/unblock, edit student profile
    canManageTeachers: boolean;         // manage teacher profiles
    canEditClassContent: boolean;       // edit class content
  };

  // optional: user management logs (for frontend convenience)
  managedStudents?: {
    studentId: string;
    blocked: boolean;
    role: "student" | "co_admin";
  }[];
  
  // Additional admin fields
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;

  createdAt: string;
  updatedAt: string;
}

/* =======================
   UNION TYPE
======================= */

export type IUserProfile = IStudentProfile | IAdminProfile;