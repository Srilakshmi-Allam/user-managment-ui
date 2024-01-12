import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchAll = createAsyncThunk(
  "groups/fetchAll",
  async ({ page, pageSize, filters }) => {
    const { data } = await apiClient.get(
      // `${ENDPOINTS.USER_GROUPS_PAGINATION}/${page}/${pageSize}?${filters}`
      `${ENDPOINTS.USER_GROUPS_PAGINATION}?page=${page}&pageSize=${pageSize}`
    );
    return data;
  }
);

export const fetchDataByGroupID = createAsyncThunk(
  "groups/fetchDataByGroupID",
  async (groupId) => {
    const { data } = await apiClient.get(`${ENDPOINTS.GROUPBYID}/${groupId}`);
    return data;
  }
);
