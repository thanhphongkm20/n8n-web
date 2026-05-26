import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Eye,
  Share2,
} from "lucide-react";

import blogApi from "../../api/blog.api";
import { LoadingPage } from "../bases/LoadingPage";
import { FILTERS } from "../../configs/constants";

const TYPE_COLOR = {
  case_study: "#60a5fa",
  news_update: "#34d399",
  technical_guide: "#fbbf24",
};

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);

        const res = await blogApi.getBySlug(slug);

        const blogData = res?.data?.data || res?.data || res;
        setBlog(blogData);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
        setBlog(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) fetchBlog();
  }, [slug]);

  if (isLoading) return <LoadingPage />;

  const typeLabel = FILTERS.find((f) => f.value === blog.type)?.label || blog.type || "Blog";
  const typeColor = TYPE_COLOR[blog.type] || "#a78bfa";
  const tags = Array.isArray(blog.tags) ? blog.tags : [];

  return (
    <Box
      sx={{
        minHeight: "70vh",
        bgcolor: "#08090f",
        color: "#fff",
        pb: 10,
      }}
    >
      <Container maxWidth="md" sx={{ pt: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Chip
            label={typeLabel}
            sx={{
              mb: 2.5,
              height: 25,
              px: 1,
              bgcolor: `${typeColor}20`,
              color: typeColor,
              border: `1px solid ${typeColor}55`,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              fontSize: 11,
            }}
          />
        </Box>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: 34, md: 46 },
            lineHeight: 1.08,
            fontWeight: 950,
            letterSpacing: "-1.4px",
            textAlign: "left",
          }}
        >
          {blog.title}
        </Typography>
        <Typography
          sx={{
            mt: 2.2,
            color: "#8f90a0",
            fontSize: 17,
            lineHeight: 1.8,
            textAlign: "left",
          }}
        >
          {blog.excerpt}
        </Typography>
        <Stack
          direction="row"
          spacing={2.2}
          sx={{ flexWrap: "wrap" }}
        >
          <Meta
            icon={<BookOpen size={14} />}
            text={`${blog.reading_time} phút đọc`}
          />
          <Meta
            icon={<Eye size={14} />}
            text={`${blog.view_count} lượt xem`}
          />
        </Stack>

        {tags.length > 0 && (
          <Stack
            direction="row"
            spacing={1.2}
            sx={{
              mt: 3,
              flexWrap: "wrap",
            }}
          >
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={`#${tag}`}
                size="small"
                sx={{
                  bgcolor: "rgba(167,139,250,0.12)",
                  color: "#a78bfa",
                  border: "1px solid rgba(167,139,250,0.35)",
                  fontWeight: 800,
                }}
              />
            ))}
          </Stack>
        )}

        <Box
          sx={{
            mt: 4,
            height: { xs: 220, md: 330 },
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            bgcolor:
              "radial-gradient(circle at 28% 45%, rgba(139,92,246,0.45), transparent 26%), radial-gradient(circle at 62% 55%, rgba(34,211,238,0.22), transparent 18%), linear-gradient(135deg, #312e81, #111827)",
          }}
        >
          {blog.thumbnail && !blog.thumbnail.includes("example.com") && (
            <Box
              component="img"
              src={blog.thumbnail}
              alt={blog.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
        </Box>

        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: { xs: 2.5, md: 4 },
            borderRadius: "22px",
            bgcolor: "#111117",
            border: "1px solid rgba(255,255,255,0.09)",

            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",

            textAlign: "left",
          }}
        >
          {(blog.content)
            .split("\n")
            .filter(Boolean)
            .map((line, index) => (
              <Typography
                key={index}
                sx={{
                  width: "100%",
                  color: "#b6b6c8",
                  fontSize: 15,
                  lineHeight: 1.9,
                  mb: 2,
                  textAlign: "left",
                }}
              >
                {line}
              </Typography>
            ))}
        </Paper>

        <Box
          sx={{
            mt: 7,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              startIcon={<Share2 size={16} />}
              sx={bottomBtnSx}
              onClick={() =>
                navigator.share?.({
                  title: blog.title,
                  url: window.location.href,
                })
              }
            >
              Share The Article
            </Button>

            <Button sx={bottomBtnSx} onClick={() => navigate("/blog")}>
              View Other Articles
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box >
  );
};

const Meta = ({ icon, text }) => (
  <Stack direction="row" spacing={0.7} alignItems="center">
    <Box sx={{ color: "#6b7280", display: "flex" }}>{icon}</Box>
    <Typography sx={{ color: "#858696", fontSize: 13 }}>{text}</Typography>
  </Stack>
);

const bottomBtnSx = {
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.24)",
  borderRadius: "10px",
  px: 2.5,
  py: 1,
  textTransform: "none",
  fontWeight: 900,
  "&:hover": {
    bgcolor: "rgba(255,255,255,0.06)",
  },
};

export default BlogDetailPage;