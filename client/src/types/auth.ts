// =====================
// AUTH & USER (PRODUCTION READY)
// =====================

import { IClassSectionSummary } from "./academic";

/* =======================
   REQUEST STATUS (GLOBAL)
======================= */

export interface IRequestStatus {
  [key: string]: {
    fetching?: boolean;
    creating?: boolean;
    updating?: boolean;
    deleting?: boolean;
    error?: string | null;
  };
}

/* =======================
   USER ROLES
======================= */

export type UserRole = "student" | "admin" | "co_admin";

/* =======================
   BASE USER
======================= */

export interface IBaseUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

/* =======================
   STUDENT USER
======================= */

export interface IStudentProfile extends IBaseUser {
  role: "student";

  studentId: string;
  department: string;

  // backend reference
  classSectionId: string;

  // frontend display only
  classInfo?: IClassSectionSummary;
}

/* =======================
   ADMIN USER
======================= */

export interface IAdminProfile extends IBaseUser {
  role: "admin";
  adminId: string;
}

/* =======================
   AUTH USER (UNION)
======================= */

export type AuthUser = IStudentProfile | IAdminProfile;

/* =======================
   AUTH STATE (REDUX)
======================= */

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;

  // signIn | signUp | logout | refresh
  requestStatus: IRequestStatus;
}

/* =======================
   AUTH PAYLOADS
======================= */

/* ---------- Sign In ---------- */
export interface SignInPayload {
  email: string;
  password: string;
}

/* ---------- Sign Up (Base) ---------- */
interface IBaseSignUpPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

/* ---------- Student Sign Up ---------- */
export interface StudentSignUpPayload extends IBaseSignUpPayload {
  role: "student";
  studentId: string;
  department: string;
  classSectionId: string;
}

/* ---------- Admin Sign Up ---------- */
export interface AdminSignUpPayload extends IBaseSignUpPayload {
  role: "admin";
  adminId: string;
}

/* ---------- Union ---------- */
export type SignUpPayload =
  | StudentSignUpPayload
  | AdminSignUpPayload;

/* =======================
   AUTH RESPONSE (API)
======================= */

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

// =======================
// SIGN UP FORM STATE
// =======================

export interface SignUpFormState {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  studentId?: string;
  adminId?: string;
  department?: string;
  classSectionId?: string;
}