import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchPayersData = createAsyncThunk(
  "config/payers/fetchPayersData",
  async ({ page, pageSize }) => {
    const { data } = await apiClient.get(
      `${ENDPOINTS.PAYERS}?page=${page}&pageSize=${pageSize}`
    );
    return data;
  }
);

export const fetchPayerDataByID = createAsyncThunk(
  "config/payers/fetchPayersDataByID",
  async (payerId) => {
    const { data } = await apiClient.get(`${ENDPOINTS.PAYERS}/${payerId}`);
    return data;
  }
);

export const CreatePayerData = createAsyncThunk(
  "config/CreatePayerData",
  async (PayersData) => {
    const response = await apiClient.post(ENDPOINTS.PAYERS, PayersData);
    return response;
  }
);

export const updatePayerData = createAsyncThunk(
  "config/payers/update",
  async (updatedData, thunkAPI) => {
    try {
      const { PayerID } = updatedData;
      const response = await apiClient.put(
        `${ENDPOINTS.PAYERS}/${PayerID}`,
        updatedData
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
