import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "@/redux/slices/auth/types";
import { apiClient, setAuthToken } from "@/lib/api/axios";

export const verifyAuthThunk = createAsyncThunk<
  IUser,
  void,
  { rejectValue: string }
>("auth/verify", async (_, { rejectWithValue }) => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) setAuthToken(token);

    const response = await apiClient.get<{ user: IUser }>("/auth/verify");
    return response.data.user;
  } catch (err) {
    setAuthToken(null);
    if (typeof window !== "undefined") localStorage.removeItem("token");
    return rejectWithValue(
      err instanceof Error ? err.message : "Auth verification failed",
    );
  }
});
