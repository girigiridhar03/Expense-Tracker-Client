import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.reducer";

const store = configureStore({
  reducer: {
    authReducer,
  },
});

export default store;
