import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchHomeCompanyData = createAsyncThunk(
    "homecompany/fetchHomeCompanyData",
    async () => {
        const { data } = await apiClient.get(
            `${ENDPOINTS.HOMECOMP}`
        );
        return data;
    }
);