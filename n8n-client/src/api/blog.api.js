import { callApi } from "./axios.client";
import { generateQueryString } from "./user.api";

const blogEndpoints = {
  list: "blogs/",
  byId: (id) => `blogs/${id}`,
  bySlug: (slug) => `blogs/slug/${slug}`,
};

const blogApi = {
  list: (query = {}) => {
    const queryString = generateQueryString(query);
    return callApi("get", `${blogEndpoints.list}?${queryString}`);
  },

  create: (data) => {
    return callApi("post", blogEndpoints.list, data);
  },

  update: (id, data) => {
    return callApi("put", blogEndpoints.byId(id), data);
  },

  getById: (id) => {
    return callApi("get", blogEndpoints.byId(id));
  },

  getBySlug: (slug) => {
    return callApi("get", blogEndpoints.bySlug(slug));
  },

  remove: (id) => {
    return callApi("delete", blogEndpoints.byId(id));
  },
};

export default blogApi;