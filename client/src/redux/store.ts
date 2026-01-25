import { configureStore } from "@reduxjs/toolkit";
import adminEventsReducer from "@/redux/slices/admin/events/slice";

export const store = configureStore({
  reducer: {
    admin: adminEventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
