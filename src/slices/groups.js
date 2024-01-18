import { createSlice } from "@reduxjs/toolkit";
import { fetchAll, fetchDataByGroupID } from "../api/services/groups.service";
import { TABLE_SIZE } from "../config";

const initialState = {
  isPending: false,
  isSuccess: false,
  isError: false,
  errorMessage: null,
  groupList: [],
  groupDataById: [],
  groupListDataState: {
    skip: 0,
    take: TABLE_SIZE,
  },
};
const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroupListDataState(state, action) {
      state.groupListDataState = action.payload;
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
          groupList: list,
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
      .addCase(fetchDataByGroupID.pending, (state) => {
        return {
          ...state,
          isPending: true,
        };
      })
      .addCase(fetchDataByGroupID.fulfilled, (state, action) => {
        const list = action.payload;

        return {
          ...state,
          isPending: false,
          isSuccess: true,
          groupDataById: list,
        };
      })
      .addCase(fetchDataByGroupID.rejected, (state, action) => {
        return {
          ...state,
          isPending: false,
          isError: true,
          errorMessage: action.error.message,
        };
      });
  },
});

export const { clearSingleData, setGroupListDataState } = groupsSlice.actions;
const { reducer } = groupsSlice;

export default reducer;
