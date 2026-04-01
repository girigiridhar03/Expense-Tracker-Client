import api from "@/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getExpenseData = createAsyncThunk(
  "expenseData",
  async (query, { rejectWithValue }) => {
    const { month, year } = query;
    try {
      const response = await api.get(`/expense?month=${month}&year=${year}`);
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Internal Server error",
      );
    }
  },
);

export const addExpense = createAsyncThunk(
  "addExpense",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/expense", formData);
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Internal Server error",
      );
    }
  },
);
