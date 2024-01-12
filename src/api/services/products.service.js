import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";
import { ENDPOINTS } from "../../config";

// export const fetchProducts = createAsyncThunk(
//     "products/fetchProdcutsData",
//     async () => {
//         const { data } = await apiClient.get(
//             `${ENDPOINTS.PRODUCTS}/`
//         );
//         return data;
//     }
// );

export const fetchProducts = createAsyncThunk(
  "products/fetchProdcutsData",
  async ({ page, pageSize, formattedURL }) => {
    const { data } = await apiClient.get(
      `${ENDPOINTS.PRODUCTS}?page=${page}&pageSize=${pageSize}&${formattedURL}`
    );
    return data;
  }
);

export const createProduct = createAsyncThunk(
  "products/CreateProdcut",
  async (updatedData) => {
    const response = await apiClient.post(ENDPOINTS.PRODUCTS, updatedData);
    return response;
  }
);

export const fetchProductByID = createAsyncThunk(
  "products/fetchProductsDataByID",
  async (ProductId) => {
    const { data } = await apiClient.get(`${ENDPOINTS.PRODUCTS}/${ProductId}`);
    return data;
  }
);

export const updateProduct = createAsyncThunk(
  "Products/updateProducts",
  async (updatedData, thunkAPI) => {
    try {
      const { productID } = updatedData;
      const response = await apiClient.put(
        `${ENDPOINTS.PRODUCTS}/${productID}`,
        updatedData
      );

      return response?.data;
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
