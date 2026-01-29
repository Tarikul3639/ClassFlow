import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi, SignInPayload, SignUpPayload } from "@/lib/api/auth.api";
import { extractErrorMessage } from "@/lib/utils/error.utils";

/**
 * Sign in user
 */
export const signInThunk = createAsyncThunk(
  "auth/sign-in",
  async (data: SignInPayload, { rejectWithValue }) => {
    try {
      return await authApi.signIn(data);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "Sign in failed"));
    }
  },
);

/**
 * Sign up new user
 */
export const signUpThunk = createAsyncThunk(
  "auth/sign-up",
  async (data: SignUpPayload, { rejectWithValue }) => {
    try {
      return await authApi.signUp(data);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "Sign up failed"));
    }
  },
);

/**
 * Get current user profile
 */
export const getProfileThunk = createAsyncThunk(
  "auth/get-profile",
  async (_, { rejectWithValue }) => {
    try {
      return await authApi.getProfile();
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "Failed to fetch profile"),
      );
    }
  },
);
