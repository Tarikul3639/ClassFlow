import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "@/redux/slices/auth/types";
import { apiClient, setAuthToken } from "@/lib/api/axios";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const signUpThunk = createAsyncThunk<
  { user: IUser; token: string },
  RegisterPayload,
  { rejectValue: string }
>("auth/sign-up", async (data, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<{ user: IUser; token: string }>(
      "/auth/sign-up",
      data,
    );
    const { user, token } = response.data;

    setAuthToken(token);
    if (typeof window !== "undefined") localStorage.setItem("token", token);

    return { user, token };
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : "Failed to sign up",
    );
  }
});
