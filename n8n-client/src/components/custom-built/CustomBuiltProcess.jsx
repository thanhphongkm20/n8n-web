import { useState } from "react";
import { Box, Container, Typography, Stack, Chip } from "@mui/material";
import { ArrowRight, CheckCircle2, FileText, Rocket, Sparkles } from "lucide-react";
import { STEPS } from "../../configs/constants";


const CustomBuiltProcess = () => {
  const [activeStep, setActiveStep] = useState(0);
  const ActiveIcon = STEPS[activeStep].icon;

  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 8, md: 13 },
        borderTop: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
        bgcolor: "#020617",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 20%, rgba(34,197,94,0.12), transparent 34%), radial-gradient(circle at 85% 55%, rgba(20,184,166,0.1), transparent 30%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", maxWidth: 760, mx: "auto" }}>
          <Typography
            sx={{
              color: "#22c55e",
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            Work process
          </Typography>

          <Typography
            sx={{
              color: "#f8fafc",
              fontSize: { xs: 36, md: 64 },
              fontWeight: 950,
              letterSpacing: "-0.055em",
              lineHeight: 0.95,
              mb: 2.5,
            }}
          >
            3 clear steps
            <Box
              component="span"
              sx={{
                display: "block",
                mt: 1,
                color: "rgba(248,250,252,0.22)",
              }}
            >
              from idea to product
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "rgba(226,232,240,0.62)",
              fontSize: { xs: 15, md: 17 },
              lineHeight: 1.8,
            }}
          >
            Transparency from start to finish. You always know what stage your workflow is in,
            what needs to be prepared, and when it can be used.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.02fr .98fr" },
            gap: { xs: 4, md: 7 },
            alignItems: "stretch",
            mt: { xs: 6, md: 9 },
          }}
        >
          <Stack spacing={2}>
            {STEPS.map((step, index) => {
              const isActive = activeStep === index;
              const Icon = step.icon;

              return (
                <Box
                  key={step.num}
                  onMouseEnter={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                  sx={{
                    position: "relative",
                    p: { xs: 2.4, md: 3 },
                    borderRadius: "24px",
                    border: isActive
                      ? "1px solid rgba(34,197,94,0.55)"
                      : "1px solid rgba(255,255,255,0.09)",
                    bgcolor: isActive
                      ? "linear-gradient(135deg, rgba(34,197,94,0.14), rgba(15,23,42,0.82))"
                      : "rgba(15,23,42,0.58)",
                    boxShadow: isActive
                      ? "0 24px 80px rgba(34,197,94,0.12)"
                      : "none",
                    cursor: "pointer",
                    transition: "all .25s ease",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      borderColor: "rgba(34,197,94,0.48)",
                    },
                  }}
                >
                  <Stack direction="row" spacing={2.2} alignItems="flex-start">
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        flexShrink: 0,
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: isActive
                          ? "rgba(34,197,94,0.18)"
                          : "rgba(255,255,255,0.06)",
                        border: isActive
                          ? "1px solid rgba(34,197,94,0.45)"
                          : "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <Icon size={22} color={isActive ? "#22c55e" : "#94a3b8"} />
                    </Box>

                    <Box
                      sx={{
                        flex: 1,
                        width: "100%",
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-start"
                        spacing={2}
                        sx={{
                          width: "100%",
                        }}
                      >
                        <Typography
                          sx={{
                            color: isActive ? "#22c55e" : "#f8fafc",
                            fontSize: { xs: 18, md: 20 },
                            fontWeight: 950,
                            letterSpacing: "-0.02em",
                            textAlign: "left",
                            width: "100%",
                          }}
                        >
                          {step.title}
                        </Typography>
                      </Stack>

                      <Typography
                        sx={{
                          mt: 1,
                          width: "100%",
                          color: "rgba(226,232,240,0.58)",
                          fontSize: 14.5,
                          lineHeight: 1.75,
                          textAlign: "left",
                          display: "block",
                        }}
                      >
                        {step.detail}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              );
            })}
          </Stack>

          <Box
            sx={{
              position: { md: "sticky" },
              top: { md: 32 },
              minHeight: { xs: 420, md: 560 },
              borderRadius: "32px",
              border: "1px solid rgba(255,255,255,0.1)",
              bgcolor: "rgba(15,23,42,0.72)",
              overflow: "hidden",
              p: { xs: 3, md: 4 },
              boxShadow: "0 30px 100px rgba(0,0,0,0.35)",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 50% 22%, rgba(34,197,94,0.18), transparent 42%)",
              }}
            />

            <Box sx={{ position: "relative", zIndex: 1, height: "100%" }}>
              <Box
                sx={{
                  height: "100%",
                  minHeight: { xs: 360, md: 480 },
                  borderRadius: "26px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  bgcolor: "rgba(2,6,23,0.5)",
                  p: { xs: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Stack direction="row" spacing={1}>
                  {STEPS.map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        height: 6,
                        flex: 1,
                        borderRadius: 999,
                        bgcolor:
                          index <= activeStep
                            ? "#22c55e"
                            : "rgba(255,255,255,0.1)",
                        transition: "all .25s ease",
                      }}
                    />
                  ))}
                </Stack>

                <Box sx={{ textAlign: "center", py: 6 }}>
                  <Box
                    sx={{
                      width: 108,
                      height: 108,
                      mx: "auto",
                      mb: 3,
                      borderRadius: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "rgba(34,197,94,0.14)",
                      border: "1px solid rgba(34,197,94,0.35)",
                      boxShadow: "0 0 80px rgba(34,197,94,0.18)",
                    }}
                  >
                    <ActiveIcon size={48} color="#22c55e" />
                  </Box>

                  <Typography
                    sx={{
                      color: "#f8fafc",
                      fontSize: { xs: 25, md: 31 },
                      fontWeight: 950,
                      letterSpacing: "-0.04em",
                      mb: 1.4,
                    }}
                  >
                    {STEPS[activeStep].visTitle}
                  </Typography>

                  <Typography
                    sx={{
                      color: "rgba(226,232,240,0.62)",
                      fontSize: 15,
                      lineHeight: 1.8,
                      maxWidth: 360,
                      mx: "auto",
                    }}
                  >
                    {STEPS[activeStep].visDesc}
                  </Typography>

                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    useFlexGap
                    sx={{
                      mt: 3,
                      width: "100%",
                      maxWidth: 620,
                      mx: "auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {STEPS[activeStep].tags.map((tag) => (
                      <Chip
                        key={tag}
                        icon={<CheckCircle2 size={14} />}
                        label={tag}
                        sx={{
                          height: 34,
                          px: 0.8,
                          borderRadius: "999px",
                          color: "#dcfce7",
                          bgcolor: "rgba(34,197,94,0.10)",
                          border: "1px solid rgba(34,197,94,0.22)",
                          fontWeight: 800,
                          fontSize: 13,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backdropFilter: "blur(10px)",
                          "& .MuiChip-label": {
                            px: 0.6,
                          },
                          "& .MuiChip-icon": {
                            color: "#22c55e",
                            ml: 0.8,
                            mr: 0.4,
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container >
    </Box >
  );
};

export default CustomBuiltProcess;