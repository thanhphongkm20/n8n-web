import { Box, Chip, Container, Grid, Typography } from "@mui/material";
import { ResourceSTATS, UI } from "../../configs/constants";

const ResourceHero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 5, md:10 },
        bgcolor: "#020617",
        borderBottom: "1px solid rgba(34,197,94,0.14)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -220,
          left: "50%",
          transform: "translateX(-50%)",
          width: { xs: 760, md: 1200 },
          height: 620,
          background:
            "radial-gradient(ellipse, rgba(6,182,212,0.22) 0%, rgba(34,197,94,0.12) 38%, rgba(2,6,23,0) 72%)",
          filter: "blur(18px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.2) 0%, #020617 78%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Box sx={{ textAlign: "center" }} position="relative">
          <Typography
            sx={{
              color: "#22c55e",
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            Share Knowledge
          </Typography>
          <Typography
            sx={{
              color: "#f8fafc",
              fontSize: { xs: 42, md: 60 },
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              mb: 2.5,
              fontFamily: "Georgia, serif",
            }}
          >
            Resources & Tools
          </Typography>
          <Typography
            sx={{
              color: "rgba(226,232,240,0.82)",
              fontSize: { xs: 16, md: 18 },
              lineHeight: 1.7,
              maxWidth: 820,
              mb: 5,
              textAlign: "center",
              mx: "auto",
            }}
          >
            Real-world case studies, n8n feature updates, and in-depth technical guides on AI automation.
          </Typography>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mt: 6,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 3,
              }}
            >
              {ResourceSTATS.map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    px: 4,
                    py: 2.2,
                    minWidth: 180,
                    borderRadius: 999,
                    bgcolor: "rgba(15,23,42,0.65)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(14px)",
                    transition: "all .25s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      borderColor: "rgba(32,224,202,0.35)",
                      boxShadow: "0 0 30px rgba(32,224,202,0.12)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 30, md: 36 },
                      fontWeight: 900,
                      lineHeight: 1,
                      color: "#20e0ca",
                      mb: 0.5,
                    }}
                  >
                    {item.value}
                  </Typography>

                  <Typography
                    sx={{
                      color: "rgba(226,232,240,0.72)",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ResourceHero;