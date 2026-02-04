import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "@/redux/slices/auth/types";
import { apiClient } from "@/lib/api/axios";
import { extractErrorMessage } from "@/lib/utils/error.utils";

interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  user: IUser;
  // Note: access_token is sent via HTTP-only cookie, not in response body
}

export const signUpThunk = createAsyncThunk<
  { user: IUser },
  SignUpPayload,
  { rejectValue: string }
>("auth/sign-up", async (data, { rejectWithValue }) => {
  try {
    console.log('📝 Signing up...');
    
    const response = await apiClient.post<SignUpResponse>(
      "/auth/sign-up",
      data,
    );
    
    const { user } = response.data;
    
    console.log('✅ Sign-up successful, user:', user.email);
    console.log('🍪 Access token stored in HTTP-only cookie');

    // Store user data for offline access
    if (typeof window !== "undefined") {
      localStorage.setItem("user_data", JSON.stringify(user));
    }

    return { user };
  } catch (err: any) {
    console.error('❌ Sign-up error:', err);
    return rejectWithValue(extractErrorMessage(err));
  }
});