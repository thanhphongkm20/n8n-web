import axios from "axios";
import queryString from "query-string";

import { API_URL } from "../configs/constants";

export const getToken = () => localStorage.getItem("access_token");

const axiosClient = axios.create({
  baseURL: API_URL,
  paramsSerializer: queryString.stringify,
});

/** Returns headers for multipart/form-data requests (e.g. file uploads). */
export const multipartHeaders = () => ({
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${getToken()}`,
});

// Request interceptor — attach bearer token when available
axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — unwrap data or normalize errors
axiosClient.interceptors.response.use(
  (response) => response?.data ?? response,
  (error) => {
    const err = error.response?.data ?? { message: "An unknown error occurred" };
    return Promise.reject(err);
  }
);

/**
 * @param {"get"|"post"|"put"|"patch"|"delete"} method
 * @param {string} url
 * @param {object} [data]   — request body (ignored for GET)
 * @param {object} [params] — URL query parameters
 */
export const callApi = (method, url, data, params) =>
  axiosClient({ method, url, data, params });
