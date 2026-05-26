import { callApi } from "./axios.client";
import { generateQueryString } from "./user.api";

const quoteEndpoints = {
  base: "quote/",
  byId: (id) => `quote/${id}`,
};

const quoteApi = {
  requestQuote: (data) => {
    return callApi("post", quoteEndpoints.base, data);
  },
  list: (query = {}) => {
    const queryString = generateQueryString(query);
    return callApi("get", `${quoteEndpoints.base}?${queryString}`);
  },

  getById: (id) => {
    return callApi("get", quoteEndpoints.byId(id));
  },

  remove: (id) => {
    return callApi("delete", quoteEndpoints.byId(id));
  },
};

export default quoteApi;