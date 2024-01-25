import { createSlice } from "@reduxjs/toolkit";

import {
  fetchUsersWithSearchParam,
  fetchUsersById,
  fetchUsersByEmail,
} from "../api/services/users.service";
import { TABLE_SIZE } from "../config";

const initialState = {
  isPending: false,
  isSuccess: false,
  isError: false,
  errorMessage: null,
  userList: [],
  userData: [],
  UserEmailData: [],
  userListDataState: {
    skip: 0,
    take: TABLE_SIZE,
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserListDataState(state, action) {
      state.userListDataState = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsersWithSearchParam.pending, (state) => {
        return {
          ...state,
          isPending: true,
        };
      })
      .addCase(fetchUsersWithSearchParam.fulfilled, (state, action) => {
        const list = action.payload;

        return {
          ...state,
          isPending: false,
          isSuccess: true,
          userList: list,
        };
      })
      .addCase(fetchUsersWithSearchParam.rejected, (state, action) => {
        return {
          ...state,
          isPending: false,
          isError: true,
          errorMessage: action.error.message,
        };
      })
      .addCase(fetchUsersById.pending, (state) => {
        return {
          ...state,
          isPending: true,
        };
      })
      .addCase(fetchUsersById.fulfilled, (state, action) => {
        const list = action.payload;

        return {
          ...state,
          isPending: false,
          isSuccess: true,
          userData: list,
        };
      })
      .addCase(fetchUsersById.rejected, (state, action) => {
        return {
          ...state,
          isPending: false,
          isError: true,
          errorMessage: action.error.message,
        };
      })
      .addCase(fetchUsersByEmail.pending, (state) => {
        return {
          ...state,
          isPending: true,
        };
      })
      .addCase(fetchUsersByEmail.fulfilled, (state, action) => {
        const list = action.payload;

        return {
          ...state,
          isPending: false,
          isSuccess: true,
          UserEmailData: list,
        };
      })
      .addCase(fetchUsersByEmail.rejected, (state, action) => {
        return {
          ...state,
          isPending: false,
          isError: true,
          errorMessage: action.error.message,
        };
      });
  },
});

export const { setUserListDataState, setUserData } = usersSlice.actions;
const { reducer } = usersSlice;

export default reducer;
export const usersReducer = reducer;
