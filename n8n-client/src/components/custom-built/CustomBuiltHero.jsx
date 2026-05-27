import { Box, Container, Stack, Typography } from "@mui/material";
import { BADGES } from "../../configs/constants";

const CustomBuiltHero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: { xs: 560, md: 430 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 8, md: 7 },
        bgcolor: "#020617",
        borderBottom: "1px solid rgba(34,197,94,0.18)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -150,
          left: "50%",
          transform: "translateX(-50%)",
          width: { xs: 720, md: 980 },
          height: 560,
          background:
            "radial-gradient(ellipse, rgba(34,197,94,.16) 0%, rgba(6,182,212,.10) 42%, transparent 74%)",
          pointerEvents: "none",
          filter: "blur(10px)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.7) 0.5px, transparent 0.5px)",
          backgroundSize: "6px 6px",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth={false}
        disableGutters
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            mx: "auto",
          }}
        >
          <Typography
            sx={{
              color: "#22c55e",
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            Build Custom Automation
          </Typography>

          <Typography
            component="h1"
            sx={{
              width: "100%",
              textAlign: "center",
              color: "#fff",
              fontSize: { xs: 46, sm: 72, md: 96 },
              fontWeight: 950,
              lineHeight: 0.95,
              letterSpacing: "-0.06em",
              whiteSpace: { xs: "normal", md: "nowrap" },
              mb: 3,
            }}
          >
            <Box
              component="span"
              sx={{
                background:
                  "linear-gradient(135deg,#22c55e 0%, #4ade80 40%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              CUSTOM
            </Box>{" "}
            SOLUTIONS
          </Typography>

          <Typography
            sx={{
              width: "100%",
              maxWidth: 760,
              mx: "auto",
              color: "rgba(226,232,240,0.72)",
              fontSize: { xs: 16, md: 19 },
              lineHeight: 1.8,
              textAlign: "center",
            }}
          >
            Tailored AI automation systems built specifically for your
            workflows, business operations, internal processes, and scaling
            goals.
          </Typography>

          <Box
            sx={{
              mt: 4,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1.4,
            }}
          >
            {BADGES.map((badge) => (
              <Box
                key={badge.label}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  px: 2.4,
                  py: 1,
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  bgcolor: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(14px)",
                  color: "rgba(240,240,245,0.68)",
                  fontSize: 13,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: badge.dot,
                    boxShadow: `0 0 10px ${badge.dot}`,
                  }}
                />

                {badge.label}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CustomBuiltHero;