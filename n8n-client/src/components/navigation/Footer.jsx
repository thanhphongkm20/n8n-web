import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Divider,
  TextField,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import {
  Mail,
  Phone,
  Globe,
  HatGlasses
} from "lucide-react";
import StackRow from "../common/StackRow";

const Footer = () => {
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
          alignItems="flex-start"
          sx={{
            flexDirection: { xs: "column", md: "row" },
            gap: 6,
            mb: 8,
          }}
        >
          {/* LEFT */}
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
              Nâng tầm quy trình tự động hóa của bạn với thư viện workflow
              được thiết kế bởi các chuyên gia hàng đầu.
            </Typography>

            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Đăng ký nhận workflow mới nhất
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                size="small"
                placeholder="Email của bạn..."
                fullWidth
                sx={{
                  bgcolor: "rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.1)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#22c55e",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#22c55e",
                      boxShadow: "0 0 0 1px rgba(34,197,94,0.3)",
                    },
                  },
                }}
              />

              <Button
                variant="contained"
                sx={{
                  bgcolor: "#22c55e",
                  "&:hover": { bgcolor: "#16a34a" },
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 3,
                }}
              >
                Gửi
              </Button>
            </Box>
          </Box>

          {/* RIGHT - CARD */}
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
              Liên hệ & Kết nối
            </Typography>

            <Stack spacing={1.5}>
              <ContactItem icon={<Mail size={18} />} text="contact@n8n.io" />
              <ContactItem icon={<Phone size={18} />} text="+84 123 456 789" />
              <ContactItem icon={<Globe size={18} />} text="n8n.io" />
              <ContactItem icon={<HatGlasses size={18} />} text="Zalo: n8nHub" />
            </Stack>
          </Box>
        </StackRow>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mb: 4 }} />

        {/* BOTTOM */}
        <StackRow
          justifyContent="space-between"
          alignItems="center"
          sx={{
            flexDirection: { xs: "column-reverse", sm: "row" },
            gap: 3,
          }}
        >
          <Typography variant="caption" sx={{ color: "#64748b" }}>
            © {new Date().getFullYear()} n8n Hub. All rights reserved.
          </Typography>

          <StackRow gap={3}>
            <FooterLink small>Privacy Policy</FooterLink>
            <FooterLink small>Terms of Service</FooterLink>
          </StackRow>
        </StackRow>
      </Container>
    </Box>
  );
};

/* CONTACT ITEM */
const ContactItem = ({ icon, text }) => (
  <Stack
    direction="row"
    spacing={2}
    alignItems="center"
    sx={{
      px: 2,
      py: 1.2,
      borderRadius: "10px",
      cursor: "pointer",
      transition: "all 0.25s ease",
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
  </Stack>
);

/* LINK */
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

/* SOCIAL ICON */
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