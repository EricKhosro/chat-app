import { configureStore } from "@reduxjs/toolkit";
import connectionReducer from "../Slices/socketSlice";

export const store = configureStore({
  reducer: {
    connection: connectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
