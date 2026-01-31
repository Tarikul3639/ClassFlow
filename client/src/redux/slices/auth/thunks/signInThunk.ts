import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "@/redux/slices/auth/types";
import { apiClient, setAuthToken } from "@/lib/api/axios";

interface SignInPayload {
  email: string;
  password: string;
}

export const signInThunk = createAsyncThunk<
  { user: IUser; access_token: string },
  SignInPayload,
  { rejectValue: string }
>("auth/sign-in", async (data, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<{ user: IUser; access_token: string }>(
      "/auth/sign-in",
      data,
    );
    const { user, access_token } = response.data;

    // console.log({user, access_token});

    setAuthToken(access_token);
    if (typeof window !== "undefined") localStorage.setItem("access_token", access_token);

    return { user, access_token };
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : "Failed to sign in",
    );
  }
});
