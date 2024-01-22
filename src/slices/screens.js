import { createSlice } from "@reduxjs/toolkit";
import {
  deleteTreeViewAll,
  fetchAll,
  fetchTreeView,
  updateTreeViewAll,
  fetchAllWithPagination,
  fetchDataByScreenID,
} from "../api/services/screens.service";
import { transformDataToTreeView } from "../utils/shared/formattedData";
import { toast } from "react-toastify";
import { TABLE_SIZE } from "../config";

const initialState = {
  isPending: false,
  isSuccess: false,
  isError: false,
  errorMessage: null,
  screenList: [],
  screenData: [],
  treeView: [],
  screenDataById: [],
  screenListDataState: {
    skip: 0,
    take: TABLE_SIZE,
  },
};
const screensSlice = createSlice({
  name: "screens",
  initialState,
  reducers: {
    setTreeView(state, action) {
      state.treeView = action.payload;
    },
    setScreenListDataState(state, action) {
      state.screenListDataState = action.payload;
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
          screenList: list,
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
      .addCase(fetchAllWithPagination.pending, (state) => {
        return {
          ...state,
          isPending: true,
        };
      })
      .addCase(fetchAllWithPagination.fulfilled, (state, action) => {
        const list = action.payload;

        return {
          ...state,
          isPending: false,
          isSuccess: true,
          screenData: list,
        };
      })
      .addCase(fetchAllWithPagination.rejected, (state, action) => {
        return {
          ...state,
          isPending: false,
          isError: true,
          errorMessage: action.error.message,
        };
      })
      .addCase(fetchTreeView.pending, (state) => {
        return {
          ...state,
          isPending: true,
        };
      })
      .addCase(fetchTreeView.fulfilled, (state, action) => {
        const list = transformDataToTreeView(action.payload);

        return {
          ...state,
          isPending: false,
          isSuccess: true,
          treeView: list,
        };
      })
      .addCase(fetchTreeView.rejected, (state, action) => {
        return {
          ...state,
          isPending: false,
          isError: true,
          errorMessage: action.error.message,
        };
      })
      .addCase(updateTreeViewAll.pending, (state) => {
        return {
          ...state,
          isPending: true,
        };
      })
      .addCase(updateTreeViewAll.fulfilled, (state) => {
        toast.dismiss();
        toast.success("RoleAccessScreen Updated", {
          toastId: "updateSuccess",
        });
        return {
          ...state,
          isPending: false,
          isSuccess: true,
        };
      })
      .addCase(updateTreeViewAll.rejected, (state, action) => {
        toast.dismiss();
        toast.error("Error Updating RoleAccessScreen", {
          toastId: "updateError",
        });
        return {
          ...state,
          isPending: false,
          isError: true,
          errorMessage: action.error.message,
        };
      })
      .addCase(deleteTreeViewAll.pending, (state) => {
        return {
          ...state,
          isPending: true,
        };
      })
      .addCase(deleteTreeViewAll.fulfilled, (state) => {
        toast.dismiss();
        toast.success("RoleAccessScreen Deleted", {
          toastId: "deleteSuccess",
        });
        return {
          ...state,
          isPending: false,
          isSuccess: true,
        };
      })
      .addCase(deleteTreeViewAll.rejected, (state, action) => {
        toast.dismiss();
        toast.error("Error Deleting RoleAccessScreen", {
          toastId: "deleteError",
        });
        return {
          ...state,
          isPending: false,
          isError: true,
          errorMessage: action.error.message,
        };
      })
      .addCase(fetchDataByScreenID.pending, (state) => {
        return {
          ...state,
          isPending: true,
        };
      })
      .addCase(fetchDataByScreenID.fulfilled, (state, action) => {
        const list = action.payload;

        return {
          ...state,
          isPending: false,
          isSuccess: true,
          screenDataById: list,
        };
      })
      .addCase(fetchDataByScreenID.rejected, (state, action) => {
        return {
          ...state,
          isPending: false,
          isError: true,
          errorMessage: action.error.message,
        };
      });
  },
});

export const { clearSingleData, setTreeView, setScreenListDataState } =
  screensSlice.actions;
const { reducer } = screensSlice;

export default reducer;
