import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchTPFData = createAsyncThunk(
    "tradingPartnerFiles/fetchTPFData",
    async ({ page, pageSize }) => {
        const { data } = await apiClient.get(
            `${ENDPOINTS.TPF}?page=${page}&pageSize=${pageSize}`
        );
        return data;
    }
);

export const fetchTPFDataById = createAsyncThunk(
    "tradingPartnerFiles/fetchTPFDataById",
    async (tradingPartnerKey) => {
        const { data } = await apiClient.get(
            `${ENDPOINTS.TPF_BY_TPKEY}/${tradingPartnerKey}`
        );
        return data;
    }
);

export const fetchTPFByTPFKey = createAsyncThunk(
    "tradingPartnerFiles/fetchTPFByTPFKey",
    async (tradingPartnerFileKey) => {
        const { data } = await apiClient.get(
            `${ENDPOINTS.TPF_BY_TPFKEY}/${tradingPartnerFileKey}`
        );
        return data;
    }
);

export const CreateTPFData = createAsyncThunk(
    "tradingPartnerFiles/CreateTPFData",
    async (TPFData) => {
        const { data } = await apiClient.post(ENDPOINTS.TPF, TPFData);
        return data;
    }
);

export const updateTPFData = createAsyncThunk(
    "tradingPartnerFiles/updateTPFData",
    async (updatedData, thunkAPI) => {
        const { TradingPartnerFileKey } = updatedData;
        try {
            const response = await apiClient.put(
                `${ENDPOINTS.TPF}/${TradingPartnerFileKey}`,
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