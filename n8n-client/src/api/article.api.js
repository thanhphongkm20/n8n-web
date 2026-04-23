import { callApi } from "./axios.client";
import { generateQueryString } from "./user.api";

const articleEndpoints = {
  list: "articles/",
  byId: (id) => `articles/${id}`,
  bySlug: (slug) => `articles/slug/${slug}`,
};

const articleApi = {
  list: (query = {}) => {
    const queryString = generateQueryString(query);
    return callApi("get", `${articleEndpoints.list}?${queryString}`);
  },
  create: (data) => {
    return callApi("post", articleEndpoints.list, data);
  },
  update: (id, data) => {
    return callApi("put", articleEndpoints.byId(id), data);
  },
  getById: (id) => {
    return callApi("get", articleEndpoints.byId(id));
  },
  getPreview: (id, params) => {
    return callApi("get", articleEndpoints.byId(id), null, params);
  },
  remove: (id) => {
    return callApi("delete", articleEndpoints.byId(id));
  },
  getBySlug: (slug) => {
    return callApi("get", articleEndpoints.bySlug(slug));
  },
};

export default articleApi;
