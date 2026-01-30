import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "@/redux/slices/auth/types";
import { apiClient, setAuthToken } from "@/lib/api/axios";

interface LoginPayload {
  email: string;
  password: string;
}

export const loginThunk = createAsyncThunk<
  { user: IUser; token: string },
  LoginPayload,
  { rejectValue: string }
>("auth/sign-in", async (data, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<{ user: IUser; token: string }>(
      "/auth/sign-in",
      data,
    );
    const { user, token } = response.data;

    setAuthToken(token);
    if (typeof window !== "undefined") localStorage.setItem("token", token);

    return { user, token };
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : "Failed to sign in",
    );
  }
});
