import axios from "axios";
import { EXALENT_BENEFITS_API } from "../config";

const AXIOS_BASE_CONFIG = {
  baseURL: EXALENT_BENEFITS_API,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
};

const apiClient = axios.create(AXIOS_BASE_CONFIG);

apiClient.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("access_token");

    if (token && req.headers) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => {
    Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("profile");
      window.location.href = "/";
    }
  }
);

export default apiClient;
