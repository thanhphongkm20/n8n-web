import { callApi } from "./axios.client";
import { generateQueryString } from "./user.api";

const resourceEndpoints = {
  list: "resources/",
  byId: (id) => `resources/${id}`,
  bySlug: (slug) => `resources/slug/${slug}`,
};

const resourceApi = {
  list: (query = {}) => {
    const queryString = generateQueryString(query);
    return callApi("get", `${resourceEndpoints.list}?${queryString}`);
  },

  create: (data) => {
    return callApi("post", resourceEndpoints.list, data);
  },

  update: (id, data) => {
    return callApi("put", resourceEndpoints.byId(id), data);
  },

  getById: (id) => {
    return callApi("get", resourceEndpoints.byId(id));
  },

  getBySlug: (slug) => {
    return callApi("get", resourceEndpoints.bySlug(slug));
  },

  remove: (id) => {
    return callApi("delete", resourceEndpoints.byId(id));
  },
};

export default resourceApi;
