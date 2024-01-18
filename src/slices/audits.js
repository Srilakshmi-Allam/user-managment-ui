import { createSlice } from "@reduxjs/toolkit";
import { fetchAuditDetails } from "../api/services/audits.service";

const initialState = {
  isPending: false,
  isSuccess: false,
  isError: false,
  errorMessage: null,
  auditList: [],
};
const auditsSlice = createSlice({
  name: "audits",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchAuditDetails.pending, (state) => {
        return {
          ...state,
          isPending: true,
        };
      })
      .addCase(fetchAuditDetails.fulfilled, (state, action) => {
        const list = action.payload;

        return {
          ...state,
          isPending: false,
          isSuccess: true,
          navList: list,
        };
      })
      .addCase(fetchAuditDetails.rejected, (state, action) => {
        return {
          ...state,
          isPending: false,
          isError: true,
          errorMessage: action.error.message,
        };
      });
  },
});

export const { clearSingleData } = auditsSlice.actions;
const { reducer } = auditsSlice;

export default reducer;
