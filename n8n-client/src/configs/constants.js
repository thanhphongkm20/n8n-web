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
  { title: "Under $2,000", value: "under_2k" },
  { title: "$2,000 - $5,000", value: "2k_5k" },
  { title: "$5,000 - $10,000", value: "5k_10k" },
  { title: "$10,000 - $25,000", value: "10k_25k" },
  { title: "Over $25,000", value: "over_25k" },
  { title: "Not Sure Yet", value: "not_sure" },
];

export const TIMELINE_OPTIONS = [
  { title: "ASAP", value: "asap" },
  { title: "Within 2 Weeks", value: "2_weeks" },
  { title: "Within 1 Month", value: "1_month" },
  { title: "1 - 3 Months", value: "1_3_months" },
  { title: "Flexible", value: "flexible" },
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
  { label: "CASE STUDY", value: "case_study" },
  { label: "UPDATE NEWS", value: "update_news" },
  { label: "TECHNICAL GUIDE", value: "technical_guide" },
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

export const faqs = [
  {
    question: "Do I need coding knowledge?",
    answer:
      "No. This workflow is designed to be used without coding knowledge. You only need to import the workflow and follow the setup guide.",
  },
  {
    question: "Does this workflow run on n8n Cloud or self-hosted?",
    answer:
      "Yes. It can run on both n8n Cloud and self-hosted n8n, as long as the required credentials and integrations are configured correctly.",
  },
  {
    question: "Will I receive future updates after purchase?",
    answer:
      "Yes. You will receive future workflow updates when improvements or fixes are released.",
  },
  {
    question: "What if I can't get the setup working?",
    answer:
      "You can follow the included documentation and walkthrough. If you still have trouble, support is available to help you complete the setup.",
  },
];

export const levels = [
  { label: "Yếu", color: "error", value: 25 },
  { label: "Trung bình", color: "warning", value: 50 },
  { label: "Khá mạnh", color: "info", value: 75 },
  { label: "Mạnh", color: "success", value: 100 },
];
