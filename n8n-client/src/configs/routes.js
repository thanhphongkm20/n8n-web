export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  USER: {
    LIST: "/users",
    DETAIL: "/users/:id",
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
};
