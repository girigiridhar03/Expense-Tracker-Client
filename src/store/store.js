import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.reducer";
import dashboardReducer from "./Dashboard/dashboard.reducer";
import expenseReducer from "./expense/expense.reducer";

const store = configureStore({
  reducer: {
    authReducer,
    dashboardReducer,
    expenseReducer,
  },
});

export default store;
