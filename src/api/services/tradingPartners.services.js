import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchTPData = createAsyncThunk(
  "tradingPartners/fetchTPData",
  async ({ page, pageSize, tradingPartnerType }) => {
    let tradingQuery = "";
    if (tradingPartnerType) {
      tradingQuery = `&tradingPartnerType=${tradingPartnerType}`;
    }

    const { data } = await apiClient.get(
      `${ENDPOINTS.TP}?page=${page}&pageSize=${pageSize}${tradingQuery}`
    );
    return data;
  }
);

export const fetchTPDataById = createAsyncThunk(
  "tradingPartners/fetchTPDataById",
  async (tradingPartnerKey) => {
    const { data } = await apiClient.get(
      `${ENDPOINTS.TP}/${tradingPartnerKey}`
    );
    return data;
  }
);

export const CreateTPData = createAsyncThunk(
  "tradingPartners/CreateTPData",
  async (TPData) => {
    const { data } = await apiClient.post(ENDPOINTS.TP, TPData);
    return data;
  }
);

export const updateTPData = createAsyncThunk(
  "tradingPartners/updateTPData",
  async ({ TradingPartnerKey, updatedData }, thunkAPI) => {
    try {
      const response = await apiClient.put(
        `${ENDPOINTS.TP}/${TradingPartnerKey}`,
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
