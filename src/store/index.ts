import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weatherSlice";

const reducers = {
  weather: weatherReducer,
};

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
