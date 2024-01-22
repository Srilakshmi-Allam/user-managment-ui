import { createSlice } from "@reduxjs/toolkit";
import { fetchAll, fetchDataByModuleID } from "../api/services/modules.service";
import { TABLE_SIZE } from "../config";

const initialState = {
  isPending: false,
  isSuccess: false,
  isError: false,
  errorMessage: null,
  moduleList: [],
  moduleDataById: [],
  moduleListDataState: {
    skip: 0,
    take: TABLE_SIZE,
  },
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModuleListDataState(state, action) {
      state.moduleListDataState = action.payload;
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
          moduleList: list,
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
      .addCase(fetchDataByModuleID.pending, (state) => {
        return {
          ...state,
          isPending: true,
        };
      })
      .addCase(fetchDataByModuleID.fulfilled, (state, action) => {
        const list = action.payload;

        return {
          ...state,
          isPending: false,
          isSuccess: true,
          moduleDataById: list,
        };
      })
      .addCase(fetchDataByModuleID.rejected, (state, action) => {
        return {
          ...state,
          isPending: false,
          isError: true,
          errorMessage: action.error.message,
        };
      });
  },
});

export const { clearSingleData, setModuleListDataState } = modulesSlice.actions;
const { reducer } = modulesSlice;

export default reducer;
