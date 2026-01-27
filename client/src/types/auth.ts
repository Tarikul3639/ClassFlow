// =====================
// AUTH & USER
// =====================
import { IClassSectionSummary } from "./academic";

/* ---------- Request Status ---------- */
export interface IRequestStatus {
  [key: string]: {
    fetching?: boolean;
    creating?: boolean;
    adding?: boolean;
    deleting?: boolean;
    updating?: boolean;
    error?: string | null;
  };
}

/* ---------- User Roles ---------- */
export type UserRole = "student" | "admin";

/* ---------- Base User ---------- */
export interface IBaseUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

/* ---------- Student ---------- */
export interface IStudentProfile extends IBaseUser {
  role: "student";
  studentId: string;

  // 🔑 reference
  classSectionId: string;

  // UI display only (optional)
  classInfo?: IClassSectionSummary;
}

/* ---------- Admin ---------- */
export interface IAdminProfile extends IBaseUser {
  role: "admin";
  adminId: string;
}

/* ---------- Union ---------- */
export type AuthUser = IStudentProfile | IAdminProfile;

/* ---------- Auth State ---------- */
export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  requestStatus: IRequestStatus;
}

/* ---------- API ---------- */
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}
