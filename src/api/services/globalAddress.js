import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchGAData = createAsyncThunk(
  "globalAddresses/fetchGAData",
  async ({ page, pageSize, formattedURL }) => {
    const { data } = await apiClient.get(
      `${ENDPOINTS.GLOBAL_ADDRESS}?page=${page}&pageSize=${pageSize}&${formattedURL}`
    );
    return data;
  }
);
export const fetchGADataById = createAsyncThunk(
  "globalAddresses/fetchGADataById",
  async (id) => {
    const { data } = await apiClient.get(`${ENDPOINTS.GLOBAL_ADDRESS}/${id}`);
    return data;
  }
);

export const fetchGADataByKey = createAsyncThunk(
  "globalAddresses/fetchGADataByKey",
  async (key) => {
    const { data } = await apiClient.get(
      `${ENDPOINTS.GLOBAL_ADDRESS_KEY}/${key}`
    );
    return data;
  }
);

export const CreateGAData = createAsyncThunk(
  "globalAddresses/CreateGAData",
  async (GAData) => {
    const { data } = await apiClient.post(ENDPOINTS.GLOBAL_ADDRESS, GAData);
    return data;
  }
);

export const updateGAData = createAsyncThunk(
  "globalAddresses/updateGAData",
  async (updatedGAData, thunkAPI) => {
    try {
      const { GlobalAddressKey } = updatedGAData;
      const response = await apiClient.put(
        `${ENDPOINTS.GLOBAL_ADDRESS}/${GlobalAddressKey}`,
        updatedGAData
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
