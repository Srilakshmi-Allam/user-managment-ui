import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

export const fetchAuditDetails = createAsyncThunk(
  "audits/fetchAuditDetails",
  async (auditData) => {
    const { data } = await apiClient.post(
      `${ENDPOINTS.AUDIT_DETAILS}`,
      auditData
    );
    return data;
  }
);
