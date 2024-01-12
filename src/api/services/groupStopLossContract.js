import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchGSLCData = createAsyncThunk(
  "groupStopLossContracts/fetchGSLCData",
  async ({ page, pageSize, membershipGroupKey }) => {
    const filterByLatest = true;
    let memberQuery = "";
    if (membershipGroupKey) {
      memberQuery = `&membershipGroupKey=${membershipGroupKey}`;
    }

    const { data } = await apiClient.get(
      `${ENDPOINTS.GSLC}?page=${page}&pageSize=${pageSize}${memberQuery}&filterByLatest=${filterByLatest}`
    );
    return data;
  }
);

export const fetchGSLCDataByKey = createAsyncThunk(
  "groupStopLossContracts/fetchGSLCDataByKey",
  async ({ ReInsurerTradingPartnerKey, MembershipGroupKey }) => {
    let memberQuery = "";
    if (MembershipGroupKey) {
      memberQuery = `?MembershipGroupKey=${MembershipGroupKey}`;
    }

    const { data } = await apiClient.get(
      `${ENDPOINTS.GSLC}/${ReInsurerTradingPartnerKey}${memberQuery}`
    );
    return data;
  }
);

export const CreateGSLCData = createAsyncThunk(
  "groupStopLossContracts/CreateGSLCData",
  async (GSLCData) => {
    const { data } = await apiClient.post(ENDPOINTS.GSLC, GSLCData);
    return data;
  }
);

export const updateGSLCData = createAsyncThunk(
  "groupStopLossContracts/updateGSLCData",
  async (updatedData, thunkAPI) => {
    try {
      console.log("updatedData:", updatedData);
      const { GroupStopLossContractKey } = updatedData;
      const response = await apiClient.put(
        `${ENDPOINTS.GSLC}/${GroupStopLossContractKey}`,
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
