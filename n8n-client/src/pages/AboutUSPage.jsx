import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  ArrowRight,
  Bot,
  BookOpen,
  Code2,
  Cpu,
  Database,
  Layers3,
  MessageCircle,
  Settings2,
  Workflow,
  Zap,
} from "lucide-react";

import { Link } from "react-router-dom";

import { ROUTES } from "../configs/routes";

const SERVICES = [
  {
    icon: <Workflow size={22} />,
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
    icon: <Settings2 size={22} />,
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
    icon: <BookOpen size={22} />,
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
    icon: <MessageCircle size={22} />,
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

const STACKS = [
  { icon: <Bot size={18} />, label: "AI Automation", color: "#14b8a6" },
  { icon: <Workflow size={18} />, label: "n8n Workflows", color: "#818cf8" },
  { icon: <Code2 size={18} />, label: "API Integration", color: "#fb923c" },
  { icon: <Database size={18} />, label: "Database Systems", color: "#f472b6" },
  { icon: <Cpu size={18} />, label: "Server Scripts", color: "#14b8a6" },
  { icon: <Layers3 size={18} />, label: "Scalable Architecture", color: "#818cf8" },
];

const STATS = [
  { value: "500+", label: "Workflows Built" },
  { value: "120+", label: "Happy Clients" },
  { value: "99%", label: "Uptime Rate" },
  { value: "24h", label: "Support Response" },
];

// ─── Reusable inline pill badge ────────────────────────────
const SectionBadge = ({ children, color = "#14b8a6", borderColor }) => (
  <Box
    sx={{
      display: "inline-flex",
      alignItems: "center",
      gap: 0.8,
      px: 2,
      py: 0.7,
      borderRadius: "100px",
      border: `1px solid ${borderColor ?? color + "55"}`,
      bgcolor: color + "12",
    }}
  >
    <Zap size={11} color={color} />
    <Typography
      sx={{
        color,
        fontSize: 10.5,
        fontWeight: 800,
        letterSpacing: 2.5,
        textTransform: "uppercase",
        lineHeight: 1,
      }}
    >
      {children}
    </Typography>
  </Box>
);

const AboutUsPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#05070d",
        color: "#fff",
        overflowX: "hidden",
      }}
    >
      {/* ── HERO ──────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          pt: { xs: 10, md: 15 },
          pb: { xs: 10, md: 14 },
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          overflow: "hidden",
          background:
            "radial-gradient(ellipse 90% 60% at 50% -5%, rgba(20,184,166,0.17) 0%, transparent 55%), linear-gradient(180deg, #0c1220 0%, #05070d 100%)",
        }}
      >
        {/* Dot grid */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.065) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse 70% 75% at 50% 40%, black 20%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative" }}>
          {/* Everything stacked & centered */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <SectionBadge color="#14b8a6">About N8N Hub</SectionBadge>
            <Typography
              component="h1"
              sx={{
                maxWidth: 860,
                fontSize: { xs: 36, sm: 50, md: 68 },
                lineHeight: 1.03,
                fontWeight: 950,
                letterSpacing: "-0.05em",
                mt: 4,
                mb: 3,
              }}
            >
              Building{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(135deg, #14b8a6 0%, #818cf8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Smarter
              </Box>{" "}
              Automation
              <br />
              For Modern Businesses
            </Typography>

            <Typography
              sx={{
                maxWidth: 600,
                color: "rgba(255,255,255,0.48)",
                fontSize: { xs: 15, md: 17 },
                lineHeight: 1.85,
                mb: 5,
              }}
            >
              N8N Hub delivers production-ready workflows, AI-powered
              integrations, and custom automation systems designed to help
              teams reduce manual work, scale operations, and move faster.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── STATS BAR ─────────────────────────────────────── */}
      <Box sx={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2,1fr)", md: "repeat(4,1fr)" },
            }}
          >
            {STATS.map((s, i) => (
              <Box
                key={s.label}
                sx={{
                  py: { xs: 3.5, md: 4.5 },
                  px: 3,
                  textAlign: "center",
                  borderRight: {
                    xs: i % 2 === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    md: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 28, md: 38 },
                    fontWeight: 950,
                    letterSpacing: "-0.04em",
                    background: "linear-gradient(180deg,#fff 40%,rgba(255,255,255,0.35))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.35)",
                    fontSize: 12.5,
                    fontWeight: 600,
                    mt: 0.5,
                  }}
                >
                  {s.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── SERVICES ──────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        {/* Section header — centered block */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", mb: 7 }}>
          <SectionBadge color="#818cf8">What We Build</SectionBadge>

          <Typography
            component="h2"
            sx={{
              maxWidth: 580,
              fontSize: { xs: 28, md: 44 },
              lineHeight: 1.12,
              fontWeight: 950,
              letterSpacing: "-0.04em",
              mt: 3,
            }}
          >
            Practical automation products for
            real operations.
          </Typography>
        </Box>

        {/* Cards grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: 2,
          }}
        >
          {SERVICES.map((service) => (
            <Paper
              key={service.title}
              elevation={0}
              sx={{
                position: "relative",
                overflow: "hidden",
                p: { xs: 3.5, md: 4.5 },
                borderRadius: "26px",
                bgcolor: "rgba(255,255,255,0.028)",
                border: "1px solid rgba(255,255,255,0.07)",
                transition: "all 0.28s ease",
                cursor: "default",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`,
                  opacity: 0,
                  transition: "opacity 0.28s ease",
                },
                "&:hover": {
                  transform: "translateY(-5px)",
                  borderColor: service.borderHover,
                  bgcolor: service.glow,
                  "&::before": { opacity: 1 },
                },
              }}
            >
              {/* Watermark — pushed to bottom-right, lower opacity */}
              <Typography
                aria-hidden
                sx={{
                  position: "absolute",
                  bottom: -8,
                  right: 20,
                  fontSize: 90,
                  fontWeight: 950,
                  lineHeight: 1,
                  color: `${service.accent}07`,
                  letterSpacing: "-0.06em",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {service.tag}
              </Typography>

              <Stack spacing={2.5} sx={{ position: "relative" }}>
                {/* Icon + tag */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "15px",
                      display: "grid",
                      placeItems: "center",
                      color: service.accent,
                      bgcolor: `${service.accent}18`,
                      border: `1px solid ${service.accent}30`,
                    }}
                  >
                    {service.icon}
                  </Box>
                  <Box
                    sx={{
                      px: 1.4, py: 0.5,
                      borderRadius: "8px",
                      bgcolor: `${service.accent}12`,
                      border: `1px solid ${service.accent}22`,
                    }}
                  >
                    <Typography sx={{ color: service.accent, fontSize: 10.5, fontWeight: 800, letterSpacing: 1.5 }}>
                      {service.tag}
                    </Typography>
                  </Box>
                </Box>

                {/* Title & desc */}
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: 19, md: 21 },
                      fontWeight: 900,
                      color: "#fff",
                      letterSpacing: "-0.025em",
                      mb: 1.2,
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.44)", fontSize: 14, lineHeight: 1.78 }}>
                    {service.description}
                  </Typography>
                </Box>

                {/* Divider */}
                <Box sx={{ height: "1px", bgcolor: "rgba(255,255,255,0.06)" }} />

                {/* Feature list */}
                <Stack spacing={1.1}>
                  {service.items.map((item) => (
                    <Box key={item} sx={{ display: "flex", gap: 1.3, alignItems: "flex-start" }}>
                      <Box
                        sx={{
                          mt: "4px",
                          width: 16, height: 16,
                          borderRadius: "50%",
                          bgcolor: `${service.accent}16`,
                          border: `1px solid ${service.accent}38`,
                          display: "grid",
                          placeItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: service.accent }} />
                      </Box>
                      <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: 13.5, lineHeight: 1.6 }}>
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Box>

        {/* ── TECH STACK ──────────────────────────────────── */}
        <Box sx={{ mt: 10, pt: 7, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Typography
            sx={{
              textAlign: "center",
              color: "rgba(255,255,255,0.2)",
              fontSize: 10.5,
              fontWeight: 800,
              letterSpacing: 3,
              textTransform: "uppercase",
              mb: 4,
            }}
          >
            Technology Stack
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(6, 1fr)",
              },
              gap: 1.5,
            }}
          >
            {STACKS.map((item) => (
              <Paper
                key={item.label}
                elevation={0}
                sx={{
                  p: "13px 14px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  bgcolor: "rgba(255,255,255,0.028)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  transition: "all 0.2s ease",
                  cursor: "default",
                  "&:hover": {
                    bgcolor: `${item.color}10`,
                    borderColor: `${item.color}33`,
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <Box sx={{ color: item.color, display: "flex", flexShrink: 0 }}>{item.icon}</Box>
                <Typography
                  sx={{
                    fontSize: 12.5,
                    fontWeight: 800,
                    color: "rgba(255,255,255,0.7)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUsPage;