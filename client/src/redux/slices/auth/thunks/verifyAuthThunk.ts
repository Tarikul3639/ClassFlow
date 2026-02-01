import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "@/redux/slices/auth/types";
import { apiClient, setAuthToken } from "@/lib/api/axios";
import { extractErrorMessage } from "@/lib/utils/error.utils";

export const verifyAuthThunk = createAsyncThunk<
  IUser,
  void,
  { rejectValue: string }
>("auth/verify", async (_, { rejectWithValue }) => {
  try {
    const access_token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
    if (access_token) setAuthToken(access_token);

    const response = await apiClient.get<{ user: IUser }>("/auth/verify");
    // console.log("verifyAuthThunk response:", response.data);
    return response.data.user;
  } catch (err) {
    setAuthToken(null);
    if (typeof window !== "undefined") localStorage.removeItem("access_token");
    return rejectWithValue(extractErrorMessage(err));
  }
});
