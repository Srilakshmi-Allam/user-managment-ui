import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/users";
import rolesReducer from "./slices/roles";
import modulesReducer from "./slices/modules";
import screensReducer from "./slices/screens";
import groupsReducer from "./slices/groups";

const reducer = {
  users: usersReducer,
  roles: rolesReducer,
  modules: modulesReducer,
  screens: screensReducer,
  groups: groupsReducer,
};

export const store = configureStore({
  reducer,
  devTools: true,
});
