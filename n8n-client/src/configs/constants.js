export const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api/v1/";

export const STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
};

export const APP_STATE = {
  HOME: "HOME",
  USER: "USER",
  ARTICLE: "ARTICLE",
};

export const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

export const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px"];

export const ARTICLE_STATUS_OPTIONS = [
  { title: 'Draft', value: STATUS.DRAFT },
  { title: 'Published', value: STATUS.PUBLISHED },
];