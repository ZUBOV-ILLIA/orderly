import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "@/redux/slices/ordersSlice";

export const store = configureStore({
  reducer: {
    ordersSlice: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
