import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchAll = createAsyncThunk(
  "modules/fetchAll",
  async ({ page, pageSize, filters }) => {
    const { data } = await apiClient.get(
      // `${ENDPOINTS.USER_MODULES}/${page}/${pageSize}?${filters}`
      `${ENDPOINTS.USER_MODULES}?page=${page}&pageSize=${pageSize}`
    );
    return data;
  }
);

export const fetchDataByModuleID = createAsyncThunk(
  "modules/fetchDataByModuleID",
  async (moduleId) => {
    const { data } = await apiClient.get(`${ENDPOINTS.MODULEBYID}/${moduleId}`);
    return data;
  }
);
