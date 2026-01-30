export enum UserRole {
  STUDENT = "student",
  ADMIN = "admin",
  CO_ADMIN = "co_admin",
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role?: UserRole; // TODO: Will be removed later
  avatarUrl?: string;
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  requestStatus: {
    signIn: { loading: boolean; error: string | null };
    signUp: { loading: boolean; error: string | null };
    logout: { loading: boolean; error: string | null };
    refresh: { loading: boolean; error: string | null };
  };
}
