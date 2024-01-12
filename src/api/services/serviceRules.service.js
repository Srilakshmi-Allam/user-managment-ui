import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchSRData = createAsyncThunk(
  "serviceRules/fetchSRData",
  async ({ page, pageSize }) => {
    const filterByLatest = true;
    const { data } = await apiClient.get(
      `${ENDPOINTS.GET_SERVRULES}?page=${page}&pageSize=${pageSize}&filterByLatest=${filterByLatest}`
    );
    return data;
  }
);

export const fetchSRDataById = createAsyncThunk(
  "serviceRules/fetchSRDataById",
  async (serviceRuleId) => {
    const { data } = await apiClient.get(
      `${ENDPOINTS.SERRULE}/${serviceRuleId}`
    );
    return data;
  }
);

export const CreateSRData = createAsyncThunk(
  "serviceRules/CreateSRData",
  async (SRData) => {
    const response = await  apiClient.post(ENDPOINTS.SERRULE, SRData);
    return response;
  }
);

export const updateSRData = createAsyncThunk(
  "serviceRules/updateSRData",
  async ({ updatedData, serviceRuleDataById }, thunkAPI) => {
    try {
      const { ServiceRuleKey } = updatedData;
      const response = await apiClient.put(
        `${ENDPOINTS.SERRULE}/${ServiceRuleKey}`,
        updatedData
      );

      return { updated: response?.data, main: serviceRuleDataById };
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
