import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";
import { EXALENT_BENEFITS_API, DELETE_TREE_VIEW } from "../../config";

export const fetchAll = createAsyncThunk("screens/fetchAll", async () => {
  const { data } = await apiClient.get(`${ENDPOINTS.SCREENS_MODULES}`);
  return data;
});

export const fetchAllWithPagination = createAsyncThunk(
  "screens/fetchAllWithPagination",
  async ({ page, pageSize, filters }) => {
    const { data } = await apiClient.get(
      // `${ENDPOINTS.SM_PAGINATION}/${page}/${pageSize}?${filters}`
      `${ENDPOINTS.SM_PAGINATION}?page=${page}&pageSize=${pageSize}`
    );
    return data;
  }
);

export const fetchDataByScreenID = createAsyncThunk(
  "screens/fetchDataByScreenID",
  async (screenId) => {
    const { data } = await apiClient.get(`${ENDPOINTS.SCREENBYID}/${screenId}`);
    return data;
  }
);

export const fetchTreeView = createAsyncThunk(
  "screens/fetchTreeView",
  async () => {
    const { data } = await apiClient.get(`${ENDPOINTS.SCREENS_MODULES}`);
    return data;
  }
);

export const updateTreeViewAll = createAsyncThunk(
  "screens/updateTreeView",
  async (treeData) => {
    const response = await apiClient.post(ENDPOINTS.UPDATE_TREE_VIEW, treeData);
    return response;
  }
);

export const deleteTreeViewAll = createAsyncThunk(
  "screens/deleteTreeView",
  async (ids) => {
    const requestData = { ids };
    try {
      const response = await fetch(
        `${EXALENT_BENEFITS_API}${DELETE_TREE_VIEW}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(requestData),
        }
      );
      if (!response.ok) {
        throw new Error(`DELETE request failed with status ${response.status}`);
      }
      console.log("delete", response);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
);
