import api from "@/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getDashboardMetricCards = createAsyncThunk(
  "metricCards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/dashboard/metrics");
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Internal Server error",
      );
    }
  },
);

export const getBudgetOverview = createAsyncThunk(
  "overview",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/dashboard/budget-overview");
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Internal Server error",
      );
    }
  },
);

export const getDashboardCategories = createAsyncThunk(
  "dashboardCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/dashboard/categories");
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Internal Server error",
      );
    }
  },
);
