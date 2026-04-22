import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Rating,
  Divider,
  InputAdornment,
} from "@mui/material";
import { Search, ShieldCheck } from "lucide-react";
import { COLORS } from "../common/Colors";
import StackRow from "../common/StackRow";
import Animate from "../common/Animate";
import ArticleHomePage from "./ArticleHomePage";

const HomeMainContent = () => {
  return (
    <Box sx={{ width: "100%", bgcolor: "#f8fafc" }}>
      {/* ================= HERO ================= */}
      <Box
        sx={{
          background: "radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)",
          color: "white",
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md">
          <Animate type="fade">
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%"
              }}
            >
              <Typography
                variant="h2"
                fontWeight={900}
                sx={{
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  mb: 3
                }}
              >
                Master Your Automations <br />
                with{" "}
                <Box component="span" sx={{
                  color: COLORS.SECONDARY,
                  textShadow: `0 0 30px ${COLORS.SECONDARY}66`
                }}>
                  Expert N8N Workflows
                </Box>
              </Typography>
              <Typography
                sx={{
                  color: "#cbd5e1",
                  maxWidth: "650px",
                  fontSize: "1.15rem",
                  lineHeight: 1.6,
                  mb: 6,
                  mx: "auto"
                }}
              >
                Ready-To-Use Workflows & Custom Automation Solutions Tailored For Your Business. Scale Your Operations Without The Complexity.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 3,
                  justifyContent: "center",
                  width: "100%"
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: COLORS.SECONDARY,
                    px: 6,
                    py: 2,
                    borderRadius: "14px",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "1rem",
                    boxShadow: `0 10px 25px -5px ${COLORS.SECONDARY}55`,
                    "&:hover": {
                      bgcolor: COLORS.SECONDARY,
                      transform: "translateY(-3px)",
                      transition: "0.3s",
                      boxShadow: `0 15px 30px -5px ${COLORS.SECONDARY}77`,
                    }
                  }}
                >
                  Explore Workflows
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    px: 6,
                    py: 2,
                    borderRadius: "14px",
                    textTransform: "none",
                    fontSize: "1rem",
                    backdropFilter: "blur(8px)",
                    "&:hover": {
                      borderColor: "white",
                      background: "rgba(255,255,255,0.08)",
                      transform: "translateY(-3px)",
                      transition: "0.3s"
                    }
                  }}
                >
                  Get Custom Quote
                </Button>
              </Box>
            </Box>
          </Animate>
        </Container>
      </Box>

      {/* 2. Phần Main Content gọi từ file ArticleHomePage */}
      <Box sx={{ width: "100%", bgcolor: "#f8fafc", py: 6 }}>
        <Container maxWidth="xl">
          <ArticleHomePage />
        </Container>
      </Box>

    </Box>
  );
};

export default HomeMainContent;