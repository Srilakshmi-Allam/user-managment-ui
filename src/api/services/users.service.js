import { createAsyncThunk } from "@reduxjs/toolkit";

import { getAxiosClient } from "../axios";
import { ENDPOINTS } from "../../config";


export const fetchUsersWithSearchParam = createAsyncThunk(
  "users/fetchUsersWithSearchParam",
  async ({ searchFilters, page, pageSize }) => {
    searchFilters = JSON.stringify(searchFilters)
    const { data } = await getAxiosClient().get(
      `${ENDPOINTS.USER}?searchFilters=${searchFilters}&page=${page}&pageSize=${pageSize}`
    );
    return data;
  }
);

export const fetchUsersById = createAsyncThunk(
  "users/fetchUsersById",
  async (userId) => {
    const { data } = await getAxiosClient().get(`${ENDPOINTS.USERSBYID}/${userId}`);
    return data;
  }
);

export const fetchUsersByEmail = createAsyncThunk(
  "users/fetchUsersByEmail",
  async (userEmail) => {
    const { data } = await getAxiosClient().get(
      `${ENDPOINTS.USER_BY_EMAIL}/${userEmail}`
    );
    return data;
  }
);
