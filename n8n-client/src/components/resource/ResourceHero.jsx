import { Box, Chip, Container, Grid, Typography } from "@mui/material";
import { UI } from "../../configs/constants";

const STATS = [
  {
    value: "48+",
    label: "Resources published",
  },
  {
    value: "12K+",
    label: "Total downloads",
  },
  {
    value: "98%",
    label: "Positive feedback",
  },
];

const ResourceHero = () => {
  return (
    <Box
      sx={{
        bgcolor: UI.bg,
        minHeight: "10vh",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" position="relative">
          <Typography
            sx={{
              color: UI.muted,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Chia sẻ kiến thức
          </Typography>

          <Typography
            sx={{
              color: UI.text,
              fontSize: { xs: 34, md: 44 },
              fontWeight: 800,
              lineHeight: 1.1,
              fontFamily: "Georgia, serif",
              mb: 1.5,
            }}
          >
            Tài nguyên & Công cụ
          </Typography>

          <Typography
            sx={{
              color: UI.sub,
              fontSize: { xs: 16, md: 18 },
              lineHeight: 1.7,
              maxWidth: 820,
              mb: 5,

              textAlign: "center",
              mx: "auto",
            }}
          >
            Case study thực tế, cập nhật tính năng n8n, và hướng dẫn kỹ thuật
            chuyên sâu về AI automation.
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
              {STATS.map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    minWidth: 180,
                    px: 5,
                    py: 3.5,
                    borderRadius: "999px",
                    bgcolor: "rgba(13,21,37,0.88)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    textAlign: "center",
                    transition: "all 0.25s ease",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      border: "1px solid rgba(0,201,167,0.3)",
                      boxShadow: "0 18px 40px rgba(0,201,167,0.12)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      mb: 0.5,
                      fontSize: {
                        xs: "2rem",
                        md: "2.3rem",
                      },
                      fontWeight: 900,
                      color: "#00E0B8",
                      lineHeight: 1,
                      letterSpacing: "-1px",
                    }}
                  >
                    {item.value}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: "rgba(255,255,255,0.72)",
                      fontWeight: 500,
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