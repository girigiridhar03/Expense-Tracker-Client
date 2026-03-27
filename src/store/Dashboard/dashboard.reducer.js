import { createSlice } from "@reduxjs/toolkit";
import {
  getBudgetOverview,
  getDashboardCategories,
  getDashboardMetricCards,
} from "./dashboard.service";

const initialState = {
  cardsLoading: false,
  budgetOverviewLoading: false,
  categoriesStatLoading: false,
  categoriesStatArr: [],
  budgetOverview: {},
  metricCardsObj: {},
  error: null,
};

export const dashboardReducer = createSlice({
  name: "dashboardReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getDashboardMetricCards.pending, (state) => {
        state.cardsLoading = true;
      })
      .addCase(getDashboardMetricCards.fulfilled, (state, { payload }) => {
        state.cardsLoading = false;
        state.metricCardsObj = payload;
      })
      .addCase(getDashboardMetricCards.rejected, (state, { payload }) => {
        state.cardsLoading = false;
        state.error = payload;
      })
      .addCase(getBudgetOverview.pending, (state) => {
        state.budgetOverviewLoading = true;
      })
      .addCase(getBudgetOverview.fulfilled, (state, { payload }) => {
        state.budgetOverviewLoading = false;
        state.budgetOverview = payload;
      })
      .addCase(getBudgetOverview.rejected, (state, { payload }) => {
        state.budgetOverviewLoading = false;
        state.error = payload;
      })
      .addCase(getDashboardCategories.pending, (state) => {
        state.categoriesStatLoading = true;
      })
      .addCase(getDashboardCategories.fulfilled, (state, { payload }) => {
        state.categoriesStatLoading = false;
        state.categoriesStatArr = payload;
      })
      .addCase(getDashboardCategories.rejected, (state, { payload }) => {
        state.categoriesStatLoading = false;
        state.error = payload;
      }),
});

export default dashboardReducer.reducer;
