import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchMGData = createAsyncThunk(
  "benefitGroups/fetchMGData",
  async ({ page, pageSize, filters }) => {
    const { data } = await apiClient.get(
      `${ENDPOINTS.MG}?page=${page}&pageSize=${pageSize}&filters=${filters}`
    );
    return data;
  }
);

export const fetchMGDataBykey = createAsyncThunk(
  "benefitGroups/fetchMGDataBykey",
  async (benefitGroupId) => {
    const { data } = await apiClient.get(`${ENDPOINTS.MG}/${benefitGroupId}`);
    return data;
  }
);

export const CreateMGData = createAsyncThunk(
  "benefitGroups/CreateMGData",
  async (BGData) => {
    const response = await apiClient.post(ENDPOINTS.MG, BGData);
    return response;
  }
);

export const updateMGData = createAsyncThunk(
  "benefitGroups/updateMGData",
  async (updatedData, thunkAPI) => {
    try {
      const { MembershipGroupKey } = updatedData;
      const response = await apiClient.put(
        `${ENDPOINTS.MG}/${MembershipGroupKey}`,
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

export const fetchMGComments = createAsyncThunk(
  "benefitGroups/fetchMGComments",
  async ({ ApplicableEntityID }) => {
    const { data } = await apiClient.get(
      `${ENDPOINTS.GLOBAL_COMMENTS}?ApplicableEntityID=${ApplicableEntityID}`
    );
    // const { data } = await apiClient.get(
    //   `${ENDPOINTS.GLOBAL_COMMENTS}?page=${page}&pageSize=${pageSize}&ApplicableEntityID=${ApplicableEntityID}`
    // );
    return data;
  }
);

export const CreateMGComment = createAsyncThunk(
  "benefitGroups/CreateMGComment",
  async (MGData) => {
    const response = await apiClient.post(ENDPOINTS.GLOBAL_COMMENTS, MGData);
    return response;
  }
);
