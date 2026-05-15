import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Sparkles,
  Tag,
} from "lucide-react";

import {
  formatDate,
  getTypeLabel,
} from "../../utils/blog-resource.util";

import { FILTERS } from "../../configs/constants";

const BlogFeaturedSection = ({
  blogs = [],
  featuredBlog,
  loading,
  activeType,
  setActiveType,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        px: { xs: 2, sm: 3, md: 4 },
        pb: { xs: 7, md: 10 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1280px",
        }}
      >
        {/* FILTER */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mb: 5,
          }}
        >
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            sx={{
              gap: 1.8,
              width: "fit-content",
              maxWidth: "100%",
              mx: "auto",
            }}
          >
            {FILTERS.map((item) => {
              const active = activeType === item.value;
              return (
                <Button
                  key={item.value}
                  onClick={() => setActiveType(item.value)}
                  variant="outlined"
                  sx={{
                    minWidth: 160,
                    height: 56,
                    px: 4,
                    borderRadius: "18px",
                    textTransform: "none",
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: active ? "#050505" : "#fff",
                    bgcolor: active ? "#fff" : "transparent",
                    border: "1px solid",
                    borderColor: active
                      ? "#fff"
                      : "rgba(255,255,255,0.16)",
                    backdropFilter: "blur(12px)",
                    transition: "all .25s ease",
                    boxShadow: active
                      ? "0 12px 30px rgba(255,255,255,0.08)"
                      : "none",
                    "&:hover": {
                      bgcolor: active
                        ? "#fff"
                        : "rgba(255,255,255,0.06)",
                      borderColor: "rgba(255,255,255,0.4)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Stack>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mb: 5,
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "1090px",
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, 1fr)",
              },
              gap: 2,
            }}
          >
            {[
              ["40h", "Tiết kiệm mỗi tuần"],
              [`${blogs.length}+`, "Case study thực tế"],
              ["98%", "Tự động hóa thành công"],
            ].map(([val, lbl]) => (
              <Box
                key={lbl}
                sx={{
                  width: "100%",
                  height: 126,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  borderRadius: "22px",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.018))",
                  border: "1px solid rgba(255,255,255,0.09)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: {
                      xs: 40,
                      md: 48,
                    },
                    fontWeight: 800,
                    lineHeight: 1,
                    mb: 1.2,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {val}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.58)",
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  {lbl}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        {loading && (
          <Box mb={5}>
            <LinearProgress
              sx={{
                height: 7,
                borderRadius: 999,
                bgcolor: "rgba(255,255,255,0.08)",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "#7C5CFF",
                },
              }}
            />
          </Box>
        )}
        {/* FEATURED */}
        {!loading && featuredBlog && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "1fr 1.08fr",
              },
              minHeight: { xs: "auto", lg: 500 },
              overflow: "hidden",
              borderRadius: "26px",
              border: "1px solid rgba(255,255,255,0.1)",
              background:
                "linear-gradient(135deg, rgba(32,32,38,0.96), rgba(19,19,20,0.98))",
              boxShadow: "0 28px 80px rgba(0,0,0,0.42)",
            }}
          >
            {/* LEFT VISUAL */}
            <Box
              sx={{
                minHeight: { xs: 300, md: 420, lg: 500 },
                position: "relative",
                overflow: "hidden",
                bgcolor: "#171629",
                background:
                  "radial-gradient(circle at 0% 0%, rgba(112,83,255,0.34), transparent 34%), linear-gradient(135deg, #191733 0%, #121222 100%)",
              }}
            />
            {/* RIGHT CONTENT */}
            <Box
              sx={{
                px: { xs: 3, md: 5, lg: 6 },
                py: { xs: 4, md: 6 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                textAlign: "left",
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.8,
                  width: "fit-content",
                  maxWidth: "100%",
                  px: 1.7,
                  py: 0.65,
                  mb: 3,
                  borderRadius: 999,
                  bgcolor: "#ECEAFF",
                  color: "#6D5BFF",
                }}
              >
                <Sparkles size={13} fill="#E7B008" color="#E7B008" />

                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 900,
                    lineHeight: 1,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {getTypeLabel(featuredBlog.type)} nổi bật
                </Typography>
              </Box>
              <Typography
                sx={{
                  maxWidth: 580,
                  fontFamily: "Georgia, serif",
                  color: "#fff",
                  fontSize: {
                    xs: 34,
                    sm: 40,
                    md: 46,
                    lg: 48,
                  },
                  fontWeight: 800,
                  lineHeight: 1.12,
                  letterSpacing: "-0.035em",
                  mb: 3,
                  textAlign: "left",
                }}
              >
                {featuredBlog.title}
              </Typography>
              <Typography
                sx={{
                  maxWidth: 610,
                  color: "rgba(255,255,255,0.72)",
                  fontSize: { xs: 16, md: 18 },
                  lineHeight: 1.75,
                  mb: 4,
                  textAlign: "left",
                }}
              >
                {featuredBlog.excerpt}
              </Typography>
              <Stack
                direction="row"
                flexWrap="wrap"
                alignItems="center"
                gap={2.2}
                sx={{
                  color: "rgba(255,255,255,0.48)",
                  fontSize: 14,
                  mb: 4,
                }}
              >
                <Stack direction="row" alignItems="center" gap={0.7}>
                  <CalendarDays size={15} />
                  {formatDate(featuredBlog.published_at || featuredBlog.created_at)}
                </Stack>

                <Stack direction="row" alignItems="center" gap={0.7}>
                  {featuredBlog.reading_time}
                </Stack>
              </Stack>
              <Button
                variant="outlined"
                endIcon={<ArrowRight size={17} />}
                sx={{
                  width: "fit-content",
                  height: 54,
                  px: 3.3,
                  borderRadius: "15px",
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.18)",
                  textTransform: "none",
                  fontSize: 16,
                  fontWeight: 800,
                  "&:hover": {
                    borderColor: "rgba(255,255,255,0.5)",
                    bgcolor: "rgba(255,255,255,0.06)",
                  },
                }}
              >
                Đọc case study
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BlogFeaturedSection;