import axios from "axios";
import { getApiUrl } from "../config";

let axiosClient;

const setAxiosClient = () => {
  const AXIOS_BASE_CONFIG = {
    baseURL: getApiUrl(),
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  };

  axiosClient = axios.create(AXIOS_BASE_CONFIG);

  axiosClient.interceptors.request.use(
    (req) => {
      const token = localStorage.getItem("access_token");

      if (token && req.headers) {
        req.headers.Authorization = `Bearer ${token}`;
      }

      return req;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("profile");
        window.location.href = "/";
      }
      return Promise.reject(error);
    }
  );
};

const getAxiosClient = () => {
  if (!axiosClient) {
    setAxiosClient();
  }
  return axiosClient;
};

export { setAxiosClient, getAxiosClient };
