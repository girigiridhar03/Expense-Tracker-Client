import { createSlice } from "@reduxjs/toolkit";
import { authCheck, authLogin, authLogout, authRegister } from "./auth.service";

const initialState = {
  authLoading: false,
  isAuthenticated: false,
  authChecked: false,
  user: null,
  error: null,
};

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(authRegister.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(authRegister.fulfilled, (state, { payload }) => {
        state.authLoading = false;
        state.isAuthenticated = true;
        state.authChecked = true;
        state.user = payload?.data || null;
      })
      .addCase(authRegister.rejected, (state, { payload }) => {
        state.authLoading = false;
        state.isAuthenticated = false;
        state.error = payload;
      })
      .addCase(authLogin.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(authLogin.fulfilled, (state, { payload }) => {
        state.authLoading = false;
        state.isAuthenticated = true;
        state.authChecked = true;
        state.user = payload?.data?.user || null;
      })
      .addCase(authLogin.rejected, (state, { payload }) => {
        state.authLoading = false;
        state.isAuthenticated = false;
        state.error = payload;
      })
      .addCase(authCheck.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(authCheck.fulfilled, (state, { payload }) => {
        state.authLoading = false;
        state.isAuthenticated = true;
        state.authChecked = true;
        state.user = payload?.data?.user || null;
      })
      .addCase(authCheck.rejected, (state) => {
        state.authLoading = false;
        state.isAuthenticated = false;
        state.authChecked = true;
        state.user = null;
      })
      .addCase(authLogout.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(authLogout.fulfilled, (state) => {
        state.authLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(authLogout.rejected, (state, { payload }) => {
        state.authLoading = false;
        state.error = payload;
      }),
});

export default authReducer.reducer;
