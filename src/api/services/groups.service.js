import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchAll = createAsyncThunk(
  "groups/fetchAll",
  async ({ page, pageSize, searchFilters }) => {
    searchFilters = JSON.stringify(searchFilters)
    const { data } = await apiClient.get(
      `${ENDPOINTS.USER_GROUPS_PAGINATION}?searchFilters=${searchFilters}&page=${page}&pageSize=${pageSize}`
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