import { Box, Divider, Stack, Typography } from "@mui/material";
import { Hash } from "lucide-react";

import { UI } from "../../configs/constants";

const TAG_COLORS = [
  "#6D5BFF",
  "#14B8A6",
  "#F97316",
  "#D946EF",
  "#38BDF8",
  "#F59E0B",
];

const BlogTagSection = ({ tags = [] }) => {
  if (!tags.length) return null;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1120px",
        mx: "auto",
        pt: 3,
      }}
    >
      <Typography
        sx={{
          color: UI.muted,
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          textAlign: "center",
          mb: 2,
        }}
      >
        Chủ đề phổ biến
      </Typography>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,0.08)",
        }}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          mt: 3,
        }}
      >
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="flex-start"
          sx={{
            width: "100%",
            columnGap: 2,
          }}
        >
          {tags.map((tag, index) => {
            const color = TAG_COLORS[index % TAG_COLORS.length];
            return (
              <Box
                key={tag}
                sx={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  minWidth: 90,
                  height: 44,
                  px: 2.5,
                  borderRadius: "14px",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 700,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
                  overflow: "hidden",
                  transition: "all .22s ease",
                  cursor: "pointer",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle at top right, ${color}22, transparent 65%)`,
                    pointerEvents: "none",
                  },
                  "&:hover": {
                    transform: "translateY(-3px)",
                    borderColor: `${color}70`,
                    boxShadow: `0 14px 34px ${color}18`,
                  },
                }}
              >
                <Hash
                  size={15}
                  color={color}
                  style={{
                    position: "relative",
                    zIndex: 1,
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {tag}
                </span>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default BlogTagSection;