import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchAll = createAsyncThunk("nav/fetchAll", async () => {
  const userProfile = JSON.parse(localStorage.getItem("profile"));
  const { data } = await apiClient.get(
    `${ENDPOINTS.USER_SCREENS}/${userProfile.email}`
  );
  return data;
});
