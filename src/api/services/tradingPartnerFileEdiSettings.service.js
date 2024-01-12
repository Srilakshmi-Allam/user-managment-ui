
import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";
export const CreateEDIData = createAsyncThunk(
    "tradingPartnerFileEdiSettings/CreateEDIData",
    async (EDIData) => {
        const { data } = await apiClient.post(ENDPOINTS.F_EDI, EDIData);
        return data;
    }
);

export const fetchTPFEDIDataById = createAsyncThunk(
    "tradingPartnerFileEdiSettings/fetchTPFEDIDataById",
    async (TradingPartnerFileKey) => {
        const { data } = await apiClient.get(
            `${ENDPOINTS.F_EDI}/${TradingPartnerFileKey}`
        );
        return data;
    }
);

export const updateTPFEDIData = createAsyncThunk(
    "tradingPartnerFileEdiSettings/updateTPFEDIData",
    async (updatedData, thunkAPI) => {
        const { TradingPartnerFileKey } = updatedData;
        try {
            const response = await apiClient.put(
                `${ENDPOINTS.F_EDI}/${TradingPartnerFileKey}`,
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