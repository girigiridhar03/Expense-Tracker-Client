import api from "@/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authRegister = createAsyncThunk(
  "authRegister",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/register", formData);
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Internal Server error",
      );
    }
  },
);

export const authLogin = createAsyncThunk(
  "authLogin",
  async (formData, { rejectWithValue }) => {
    const obj = {
      email: formData?.email || "",
      password: formData?.password || "",
    };
    try {
      const response = await api.post("/login", obj);
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Internal Server error",
      );
    }
  },
);

export const authCheck = createAsyncThunk(
  "authCheck",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/check");
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Internal Server error",
      );
    }
  },
);

export const authLogout = createAsyncThunk(
  "authLogout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/logout");
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Internal Server error",
      );
    }
  },
);
