import {
  BookOpen,
  Calculator,
  Ellipsis,
  Play,
  Users,
  Wrench,
  FileText,
  MessageSquare,
  Bot,
  Workflow,
  Code2,
  Database,
  Cpu,
  Layers3,
  Settings2,
  MessageCircle,
  Sparkles,
  Rocket,
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

export const STACKS = [
  { icon: Bot, label: "AI Automation", color: "#14b8a6" },
  { icon: Workflow, label: "n8n Workflows", color: "#818cf8" },
  { icon: Code2, label: "API Integration", color: "#fb923c" },
  { icon: Database, label: "Database Systems", color: "#f472b6" },
  { icon: Cpu, label: "Server Scripts", color: "#14b8a6" },
  { icon: Layers3, label: "Scalable Architecture", color: "#818cf8" },
];

export const STATS = [
  { value: "500+", label: "Workflows Built" },
  { value: "120+", label: "Happy Clients" },
  { value: "99%", label: "Uptime Rate" },
  { value: "24h", label: "Support Response" },
];

export const SERVICES = [
  {
    icon: Workflow,
    tag: "01",
    title: "Workflow Marketplace",
    description:
      "Explore a growing library of premium n8n workflows built for real business use cases — from AI content pipelines and CRM automation to e-commerce, marketing, and internal operations.",
    items: [
      "Categorized workflow collections",
      "Advanced filters by difficulty, price, and release date",
      "Detailed setup documentation",
      "One-click JSON import",
    ],
    accent: "#14b8a6",
    glow: "rgba(20,184,166,0.07)",
    borderHover: "rgba(20,184,166,0.38)",
  },

  {
    icon: Settings2,
    tag: "02",
    title: "Custom Automation Solutions",
    description:
      "For businesses with unique processes, we design tailored automation systems based on your workflows, APIs, infrastructure, and operational goals.",
    items: [
      "Custom workflow architecture",
      "AI and API integrations",
      "Database and server automation",
      "End-to-end delivery support",
    ],
    accent: "#818cf8",
    glow: "rgba(129,140,248,0.07)",
    borderHover: "rgba(129,140,248,0.38)",
  },

  {
    icon: BookOpen,
    tag: "03",
    title: "Resources & Technical Tools",
    description:
      "Access practical documentation, deployment guides, scripts, and best practices to keep your automation systems stable, scalable, and easy to maintain.",
    items: [
      "Docker and PM2 setup guides",
      "Webhook configuration tutorials",
      "Backup and server scripts",
      "Community knowledge sharing",
    ],
    accent: "#fb923c",
    glow: "rgba(251,146,60,0.07)",
    borderHover: "rgba(251,146,60,0.38)",
  },

  {
    icon: MessageCircle,
    tag: "04",
    title: "Blog & Automation Insights",
    description:
      "Learn how modern automation improves productivity through case studies, technical tutorials, AI integration guides, and n8n workflow optimization tips.",
    items: [
      "Automation case studies",
      "n8n update news",
      "AI integration tutorials",
      "Security and performance tips",
    ],
    accent: "#f472b6",
    glow: "rgba(244,114,182,0.07)",
    borderHover: "rgba(244,114,182,0.38)",
  },
];

export const STEPS = [
  {
    num: "01",
    title: "Submit Request",
    detail:
      "Describe the problem, objectives, and time-consuming operations. No coding or technical spec knowledge required.",
    icon: FileText,
    visTitle: "Receive Request",
    visDesc: "Fill out the form, our team will contact you within 24 hours.",
    tags: ["Free Consultation", "No Coding Knowledge Required"],
  },

  {
    num: "02",
    title: "Receive Solution & Quote",
    detail:
      "We analyze the process, propose a suitable workflow, and send a clear quote within 48 hours.",
    icon: Sparkles,
    visTitle: "Solution Design",
    visDesc:
      "A workflow outline, timeline, and transparent costs are provided.",
    tags: ["Clear Quote", "Specific Timeline"],
  },

  {
    num: "03",
    title: "Build & Handover",
    detail:
      "Deployment, thorough testing, documentation handover, and 30-day support after workflow goes into use.",
    icon: Rocket,
    visTitle: "Complete Handover",
    visDesc: "Workflow ready to run, with full user manual.",
    tags: ["Thorough Testing", "30-Day Support"],
  },
];

export const USE_CASES = [
  {
    icon: "🤖",
    label: "Internal AI Chatbot",
    desc: "Document Q&A, SOP, company policies — employees no longer need to search manually.",
    tag: "Most Popular",
  },

  {
    icon: "✉️",
    label: "Email Automation",
    desc: "Automatically categorize, reply to, and route emails based on context. Saves hours every day.",
    tag: "Quick win",
  },

  {
    icon: "📊",
    label: "Data Extraction",
    desc: "Automatically read PDFs, invoices, forms, and import data into the system — no need for manual copy-paste.",
    tag: "High ROI",
  },

  {
    icon: "🔗",
    label: "CRM & API Integration",
    desc: "Connect n8n with HubSpot, Notion, Slack, Google Sheets, and more 400 other applications.",
    tag: "Highly customizable",
  },
];

export const BADGES = [
  { dot: "#22c55e", label: "No-code setup" },
  { dot: "#06b6d4", label: "Full integration support" },
  { dot: "#a78bfa", label: "Dedicated team" },
  { dot: "#fbbf24", label: "30-day free support" },
  { dot: "#f472b6", label: "Custom workflow" },
];

export const STATSHOME = [
  { value: "120+", label: "Workflows" },
  { value: "2.4k", label: "Customers" },
  { value: "4.9★", label: "Average Rating" },
  { value: "48h", label: "Support" },
];

export const CATEGORY_OPTIONS = [
  { title: "Marketing", value: "marketing" },
  { title: "AI Automation", value: "ai" },
  { title: "CRM", value: "crm" },
  { title: "E-commerce", value: "ecommerce" },
  { title: "Data", value: "data" },
  { title: "Productivity", value: "productivity" },
  { title: "Sales", value: "sales" },
  { title: "Finance", value: "finance" },
];

export const BADGE_OPTIONS = [
  { title: "Hot", value: "hot" },
  { title: "New", value: "new" },
  { title: "Sale", value: "sale" },
  { title: "Featured", value: "featured" },
  { title: "Best Seller", value: "best-seller" },
  { title: "None", value: "none" },
];

export const CATEGORIES = ["All", "Marketing", "AI", "CRM", "Data", "E-commerce", "Productivity", "Sales", "Finance"];
