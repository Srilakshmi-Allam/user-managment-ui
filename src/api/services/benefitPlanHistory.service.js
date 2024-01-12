import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchBPHData = createAsyncThunk(
    "benefitPlanHistory/fetchBPHData",
    async ({ page, pageSize }) => {
        const { data } = await apiClient.get(
            `${ENDPOINTS.BPH}?page=${page}&pageSize=${pageSize}`
        );
        return data;
    }
);


export const fetchBPHByBPID = createAsyncThunk(
    "benefitPlanHistory/fetchBPHByBPID",
    async (BenefitPlanID) => {
        const { data } = await apiClient.get(`${ENDPOINTS.BPH_BPID}/${BenefitPlanID}`);
        return data;
    }
);

export const fetchBPHByKey = createAsyncThunk(
    "benefitPlanHistory/fetchBPHByKey",
    async (benefitPlanHistoryKey) => {
        const data = await apiClient.get(`${ENDPOINTS.BPH}/${benefitPlanHistoryKey}`);
        return data;
    }
);

// export const updateBPHData = createAsyncThunk(
//     "benefitPlanHistory/updateBPHData",
//     async ({ BenefitPlanHistoryKey, updatedData }, thunkAPI) => {
//         try {
//             const response = await apiClient.put(
//                 `${ENDPOINTS.BPH}/${BenefitPlanHistoryKey}`,
//                 updatedData
//             );

//             return response?.data;
//         } catch (error) {
//             const message =
//                 (error.response &&
//                     error.response.data &&
//                     error.response.data.message) ||
//                 error.message ||
//                 error.toString();
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );

export const updateBPHData = createAsyncThunk(
    "benefitPlanHistory/updateBPHData",
    async (updatedData, thunkAPI) => {
        try {
            const { BenefitPlanHistoryKey } = updatedData;
            const response = await apiClient.put(
                `${ENDPOINTS.BPH}/${BenefitPlanHistoryKey}`,
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

export const CreateBPHData = createAsyncThunk(
    "benefitPlanHistory/CreateBPHData",
    async (BPHData) => {
        const response = await apiClient.post(ENDPOINTS.BPH, BPHData);
        return response;
    }
);