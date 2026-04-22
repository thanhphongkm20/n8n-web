import { callApi } from "./axios.client";

const authEndpoints = {
  verifyToken: "auth/verify-token",
  passwordChange: "users/password/change",
  // forgotPassword: "users/password/forgot",
  // resetPassword: "users/password/reset",
};

const authApi = {
  verifyToken: async () => await callApi("post", authEndpoints.verifyToken),
  passwordChange: async (data) =>
    await callApi("put", authEndpoints.passwordChange, data),
  // forgotPassword: async (data) =>
  //   await callApi("post", authEndpoints.forgotPassword, data),
  // resetPassword: async (data) =>
  //   await callApi("post", authEndpoints.resetPassword, data),
};

export default authApi;
