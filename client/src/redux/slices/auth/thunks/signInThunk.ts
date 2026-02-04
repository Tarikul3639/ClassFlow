import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "@/redux/slices/auth/types";
import { apiClient, setAuthToken } from "@/lib/api/axios";
import { extractErrorMessage } from "@/lib/utils/error.utils";
import { offlineQueue } from "@/lib/api/offlineQueue";

interface SignInPayload {
  email: string;
  password: string;
}

export const signInThunk = createAsyncThunk<
  { user: IUser; access_token: string; fromCache?: boolean },
  SignInPayload,
  { rejectValue: string }
>("auth/sign-in", async (data, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<{ user: IUser; access_token: string }>(
      "/auth/sign-in",
      data,
    );
    const { user, access_token } = response.data;

    setAuthToken(access_token);
    
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("user_data", JSON.stringify(user));
      
      // Process any queued requests
      offlineQueue.process();
    }

    return { user, access_token };
  } catch (err: any) {
    // If offline, try to use cached credentials
    if (!err.response && err.message === 'Network Error') {
      if (typeof window !== "undefined") {
        const cachedToken = localStorage.getItem("access_token");
        const cachedUser = localStorage.getItem("user_data");
        
        if (cachedToken && cachedUser) {
          setAuthToken(cachedToken);
          return {
            user: JSON.parse(cachedUser),
            access_token: cachedToken,
            fromCache: true,
          };
        }
      }
    }
    
    return rejectWithValue(extractErrorMessage(err));
  }
});