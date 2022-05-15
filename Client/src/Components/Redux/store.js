import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authReducer } from "./Auth/reducer";
import { serachReducer } from "./Searching/reducer";

const loggerMiddleware = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch);
  }
  next(action);
};

export const store = configureStore({
  reducer: {
    user: authReducer,
    search: serachReducer,
  },
  middleware: [...getDefaultMiddleware(), loggerMiddleware],
});
