import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/types/auth";
import {
  signInThunk,
  signUpThunk,
  getProfileThunk,
} from "./thunks/auth.thunks";
import { setAuthToken } from "@/lib/api/axios";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  requestStatus: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        setAuthToken(null);
      }
    },
  },
  extraReducers: (builder) => {
    // Sign In
    builder.addCase(signInThunk.pending, (state) => {
      state.requestStatus["signIn"] = { fetching: true, error: null };
    });
    builder.addCase(
      signInThunk.fulfilled,
      (state, action: PayloadAction<{ token: string; user: any }>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.requestStatus["signIn"] = { fetching: false, error: null };

        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
          setAuthToken(action.payload.token);
        }
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

    // Sign Up
    builder.addCase(signUpThunk.pending, (state) => {
      state.requestStatus["signUp"] = { fetching: true, error: null };
    });
    builder.addCase(
      signUpThunk.fulfilled,
      (state, action: PayloadAction<{ token: string; user: any }>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.requestStatus["signUp"] = { fetching: false, error: null };

        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
          setAuthToken(action.payload.token);
        }
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

    // Get Profile
    builder.addCase(getProfileThunk.pending, (state) => {
      state.requestStatus["getProfile"] = { fetching: true, error: null };
    });
    builder.addCase(
      getProfileThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.requestStatus["getProfile"] = { fetching: false, error: null };
      },
    );
    builder.addCase(
      getProfileThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.user = null;
        state.isAuthenticated = false;
        state.requestStatus["getProfile"] = {
          fetching: false,
          error: action.payload || "Failed to fetch profile",
        };

        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          setAuthToken(null);
        }
      },
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
