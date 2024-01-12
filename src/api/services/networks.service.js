import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchNtkData = createAsyncThunk(
  "networks/fetchNtkData",
  async ({ page, pageSize, formattedURL }) => {
    const { data } = await apiClient.get(
      `${ENDPOINTS.NETWORKS}?page=${page}&pageSize=${pageSize}&${formattedURL}`
    );
    return data;
  }
);
export const fetchNADataByType = createAsyncThunk(
  "networks/fetchNADataByType",
  async (codeType) => {
    const { data } = await apiClient.get(`${ENDPOINTS.NETATYPE}/${codeType}`);
    return { networkType: codeType, data };
  }
);

export const fetchNtkDataByKey = createAsyncThunk(
  "networks/fetchNtkDataByKey",
  async (networkKey) => {
    const { data } = await apiClient.get(`${ENDPOINTS.NETWORKS}/${networkKey}`);
    return data;
  }
);

export const CreateNtkData = createAsyncThunk(
  "networks/CreateNtkData",
  async (NtkData) => {
    const response = await apiClient.post(ENDPOINTS.NETWORKS, NtkData);
    return response;
  }
);

export const updateNtkData = createAsyncThunk(
  "networks/updateNtkData",
  async (updatedNtkData, thunkAPI) => {
    try {
      const { NetworkKey } = updatedNtkData;
      const response = await apiClient.put(
        `${ENDPOINTS.NETWORKS}/${NetworkKey}`,
        updatedNtkData
      );

      return response?.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
