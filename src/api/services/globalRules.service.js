import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchGRData = createAsyncThunk(
  "globalRules/fetchGRData",
  async ({ page, pageSize, filterByLatest, RuleApplicableTo,
  RuleApplicableEntityID }) => {
    const { data } = await apiClient.get(ENDPOINTS.GLOBRULES, {
      params: {
        page,
        pageSize,
        filterByLatest,
        RuleApplicableTo,
        RuleApplicableEntityID
      }
    })
    return data;
  }
);


export const fetchGRDataById = createAsyncThunk(
  "globalRules/fetchGRDataById",
  async (globalRuleId) => {
    const { data } = await apiClient.get(
      `${ENDPOINTS.GLOBRULES}/${globalRuleId}`
    );
    return data;
  }
);

export const createGRData = createAsyncThunk(
  "globalRules/CreateGRData",
  async (GRData) => {
    const response = await apiClient.post(ENDPOINTS.GLOBRULES, GRData);
    return response;
  }
);

export const updateGRData = createAsyncThunk(
  "globalRules/updateGRData",
  async ({ updatedData, globalRuleDataById }, thunkAPI) => {
    try {
      const { GlobalRuleKey } = updatedData;
      const response = await apiClient.put(
        `${ENDPOINTS.GLOBRULES}/${GlobalRuleKey}`,
        updatedData
      );

      return { updated: response?.data, main: globalRuleDataById };
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
