import { Box, Container, Typography } from "@mui/material";
import { USE_CASES } from "../../configs/constants";

const CustomBuiltUseCases = () => {
  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 8, md: 12 },
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
            "radial-gradient(circle at 50% 0%, rgba(34,197,94,0.16), transparent 34%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", maxWidth: 760, mx: "auto" }}>
          <Typography
            sx={{
              color: "#22c55e",
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            Example application
          </Typography>

          <Typography
            sx={{
              color: "#f8fafc",
              fontSize: { xs: 36, md: 58 },
              fontWeight: 950,
              letterSpacing: "-0.055em",
              lineHeight: 0.95,
              textShadow: "0 12px 40px rgba(0,0,0,0.45)",
            }}
          >
            We did it.
            <Box
              component="span"
              sx={{
                display: "block",
                color: "rgba(248,250,252,0.22)",
                mt: 2,
              }}
            >
              What did we do?
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 2.5,
              mx: "auto",
              color: "rgba(226,232,240,0.58)",
              fontSize: { xs: 15, md: 16 },
              lineHeight: 1.8,
              maxWidth: 560,
            }}
          >
            Each solution is built specifically — no generic templates for everyone.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: { xs: 2, md: 2.5 },
            mt: { xs: 5, md: 7 },
          }}
        >
          {USE_CASES.map((item) => (
            <Box
              key={item.label}
              sx={{
                position: "relative",
                overflow: "hidden",
                p: { xs: 3, md: 4 },
                minHeight: { xs: 230, md: 245 },
                borderRadius: "28px",
                border: "1px solid rgba(255,255,255,0.10)",
                bgcolor: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textAlign: "left",
                transition: "all .28s ease",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at 20% 0%, rgba(34,197,94,0.12), transparent 36%)",
                  opacity: 0,
                  transition: "opacity .28s ease",
                },
                "&:hover": {
                  borderColor: "rgba(34,197,94,0.35)",
                  transform: "translateY(-6px)",
                  boxShadow:
                    "0 28px 80px rgba(0,0,0,0.48), inset 0 1px 0 rgba(255,255,255,0.08)",
                },
                "&:hover::before": {
                  opacity: 1,
                },
              }}
            >
              <Typography
                sx={{
                  position: "absolute",
                  top: 30,
                  right: 30,
                  color: "rgba(148,163,184,0.35)",
                  fontSize: 20,
                  lineHeight: 1,
                }}
              >
                ↗
              </Typography>

              <Box
                sx={{
                  position: "relative",
                  width: 48,
                  height: 48,
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  bgcolor: "rgba(255,255,255,0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  boxShadow: "0 14px 35px rgba(0,0,0,0.3)",
                  mb: 3.5,
                }}
              >
                {item.icon}
              </Box>

              <Typography
                sx={{
                  position: "relative",
                  color: "#f8fafc",
                  fontSize: { xs: 18, md: 20 },
                  fontWeight: 950,
                  letterSpacing: "-0.03em",
                  mb: 1.5,
                }}
              >
                {item.label}
              </Typography>

              <Typography
                sx={{
                  position: "relative",
                  color: "rgba(226,232,240,0.55)",
                  fontSize: 14.5,
                  lineHeight: 1.8,
                  maxWidth: 430,
                }}
              >
                {item.desc}
              </Typography>

              <Box
                component="span"
                sx={{
                  position: "relative",
                  mt: 2,
                  px: 2,
                  py: 1,
                  borderRadius: 999,
                  border: "1px solid rgba(34,197,94,0.35)",
                  color: "#22c55e",
                  bgcolor: "rgba(34,197,94,0.08)",
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: ".08em",
                }}
              >
                {item.tag}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CustomBuiltUseCases;