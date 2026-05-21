import { callApi } from "./axios.client";

const subscribeEndpoints = {
  subscribe: "subscribe/",
};

const subscribeApi = {
  subscribe: (data) => {
    return callApi("post", subscribeEndpoints.subscribe, data);
  },
};

export default subscribeApi;