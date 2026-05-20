export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  RESOURCES: "/resources",
  CUSTOM_BUILT: "/custom-built",
  BLOG: "/blog",

  USER: {
    LIST: "/users",
    DETAIL: "/users/:id",
  },
  ARTICLE: {
    LIST: "/articles",
    CREATE: "/articles/create",
    UPDATE: "/articles/:id/update",
    DETAIL: "/articles/:slug",
  },

  RESOURCE: {
    LIST: "/admin/resources",
    CREATE: "/admin/resources/create",
    UPDATE: "/admin/resources/:id/update",
  },

  BLOG_ADMIN: {
    LIST: "/admin/blogs",
    CREATE: "/admin/blogs/create",
    UPDATE: "/admin/blogs/:id/update",
    DETAIL: "/blogs/:slug",
  },

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
  resourceUpdate: (id) => `/admin/resources/${id}/update`,
  blogUpdate: (id) => `/admin/blogs/${id}/update`,
  articleDetail: (slug) => `/articles/${slug}`,
  blogDetail: (slug) => `/blogs/${slug}`,
};
