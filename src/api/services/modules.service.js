import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosClient } from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchAll = createAsyncThunk(
  "modules/fetchAll",
  async ({ searchFilters, page, pageSize }) => {
    searchFilters = JSON.stringify(searchFilters)
    const { data } = await getAxiosClient().get(
      `${ENDPOINTS.USER_MODULES}?searchFilters=${searchFilters}&page=${page}&pageSize=${pageSize}`
    );
    return data;
  }
);

export const fetchDataByModuleID = createAsyncThunk(
  "modules/fetchDataByModuleID",
  async (moduleId) => {
    const { data } = await getAxiosClient().get(`${ENDPOINTS.MODULEBYID}/${moduleId}`);
    return data;
  }
);
