// src/store/auth/auth.thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginPayload } from "@/types/auth";
import { fakeSignInApi, fakeSignUpApi } from "../fakeAuthApi";

export const signInThunk = createAsyncThunk(
  "auth/sign-in",
  async (data: LoginPayload, { rejectWithValue }) => {
    try {
      const res = await fakeSignInApi(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || "Sign in failed");
    }
  }
);

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  role: "student" | "admin";
  studentId?: string;
  classSectionId?: string;
}

export const signUpThunk = createAsyncThunk(
  "auth/sign-up",
  async (data: SignUpPayload, { rejectWithValue }) => {
    try {
      const res = await fakeSignUpApi(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || "Sign up failed");
    }
  }
);
