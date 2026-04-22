import { callApi } from "./axios.client";

export const generateQueryString = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });
  return query.toString();
};

const userEndpoints = {
  verifyToken: "users/verify-token",
  list: "users",
  login: "users/login",
  profile: "users/profile",
  byId: (id) => `users/${id}`,
};

const userApi = {
  verifyToken: async () => await callApi("get", userEndpoints.verifyToken),

  login: async (data) => {
    return await callApi("post", userEndpoints.login, data);
  },

  list: (query = {}) => {
    const queryString = generateQueryString(query);
    const url = queryString ? `${userEndpoints.list}?${queryString}` : userEndpoints.list;
    return callApi("get", url);
  },

  byId: (id) => {
    return callApi("get", userEndpoints.byId(id));
  },

  create: (data) => {
    return callApi("post", userEndpoints.list, data);
  },

  update: (id, data) => {
    return callApi("put", userEndpoints.byId(id), data);
  },

  getProfile: () => {
    return callApi("get", userEndpoints.profile);
  },

  updateProfile: (data) => {
    return callApi("put", userEndpoints.profile, data);
  },
};

export default userApi;