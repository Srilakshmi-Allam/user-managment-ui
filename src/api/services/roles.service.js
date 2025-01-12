import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosClient } from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchAll = createAsyncThunk(
  "roles/fetchAll",
  async ({ searchFilters, page, pageSize }) => {
    searchFilters = JSON.stringify(searchFilters)
    const { data } = await getAxiosClient().get(
      // `${ENDPOINTS.ROLES_GROUP}/${page}/${pageSize}`
      `${ENDPOINTS.ROLES_GROUP}?searchFilters=${searchFilters}&page=${page}&pageSize=${pageSize}`
    );
    return data;
  }
);

export const fetchRoleWiseTreeView = createAsyncThunk(
  "roles/fetchRoleWiseTreeView",
  async (roleId) => {
    const { data } = await getAxiosClient().get(`${ENDPOINTS.ROLE_ID}/${roleId}`);
    return data;
  }
);
