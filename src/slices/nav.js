import { createSlice } from "@reduxjs/toolkit";
import { fetchAll } from "../api/services/nav.service";

const initialState = {
  isPending: false,
  isSuccess: false,
  isError: false,
  errorMessage: null,
  navList: [],
};
const navSlice = createSlice({
  name: "nav",
  initialState,
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
          navList: list,
        };
      })
      .addCase(fetchAll.rejected, (state, action) => {
        return {
          ...state,
          isPending: false,
          isError: true,
          errorMessage: action.error.message,
        };
      });
  },
});

export const { clearSingleData } = navSlice.actions;
const { reducer } = navSlice;

export default reducer;
