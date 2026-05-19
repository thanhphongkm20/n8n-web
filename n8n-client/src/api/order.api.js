import { callApi } from "./axios.client";

const orderEndpoints = {
  list: "orders/",
  byId: (id) => `orders/${id}`,
  markPaid: (id) => `orders/${id}/paid`,
};

const orderApi = {
  create: (articleId) => {
    return callApi("post", orderEndpoints.list, { articleId });
  },

  getById: (id) => {
    return callApi("get", orderEndpoints.byId(id));
  },

  markPaid: (id) => {
    return callApi("patch", orderEndpoints.markPaid(id));
  },
};

export default orderApi;