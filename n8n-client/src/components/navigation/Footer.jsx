import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Link,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Globe, HatGlasses, Mail, Phone } from "lucide-react";

import subscribeApi from "../../api/subscribe.api";
import StackRow from "../common/StackRow";
import FormTextField from "../form/FormTextField";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handleSubscribe = async () => {
    if (!email?.trim()) {
      setSnackbar({
        open: true,
        message: "Please enter your email",
        severity: "warning",
      });

      return;
    }

    try {
      setLoading(true);

      await subscribeApi.subscribe({
        email: email.trim(),
      });

      setSnackbar({
        open: true,
        message: "Subscribed successfully!",
        severity: "success",
      });

      setEmail("");
    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        message:
          error?.response?.data?.message ||
          "Subscribe failed",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        bgcolor: "#020617",
        color: "#f8fafc",
        pt: 10,
        pb: 4,
        position: "relative",
        borderTop: "1px solid rgba(34, 197, 94, 0.2)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, #22c55e, transparent)",
        },
      }}
    >
      <Container maxWidth="lg">
        <StackRow
          justifyContent="space-between"
          sx={{
            alignItems: "flex-start",
            flexDirection: { xs: "column", md: "row" },
            gap: 6,
            mb: 8,
          }}
        >
          <Box sx={{ maxWidth: 380 }}>
            <Typography
              variant="h5"
              fontWeight="900"
              sx={{ mb: 2, color: "#22c55e" }}
            >
              N8N HUB
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#94a3b8", mb: 4, lineHeight: 1.7 }}
            >
              Elevate your automation processes with a workflow library designed
              by top experts.
            </Typography>

            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Subscribe to get the latest workflows
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.2}
              sx={{ width: "100%" }}
            >
              <FormTextField
                size="small"
                placeholder="Enter your email..."
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: 46,
                    color: "#fff",
                    bgcolor: "rgba(255,255,255,0.06)",
                    borderRadius: "12px",
                    transition: "all 0.2s ease",
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.08)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#22c55e",
                    },
                    "&.Mui-focused": {
                      bgcolor: "rgba(255,255,255,0.08)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#22c55e",
                      boxShadow: "0 0 0 3px rgba(34,197,94,0.15)",
                    },
                  },
                  "& input::placeholder": {
                    color: "#94a3b8",
                    opacity: 1,
                  },
                }}
              />

              <Button
                variant="contained"
                disableElevation
                onClick={handleSubscribe}
                disabled={loading}
                sx={{
                  minWidth: 140,
                  height: 46,
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: 14,
                  bgcolor: "#22c55e",
                  color: "#fff",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#16a34a",
                  },
                  "&:active": {
                    transform: "scale(0.98)",
                  },
                  "&.Mui-disabled": {
                    bgcolor: "#22c55e",
                    color: "#fff",
                    opacity: 0.85,
                  },
                }}
              >
                {loading ? (
                  <StackRow sx={{ alignItems: "center", gap: 1 }}>
                    <CircularProgress size={16} sx={{ color: "#fff" }} />
                    Sending...
                  </StackRow>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </Stack>
          </Box>

          <Box
            sx={{
              p: 3,
              borderRadius: "16px",
              bgcolor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(10px)",
              minWidth: 260,
            }}
          >
            <Typography variant="subtitle1" fontWeight="700" sx={{ mb: 3 }}>
              Contact & Connect
            </Typography>

            <Stack spacing={1.5}>
              <ContactItem
                icon={<Mail size={18} />}
                text="contact@n8n.io"
                href="mailto:contact@n8n.io"
              />
              <ContactItem
                icon={<Phone size={18} />}
                text="+84 123 456 789"
                href="tel:+84123456789"
              />
              <ContactItem
                icon={<Globe size={18} />}
                text="n8n.io"
                href="https://n8n.io"
              />
              <ContactItem
                icon={<HatGlasses size={18} />}
                text="Zalo: n8nHub"
                href="https://zalo.me"
              />
            </Stack>
          </Box>
        </StackRow>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mb: 4 }} />

        <StackRow
          justifyContent="space-between"
          sx={{
            alignItems: "center",
            flexDirection: { xs: "column-reverse", sm: "row" },
            gap: 3,
          }}
        >
          <Typography variant="caption" sx={{ color: "#64748b" }}>
            © {new Date().getFullYear()} n8n Hub. All rights reserved.
          </Typography>

          <StackRow sx={{ alignItems: "center", columnGap: "20px" }}>
            <FooterLink small>Privacy Policy</FooterLink>
            <FooterLink small>Terms of Service</FooterLink>
          </StackRow>
        </StackRow>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        onClose={handleCloseSnackbar}
      >
        <Alert
          variant="filled"
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
          sx={{
            width: "100%",
            borderRadius: "12px",
            alignItems: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const ContactItem = ({ icon, text, href }) => (
  <Box
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      px: 2,
      py: 1.2,
      borderRadius: "10px",
      cursor: "pointer",
      transition: "all 0.25s ease",
      textDecoration: "none",
      "&:hover": {
        bgcolor: "rgba(34, 197, 94, 0.08)",
        transform: "translateX(4px)",
      },
    }}
  >
    <Box sx={{ color: "#22c55e" }}>{icon}</Box>

    <Typography variant="body2" sx={{ color: "#cbd5f5", flex: 1 }}>
      {text}
    </Typography>

    <Typography sx={{ color: "#22c55e", fontSize: 12 }}>→</Typography>
  </Box>
);

const FooterLink = ({ children, small }) => (
  <Link
    href="#"
    underline="none"
    sx={{
      fontSize: small ? "12px" : "14px",
      color: "#94a3b8",
      transition: "0.3s",
      "&:hover": {
        color: "#22c55e",
      },
    }}
  >
    {children}
  </Link>
);

const SocialIcon = ({ icon }) => (
  <IconButton
    size="small"
    sx={{
      color: "#94a3b8",
      bgcolor: "rgba(255,255,255,0.03)",
      "&:hover": {
        color: "#22c55e",
        bgcolor: "rgba(34, 197, 94, 0.1)",
        transform: "translateY(-3px)",
      },
    }}
  >
    {icon}
  </IconButton>
);

export default Footer;