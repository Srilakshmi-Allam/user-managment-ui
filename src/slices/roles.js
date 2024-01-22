import { createSlice } from "@reduxjs/toolkit";
import { fetchAll, fetchRoleWiseTreeView } from "../api/services/roles.service";
import { TABLE_SIZE } from "../config";

const initialState = {
  isPending: false,
  isSuccess: false,
  isError: false,
  errorMessage: null,
  roleList: [],
  roleWiseTreeView: [],
  roleListDataState: {
    skip: 0,
    take: TABLE_SIZE,
  },
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRoleWiseTreeView(state, action) {
      return {
        ...state,
        roleWiseTreeView: action.payload,
      };
    },
    setRoleListDataState(state, action) {
      state.roleListDataState = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAll.pending, (state) => {
        return {
          ...state,
          isPending: true,
        };
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        const list = action.payload;

        return {
          ...state,
          isPending: false,
          isSuccess: true,
          roleList: list,
        };
      })
      .addCase(fetchAll.rejected, (state, action) => {
        return {
          ...state,
          isPending: false,
          isError: true,
          errorMessage: action.error.message,
        };
      })
      .addCase(fetchRoleWiseTreeView.pending, (state) => {
        return {
          ...state,
          isPending: true,
        };
      })
      .addCase(fetchRoleWiseTreeView.fulfilled, (state, action) => {
        return {
          ...state,
          isPending: false,
          isSuccess: true,
          roleWiseTreeView: action.payload,
        };
      })
      .addCase(fetchRoleWiseTreeView.rejected, (state, action) => {
        return {
          ...state,
          isPending: false,
          isError: true,
          errorMessage: action.error.message,
        };
      });
  },
});

export const { clearSingleData, setRoleWiseTreeView, setRoleListDataState } =
  rolesSlice.actions;
const { reducer } = rolesSlice;

export default reducer;
