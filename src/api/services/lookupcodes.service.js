import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchLookupData = createAsyncThunk(
  "lookupCodes/fetchLookupData",
  async (codeType, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get(
        `${ENDPOINTS.LOOKUPCODE}/${codeType}`
      );
      return { codeType, data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchLookupcodes = createAsyncThunk(
  "lookupCodes/fetchLookupcodes",
  async () => {
  
      const  {data}  = await apiClient.get(
        `${ENDPOINTS.LUC}`
      );
      return data;
      }
);
