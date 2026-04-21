export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  USER: {
    LIST: "/users",
    CREATE: "/users/create",
    UPDATE: "/users/:id/update",
  },
  CUSTOM_BUILT: "/custom-built",
  RESOURCES: "/resources",
  BLOG: "/blog",
  COMPANY: "/company",
};

export const ROUTES_GEN = {
  userDetail: (id) => `/users/${id}`,
  userUpdate: (id) => `/users/${id}/update`,
};
