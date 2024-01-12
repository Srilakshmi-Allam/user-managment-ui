import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchBenefitRuleData = createAsyncThunk(
    "benefitrules/fetchBenefitRuleData",
    async ({ page, pageSize }) => {
        const filterByLatest = true;
        const { data } = await apiClient.get(
            `${ENDPOINTS.BR}?page=${page}&pageSize=${pageSize}&filterByLatest=${filterByLatest}`
        );
        return data;
    }
);

// export const fetchBenefitRuleData = createAsyncThunk(
//     "benefitrules/fetchBenefitRuleData",
//     async ({ page, pageSize, filters }) => {
//         const { data } = await apiClient.get(
//             `${ENDPOINTS.BENEFIT_RULES}/${page}/${pageSize}?${filters}`
//         );
//         return data;
//     }
// );

export const fetchBenefitRuleByID = createAsyncThunk(
    "benefitrules/fetchBenefitRuleByID",
    async (benefitRuleId) => {
        const { data } = await apiClient.get(`${ENDPOINTS.BR}/${benefitRuleId}`);
        return data;
    }
);

export const updateBRData = createAsyncThunk(
    "benefitruleslist/update",
    async ({ updatedData, benefitRuleDataById }, thunkAPI) => {
        try {
            const { BenefitRuleKey } = updatedData;
            const response = await apiClient.put(
                `${ENDPOINTS.BR}/${BenefitRuleKey}`,
                updatedData
            );

            return { updated: response?.data, main: benefitRuleDataById };
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

export const CreateBRData = createAsyncThunk(
    "benefitGroups/CreateBRData",
    async (BRData) => {
        const response = await apiClient.post(ENDPOINTS.BR, BRData);
        return response;
    }
);