import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchNAData = createAsyncThunk(
  "networkAssignments/fetchNAData",
  async ({ page, pageSize, filters }) => {
    const { data } = await apiClient.get(
      `${ENDPOINTS.NETA}?page=${page}&pageSize=${pageSize}&${filters}`
    );
    return data;
  }
);

export const fetchNADataById = createAsyncThunk(
  "networkAssignments/fetchNADataById",
  async (networkAssignmentKey) => {
    const { data } = await apiClient.get(
      `${ENDPOINTS.NETA}/${networkAssignmentKey}`
    );
    return data;
  }
);

export const CreateNAData = createAsyncThunk(
  "networkAssignments/CreateNAData",
  async (NAData) => {
    const { data } = await apiClient.post(ENDPOINTS.NETA, NAData);
    return data;
  }
);

export const updateNAData = createAsyncThunk(
  "networkAssignments/updateNAData",
  async ({ NetworkAssignmentKey, updatedData }, thunkAPI) => {
    try {
      const response = await apiClient.put(
        `${ENDPOINTS.NETA}/${NetworkAssignmentKey}`,
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
