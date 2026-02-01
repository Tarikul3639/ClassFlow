import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient, setAuthToken } from "@/lib/api/axios";
import { extractErrorMessage } from "@/lib/utils/error.utils";

export const logoutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await apiClient.post("/auth/logout");

    setAuthToken(null);
    if (typeof window !== "undefined") localStorage.removeItem("access_token");
  } catch (err) {
    return rejectWithValue(extractErrorMessage(err));
  }
});
