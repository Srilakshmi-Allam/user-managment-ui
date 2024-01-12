import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchAll = createAsyncThunk(
  "roles/fetchAll",
  async ({ page, pageSize, filters }) => {
    const { data } = await apiClient.get(
      // `${ENDPOINTS.ROLES_GROUP}/${page}/${pageSize}`
      `${ENDPOINTS.ROLES_GROUP}?page=${page}&pageSize=${pageSize}`
    );
    return data;
  }
);

export const fetchRoleWiseTreeView = createAsyncThunk(
  "roles/fetchRoleWiseTreeView",
  async (roleId) => {
    const { data } = await apiClient.get(`${ENDPOINTS.ROLE_ID}/${roleId}`);
    return data;
  }
);
