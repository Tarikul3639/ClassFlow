import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "@/redux/slices/auth/types";
import { apiClient } from "@/lib/api/axios";
import { extractErrorMessage } from "@/lib/utils/error.utils";
import { offlineQueue } from "@/lib/api/offlineQueue";

interface SignInPayload {
  email: string;
  password: string;
}

interface SignInResponse {
  user: IUser;
  // Note: access_token is sent via HTTP-only cookie, not in response body
}

export const signInThunk = createAsyncThunk<
  { user: IUser; fromCache?: boolean },
  SignInPayload,
  { rejectValue: string }
>("auth/sign-in", async (data, { rejectWithValue }) => {
  try {
    console.log('🔐 Signing in...');
    
    const response = await apiClient.post<SignInResponse>(
      "/auth/sign-in",
      data,
    );
    
    const { user } = response.data;
    
    console.log('✅ Sign-in successful, user:', user.email);
    console.log('🍪 Access token stored in HTTP-only cookie');

    // Store user data for offline access (but NOT the token)
    if (typeof window !== "undefined") {
      localStorage.setItem("user_data", JSON.stringify(user));
      
      // Process any queued offline requests
      offlineQueue.process();
    }

    return { user };
  } catch (err: any) {
    console.error('❌ Sign-in error:', err);
    
    // If offline, try to use cached user data
    if (!err.response && (err.message === 'Network Error' || err.code === 'ERR_NETWORK')) {
      console.log('📴 Offline mode - checking for cached credentials');
      
      if (typeof window !== "undefined") {
        const cachedUser = localStorage.getItem("user_data");
        
        if (cachedUser) {
          console.log('✅ Using cached user data');
          return {
            user: JSON.parse(cachedUser),
            fromCache: true,
          };
        }
      }
    }
    
    return rejectWithValue(extractErrorMessage(err));
  }
});