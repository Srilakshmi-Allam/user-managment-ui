import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchBenefitGroupsData = createAsyncThunk(
    "benefitGroups/fetchBenefitGroupsData",
    async ({ page, pageSize }) => {
        const filterByLatest = true;
        const { data } = await apiClient.get(
            `${ENDPOINTS.BG}?page=${page}&pageSize=${pageSize}&filterByLatest=${filterByLatest}`
        );
        return data;
    }
);

export const fetchBenefitGroupByID = createAsyncThunk(
    "benefitGroups/fetchBenefitGroupByID",
    async (BenefitGroupID) => {
        const { data } = await apiClient.get(`${ENDPOINTS.BG}/${BenefitGroupID}`);
        return data;
    }
);

export const updateBGData = createAsyncThunk(
    "benefitGroups/updateBGData",
    async ({ updatedData, benefitGroupsDataById }, thunkAPI) => {
        try {
            const { BenefitGroupID, StartDate } = updatedData;
            const response = await apiClient.put(
                `${ENDPOINTS.BG}/${BenefitGroupID}?startDate=${StartDate}`,
                updatedData
            );

            return { updated: response?.data, main: benefitGroupsDataById };
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

export const CreateBGData = createAsyncThunk(
    "benefitGroups/CreateBGData",
    async (BGData) => {
        const response = await apiClient.post(ENDPOINTS.BG, BGData);
        return response;
    }
);