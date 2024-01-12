import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchFileAPIData = createAsyncThunk(
    "fileAPIConfigurations/fetchFileAPIData",
    async () => {
        const { data } = await apiClient.get(
            `${ENDPOINTS.F_API}`
        );
        return data;
    }
);






