import { createSlice } from "@reduxjs/toolkit";
import { addExpense, getExpenseData } from "./expense.service";

const initialState = {
  expenseLoading: false,
  addExpenseLoading: false,
  expenseData: [],
  totalPages: 1,
  totalRecords: 0,
  error: null,
};

const expenseReducer = createSlice({
  name: "expenseReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getExpenseData.pending, (state) => {
        state.expenseLoading = true;
        state.expenseData = [];
      })
      .addCase(getExpenseData.fulfilled, (state, { payload }) => {
        state.expenseLoading = false;
        state.expenseData = payload?.expenses;
        state.totalPages = payload?.totalPages;
        state.totalRecords = payload?.totalRecords;
      })
      .addCase(getExpenseData.rejected, (state, { payload }) => {
        state.expenseLoading = false;
        state.error = payload;
      })
      .addCase(addExpense.pending, (state) => {
        state.addExpenseLoading = true;
      })
      .addCase(addExpense.fulfilled, (state) => {
        state.addExpenseLoading = false;
      })
      .addCase(addExpense.rejected, (state, { payload }) => {
        state.addExpenseLoading = false;
        state.error = payload;
      }),
});

export default expenseReducer.reducer;
