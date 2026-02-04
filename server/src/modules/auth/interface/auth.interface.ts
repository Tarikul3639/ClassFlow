export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  classrooms: string[];
  avatarUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  access_token: string;
  user: AuthUser;
}
