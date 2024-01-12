import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchData = createAsyncThunk("queryData/fetchAll", async () => {
  const { data } = await apiClient.get(`${ENDPOINTS.GET_DATA}`);
  return data;
});

export const saveData = createAsyncThunk(
  "queryData/saveData",
  async (queryData) => {
    const response = await apiClient.post(ENDPOINTS.SAVE_DATA, queryData);
    return response;
  }
);
