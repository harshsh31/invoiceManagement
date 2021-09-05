import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import invoices from "./invoices";

const reducer = {
  invoices,
};
const preloadedState = {};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
});

export default store;
