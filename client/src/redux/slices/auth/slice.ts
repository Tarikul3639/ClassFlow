import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "@/redux/slices/auth/types";
import { loginThunk } from "./thunks/loginThunk";
import { registerThunk } from "./thunks/registerThunk";
import { logoutThunk } from "./thunks/logoutThunk";
import { verifyAuthThunk } from "./thunks/verifyAuthThunk";

const initialState: IAuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
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
      .addCase(loginThunk.pending, (state) => {
        state.requestStatus.signIn.loading = true;
        state.requestStatus.signIn.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.requestStatus.signIn.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.requestStatus.signIn.loading = false;
        state.requestStatus.signIn.error = action.payload as string;
      });

    // Register
    builder
      .addCase(registerThunk.pending, (state) => {
        state.requestStatus.signUp.loading = true;
        state.requestStatus.signUp.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.requestStatus.signUp.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerThunk.rejected, (state, action) => {
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
