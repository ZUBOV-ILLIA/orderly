import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "@/redux/slices/ordersSlice";
import userReducer from "@/redux/slices/userSlice";

export const store = configureStore({
  reducer: {
    ordersSlice: ordersReducer,
    userSlice: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
