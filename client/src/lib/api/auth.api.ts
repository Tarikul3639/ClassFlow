import { apiClient, setAuthToken } from './axios';
import { IUserProfile } from '@/types/profile';

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

interface AuthResponse {
  access_token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

export const authApi = {
  /**
   * Sign in
   * POST /auth/login
   */
  signIn: async (data: SignInPayload) => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    
    // Set token for future requests
    setAuthToken(response.data.access_token);
    
    return {
      token: response.data.access_token,
      user: response.data.user as IUserProfile,
    };
  },

  /**
   * Sign up
   * POST /auth/register
   */
  signUp: async (data: SignUpPayload) => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    
    setAuthToken(response.data.access_token);
    
    return {
      token: response.data.access_token,
      user: response.data.user as IUserProfile,
    };
  },

  /**
   * Get profile
   * GET /users/me
   */
  getProfile: async () => {
    const response = await apiClient.get<IUserProfile>('/users/me');
    return response.data;
  },

  /**
   * Logout
   */
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      setAuthToken(null);
    }
  },
};