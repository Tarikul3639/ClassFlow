import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "@/redux/slices/auth/types";
import { signInThunk } from "./thunks/signInThunk";
import { signUpThunk } from "./thunks/signUpThunk";
import { logoutThunk } from "./thunks/logoutThunk";
import { verifyAuthThunk } from "./thunks/verifyAuthThunk";

const demo = {
      _id: "u1",
    name: "Aminul Islam",
    email: "aminul@mail.com",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
};

const initialState: IAuthState = {
  user: demo,
  token: "demo-token",
  loading: false,
  error: null,
  isAuthenticated: true,
  requestStatus: {
    signIn: { loading: false, error: null },
    signUp: { loading: false, error: null },
    logout: { loading: false, error: null },
    refresh: { loading: false, error: null },
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(signInThunk.pending, (state) => {
        state.requestStatus.signIn.loading = true;
        state.requestStatus.signIn.error = null;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.requestStatus.signIn.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.requestStatus.signIn.loading = false;
        state.requestStatus.signIn.error = action.payload as string;
      });

    // Register
    builder
      .addCase(signUpThunk.pending, (state) => {
        state.requestStatus.signUp.loading = true;
        state.requestStatus.signUp.error = null;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.requestStatus.signUp.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.requestStatus.signUp.loading = false;
        state.requestStatus.signUp.error = action.payload as string;
      });

    // Verify Auth (refresh/page load)
    builder
      .addCase(verifyAuthThunk.pending, (state) => {
        state.requestStatus.refresh.loading = true;
        state.requestStatus.refresh.error = null;
      })
      .addCase(verifyAuthThunk.fulfilled, (state, action) => {
        state.requestStatus.refresh.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(verifyAuthThunk.rejected, (state) => {
        state.requestStatus.refresh.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      });

    // Logout
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.requestStatus.logout.loading = false;
      state.requestStatus.logout.error = null;
    });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
