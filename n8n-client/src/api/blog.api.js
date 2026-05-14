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
    const url = queryString
      ? `${blogEndpoints.list}?${queryString}`
      : blogEndpoints.list;

    return callApi("get", url);
  },

  create: (data, isFormData = false) => {
    if (isFormData) {
      return callApi("post", blogEndpoints.list, data, null, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    return callApi("post", blogEndpoints.list, data);
  },

  update: (id, data, isFormData = false) => {
    if (isFormData) {
      return callApi("put", blogEndpoints.byId(id), data, null, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

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