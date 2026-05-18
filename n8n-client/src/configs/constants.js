import {
  BookOpen,
  Calculator,
  Ellipsis,
  Play,
  Users,
  Wrench,
  FileText,
  MessageSquare,
} from "lucide-react";
import { createTheme } from "@mui/material/styles";

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
  BLOG: "BLOG",
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
  { label: "All", value: "" },
  { label: "Case Studies", value: "case_study" },
  { label: "News Updates", value: "news" },
  { label: "Technical Guides", value: "guide" },
];

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00C9A7" },
    secondary: { main: "#0ea5e9" },
    background: {
      default: "#060B14",
      paper: "#0D1525",
    },
    text: {
      primary: "#E8EDF5",
      secondary: "#8B9BB4",
    },
    divider: "rgba(255,255,255,0.07)",
  },
  typography: {
    fontFamily: "'Sora', 'Inter', sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
});

export const TYPE_CONFIG = {
  documentation: {
    label: "Documentation",
    Icon: FileText,
    color: "#00C9A7",
    bg: "rgba(0,201,167,0.1)",
  },
  tool_script: {
    label: "Tools & Scripts",
    Icon: Wrench,
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.1)",
  },
  community: {
    label: "Community",
    Icon: MessageSquare,
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.1)",
  },
  tutorial: {
    label: "Tutorial",
    Icon: FileText,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
  },
  template: {
    label: "Template",
    Icon: FileText,
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.1)",
  },
};

export const RESOURCE_TABS = [
  { value: "all", label: "All", Icon: FileText },
  { value: "documentation", label: "Documentation", Icon: BookOpen },
  { value: "tool_script", label: "Tools & Scripts", Icon: Wrench },
  { value: "community", label: "Community", Icon: MessageSquare },
  { value: "tutorial", label: "Tutorial", Icon: Play },
  { value: "template", label: "Template", Icon: Calculator },
];
