import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.reducer";
import dashboardReducer from "./Dashboard/dashboard.reducer";

const store = configureStore({
  reducer: {
    authReducer,
    dashboardReducer,
  },
});

export default store;
