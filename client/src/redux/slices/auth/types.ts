export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  classrooms: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IAuthState {
  user: IUser | null;
  access_token: string | null;
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
