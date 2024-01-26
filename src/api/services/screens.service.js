import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosClient } from "../axios";
import { ENDPOINTS, getApiUrl } from "../../config";
import { DELETE_TREE_VIEW } from "../../config";

export const fetchAll = createAsyncThunk("screens/fetchAll", async () => {
  const { data } = await getAxiosClient().get(`${ENDPOINTS.SCREENS_MODULES}`);
  return data;
});

export const fetchAllWithPagination = createAsyncThunk(
  "screens/fetchAllWithPagination",
  async ({ searchFilters, page, pageSize }) => {
    searchFilters = JSON.stringify(searchFilters)
    const { data } = await getAxiosClient().get(
      // `${ENDPOINTS.SM_PAGINATION}/${page}/${pageSize}?${filters}`
      `${ENDPOINTS.SM_PAGINATION}?searchFilters=${searchFilters}&page=${page}&pageSize=${pageSize}`
    );
    return data;
  }
);

export const fetchDataByScreenID = createAsyncThunk(
  "screens/fetchDataByScreenID",
  async (screenId) => {
    const { data } = await getAxiosClient().get(`${ENDPOINTS.SCREENBYID}/${screenId}`);
    return data;
  }
);

export const fetchTreeView = createAsyncThunk(
  "screens/fetchTreeView",
  async () => {
    const { data } = await getAxiosClient().get(`${ENDPOINTS.SCREENS_MODULES}`);
    return data;
  }
);

export const updateTreeViewAll = createAsyncThunk(
  "screens/updateTreeView",
  async (treeData) => {
    const response = await getAxiosClient().post(ENDPOINTS.UPDATE_TREE_VIEW, treeData);
    return response;
  }
);

export const deleteTreeViewAll = createAsyncThunk(
  "screens/deleteTreeView",
  async (ids) => {
    const requestData = { ids };
    const response = getAxiosClient().delete(DELETE_TREE_VIEW, requestData)
    return response
  }
);
