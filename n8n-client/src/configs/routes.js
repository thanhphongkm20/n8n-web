export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  USER: {
    LIST: "/users",
    DETAIL: "/users/:id",
  },
  ARTICLE: {
    LIST: "/articles",
    CREATE: "/articles/create",
    UPDATE: "/articles/:id",
  },

  CUSTOM_BUILT: "/custom-built",
  RESOURCES: "/resources",
  BLOG: "/blog",
  ACCOUNT: {
    SETTINGS: "/account/settings",
    EDIT_NAME: "/account/edit/name",
    EDIT_EMAIL: "/account/edit/email",
    EDIT_PASSWORD: "/account/edit/password",
    EDIT_AVATAR: "/account/edit/avatar",
  },
};

export const ROUTES_GEN = {
  userDetail: (id) => `/users/${id}`,
  articleUpdate: (id) => `/articles/${id}/update`,
};
