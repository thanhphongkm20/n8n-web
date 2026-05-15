import {
  BookOpen,
  Calculator,
  Ellipsis,
  Play,
  Users,
  Wrench,
} from "lucide-react";

export const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api/v1/";

export const STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
};

export const APP_STATE = {
  HOME: "HOME",
  USER: "USER",
  ARTICLE: "ARTICLE",
  RESOURCES: "RESOURCES",
  // BLOG: "BLOG",
};

export const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

export const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px"];

export const ARTICLE_STATUS_OPTIONS = [
  { title: "Draft", value: STATUS.DRAFT },
  { title: "Published", value: STATUS.PUBLISHED },
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

export const RESOURCE_STATUS_OPTIONS = [
  { value: STATUS.PUBLISHED, label: "Published" },
  { value: STATUS.DRAFT, label: "Draft" },
];

export const RESOURCE_TYPES = [
  {
    value: "documentation",
    label: "Documentation",
    icon: BookOpen,
  },
  {
    value: "tool_script",
    label: "Tool & Script",
    icon: Wrench,
  },
  {
    value: "community",
    label: "Community",
    icon: Users,
  },
  {
    value: "tutorial",
    label: "Tutorial",
    icon: Play,
  },
  {
    value: "template",
    label: "Template",
    icon: Calculator,
  },
  {
    value: "other",
    label: "Other",
    icon: Ellipsis,
  },
];

export const UI = {
  bg: "#000000",
  panel: "#242421",
  panel2: "#2B2B28",
  border: "rgba(255,255,255,0.16)",
  muted: "#9A9894",
  text: "#F5F3EE",
  sub: "#C9C5BF",
  purple: "#5B4AC8",
  green: "#159F7B",
  orange: "#E35A32",
};

export const FILTERS = [
  { label: "Tất cả", value: "" },
  { label: "Case Study", value: "case_study" },
  { label: "Update News", value: "news" },
  { label: "Hướng dẫn kỹ thuật", value: "guide" },
];
