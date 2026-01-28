// src/store/auth/auth.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/types/auth";
import { signInThunk, signUpThunk } from "./thunks//auth.thunks";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  requestStatus: {},
  viewMode: "student",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.viewMode = "student";
      if (typeof window !== "undefined") localStorage.removeItem("token");
    },
    setViewMode(state, action: PayloadAction<"admin" | "student">) {
      state.viewMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ---------- SIGN IN ----------
    builder.addCase(signInThunk.pending, (state) => {
      state.requestStatus["signIn"] = { fetching: true, error: null };
    });
    builder.addCase(
      signInThunk.fulfilled,
      (state, action: PayloadAction<{ token: string; user: any }>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.viewMode =
          action.payload.user.role === "admin" ||
          action.payload.user.role === "co_admin"
            ? "admin"
            : "student";
        state.requestStatus["signIn"] = { fetching: false, error: null };
        if (typeof window !== "undefined")
          localStorage.setItem("token", action.payload.token);
      },
    );
    builder.addCase(
      signInThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.requestStatus["signIn"] = {
          fetching: false,
          error: action.payload || "Sign in failed",
        };
      },
    );

    // ---------- SIGN UP ----------
    builder.addCase(signUpThunk.pending, (state) => {
      state.requestStatus["signUp"] = { fetching: true, error: null };
    });
    builder.addCase(
      signUpThunk.fulfilled,
      (state, action: PayloadAction<{ token: string; user: any }>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.viewMode =
          action.payload.user.role === "admin" ||
          action.payload.user.role === "co_admin"
            ? "admin"
            : "student";
        state.requestStatus["signUp"] = { fetching: false, error: null };
        if (typeof window !== "undefined")
          localStorage.setItem("token", action.payload.token);
      },
    );
    builder.addCase(
      signUpThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.requestStatus["signUp"] = {
          fetching: false,
          error: action.payload || "Sign up failed",
        };
      },
    );
  },
});

export const { logout, setViewMode } = authSlice.actions;
export default authSlice.reducer;
