import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchBenefitPlanData = createAsyncThunk(
    "benefitPlans/fetchBenefitPlanData",
    async ({ page, pageSize }) => {
        const { data } = await apiClient.get(
            `${ENDPOINTS.BP}?page=${page}&pageSize=${pageSize}`
        );
        return data;
    }
);


export const fetchBenefitPlanByID = createAsyncThunk(
    "benefitPlans/fetchBenefitPlanByID",
    async (benefitPlanId) => {
        const data = await apiClient.get(`${ENDPOINTS.BP}/${benefitPlanId}`);
        return data;
    }
);

export const updateBPData = createAsyncThunk(
    "benefitPlans/updateBPData",
    async (updatedData, thunkAPI) => {
        try {
            const { BenefitPlanID } = updatedData
            const response = await apiClient.put(
                `${ENDPOINTS.BP}/${BenefitPlanID}`,
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

export const CreateBPData = createAsyncThunk(
    "benefitPlans/CreateBPData",
    async (BPData) => {
        const response = await apiClient.post(ENDPOINTS.BP, BPData);
        return response;
    }
);