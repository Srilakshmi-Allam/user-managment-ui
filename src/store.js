import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/nav";
import usersReducer from "./slices/users";
import rolesReducer from "./slices/roles";
import modulesReducer from "./slices/modules";
import screensReducer from "./slices/screens";
import auditsReducer from "./slices/audits";
import groupsReducer from "./slices/groups";

const reducer = {
  nav: navReducer,
  users: usersReducer,
  roles: rolesReducer,
  modules: modulesReducer,
  screens: screensReducer,
  audits: auditsReducer,
  groups: groupsReducer,
};

export const store = configureStore({
  reducer,
  devTools: true,
});
