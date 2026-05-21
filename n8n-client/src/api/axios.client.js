import axios from "axios";
import queryString from "query-string";

import { API_URL } from "../configs/constants";

export const getToken = () => localStorage.getItem("access_token");

const axiosClient = axios.create({
  baseURL: API_URL,
  paramsSerializer: queryString.stringify,
});

export const multipartHeaders = () => ({
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${getToken()}`,
});

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
 * @param {object} [data]
 * @param {object} [params]
 */
export const callApi = (method, url, data, params) =>
  axiosClient({ method, url, data, params });
