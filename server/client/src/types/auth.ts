
import { IUserProfile } from "./profile";

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
   AUTH STATE (REDUX)
======================= */

export interface AuthState {
  user: IUserProfile | null;
  token: string | null;
  isAuthenticated: boolean;

  // signIn | signUp | logout | refresh
  requestStatus: IRequestStatus;

  viewMode: "admin" | "student"
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
  user: IUserProfile;
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