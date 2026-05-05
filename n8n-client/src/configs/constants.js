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

export const BUDGET_OPTIONS = [
  { title: "<$2k", value: "<$2k" },
  { title: "$2k-$5k", value: "$2k-$5k" },
  { title: "$5k-$10k", value: "$5k-$10k" },
  { title: "$10k+", value: "$10k+" },
];

export const TIMELINE_OPTIONS = [
  { title: "2 Weeks", value: "2 Weeks" },
  { title: "1 Month", value: "1 Month" },
  { title: "Flexible", value: "Flexible" },
];