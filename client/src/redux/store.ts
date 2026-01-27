import { configureStore } from "@reduxjs/toolkit";
import adminEventsReducer from "@/redux/slices/admin/events/slice";
import clientEventsReducer from "@/redux/slices/client/events/slice";
import authenticationReducer from "@/redux/slices/auth/slice";

export const store = configureStore({
  reducer: {
    admin: adminEventsReducer,
    client: clientEventsReducer,
    auth: authenticationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
