import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  Divider,
} from "@mui/material";
import { ArrowRight, Sparkles } from "lucide-react";

import { COLORS } from "../common/Colors";
import Animate from "../common/Animate";
import ArticleHomePage from "./ArticleHomePage";
import { STATSHOME } from "../../configs/constants";

const HomeMainContent = () => {
  return (
    <Box sx={{ width: "100%", bgcolor: "#f8fafc" }}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          minHeight: { xs: 720, md: 820 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          bgcolor: "#020617",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
            radial-gradient(circle at 50% 18%, rgba(20,184,166,0.22), transparent 30%),
            radial-gradient(circle at 50% 58%, rgba(16,185,129,0.10), transparent 36%)
          `,
          backgroundSize: "72px 72px, 72px 72px, 100% 100%, 100% 100%",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(2,6,23,0.16) 0%, rgba(2,6,23,0.58) 52%, rgba(2,6,23,0.92) 100%)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: "8%",
            left: "50%",
            transform: "translateX(-50%)",
            width: { xs: 520, md: 900 },
            height: { xs: 320, md: 460 },
            background:
              "radial-gradient(ellipse, rgba(45,212,191,0.16) 0%, rgba(45,212,191,0.05) 38%, transparent 70%)",
            filter: "blur(8px)",
            pointerEvents: "none",
          }}
        />

        <Container
          maxWidth={false}
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "1240px",
            mx: "auto",
            px: { xs: 2.5, md: 4 },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Animate type="fade">
            <Stack
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              sx={{
                width: "100%",
                maxWidth: 980,
                mx: "auto",
                transform: { md: "translateY(-10px)" },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.7,
                    px: 1.8,
                    py: 0.7,
                    mb: 3.2,
                    width: "fit-content",
                    borderRadius: 999,
                    color: COLORS.SECONDARY,
                    bgcolor: "rgba(20,184,166,0.08)",
                    border: "1px solid rgba(45,212,191,0.34)",
                    boxShadow: "0 0 45px rgba(45,212,191,0.14)",
                    fontSize: 10.5,
                    fontWeight: 950,
                    letterSpacing: 1.1,
                    textTransform: "uppercase",
                  }}
                >
                  <Sparkles size={12} />
                  Ready-To-Use N8N Workflows
                </Box>
              </Box>

              <Typography
                component="h1"
                sx={{
                  maxWidth: 1180,
                  mx: "auto",
                  fontWeight: 750,
                  fontSize: {
                    xs: "3rem",
                    sm: "4.2rem",
                    md: "5.4rem",
                    lg: "5.9rem",
                  },
                  lineHeight: 1.02,
                  letterSpacing: "-0.075em",
                  color: "#f8fafc",
                  textShadow: "0 18px 55px rgba(0,0,0,0.5)",
                }}
              >
                Master Your Automations
                <br />
                with{" "}
                <Box
                  component="span"
                  sx={{
                    color: COLORS.SECONDARY,
                    textShadow: `0 0 46px ${COLORS.SECONDARY}66`,
                  }}
                >
                  Expert N8N Workflows
                </Box>
              </Typography>

              <Typography
                sx={{
                  mt: 3.6,
                  maxWidth: 640,
                  mx: "auto",
                  color: "rgba(226,232,240,0.5)",
                  fontSize: { xs: 15.5, md: 17 },
                  fontWeight: 800,
                  lineHeight: 1.75,
                }}
              >
                Ready-To-Use Workflows & Custom Automation Solutions Tailored
                For Your Business. Scale Your Operations Without The Complexity.
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  mt: 7,
                  width: "100%",
                  maxWidth: 760,
                  mx: "auto",
                  px: { xs: 1.5, sm: 2.5 },
                  py: 2.1,
                  borderRadius: "18px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  bgcolor: "rgba(15,23,42,0.58)",
                  backdropFilter: "blur(18px)",
                  boxShadow: "0 26px 90px rgba(0,0,0,0.32)",
                  flexWrap: "wrap",
                }}
              >
                {STATSHOME.map((item, index) => (
                  <React.Fragment key={item.label}>
                    <Box
                      sx={{
                        flex: "1 1 130px",
                        px: { xs: 1.5, md: 2.5 },
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: COLORS.SECONDARY,
                          fontSize: { xs: 20, md: 23 },
                          fontWeight: 950,
                          lineHeight: 1,
                        }}
                      >
                        {item.value}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 1.15,
                          color: "rgba(226,232,240,0.28)",
                          fontSize: 12,
                          fontWeight: 900,
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>

                    {index < STATSHOME.length - 1 && (
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                          display: { xs: "none", sm: "block" },
                          borderColor: "rgba(255,255,255,0.09)",
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </Stack>
            </Stack>
          </Animate>
        </Container>
      </Box>
      <Box>
        <Container maxWidth="xl">
          <ArticleHomePage />
        </Container>
      </Box>
    </Box>
  );
};

export default HomeMainContent;