import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/users";

const reducer = {
  users: usersReducer,
};

export const store = configureStore({
  reducer,
  devTools: true,
});
