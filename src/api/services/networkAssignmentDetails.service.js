import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchNADData = createAsyncThunk(
  "networkAssignmentDetails/fetchNADData",
  async ({ page, pageSize }) => {
    const { data } = await apiClient.get(
      `${ENDPOINTS.NET_ASS}?page=${page}&pageSize=${pageSize}`
    );
    return data;
  }
);

export const fetchNADDataById = createAsyncThunk(
  "networkAssignmentDetails/fetchNADDataById",
  async (networkAssignmentKey) => {
    const { data } = await apiClient.get(
      `${ENDPOINTS.NET_ASS}/${networkAssignmentKey}`
    );
    return data;
  }
);

export const fetchNADSingleByKey = createAsyncThunk(
  "networkAssignmentDetails/fetchNADSingleByKey",
  async (networkAssignmentDetailKey) => {
    const { data } = await apiClient.get(
      `${ENDPOINTS.NADK}/${networkAssignmentDetailKey}`
    );
    return data;
  }
);

export const CreateNADData = createAsyncThunk(
  "networkAssignmentDetails/CreateNADData",
  async (NADData) => {
    const response = await apiClient.post(ENDPOINTS.NET_ASS, NADData);
    return response;
  }
);

export const updateNADData = createAsyncThunk(
  "networkAssignmentDetails/updateNADData",
  async ({ updatedData }, thunkAPI) => {
    try {
      const { NetworkAssignmentDetailKey } = updatedData;
      const response = await apiClient.put(
        `${ENDPOINTS.NET_ASS}/${NetworkAssignmentDetailKey}`,
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

      console.log("message", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
