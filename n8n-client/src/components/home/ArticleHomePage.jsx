import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Chip,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";
import { Search, Zap, Link2, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import articleApi from "../../api/article.api";
import { ROUTES, ROUTES_GEN } from "../../configs/routes";
import { LoadingPage } from "../../pages/bases/LoadingPage";

const ArticleHomePage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [articlesRes, categoriesRes] = await Promise.all([
          articleApi.list(),
          articleApi.getCategories(),
        ]);

        setArticles(articlesRes?.success && Array.isArray(articlesRes.posts) ? articlesRes.posts : []);

        const backendCategories = Array.isArray(categoriesRes?.categories)
          ? categoriesRes.categories.filter((item) => Boolean(item)).map((item) => String(item))
          : [];

        setCategories(["All", ...Array.from(new Set(backendCategories))]);
      } catch (error) {
        console.error("Failed to fetch articles or categories:", error);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredArticles = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return articles.filter((article) => {
      const title = article?.title?.toLowerCase();
      const description = article?.description?.toLowerCase();
      const articleCategory = article?.category?.toLowerCase();
      const type = article?.type?.toLowerCase();
      const slug = article?.slug?.toLowerCase();
      const matchSearch =
        !keyword ||
        title.includes(keyword) ||
        description.includes(keyword) ||
        articleCategory.includes(keyword) ||
        type.includes(keyword) ||
        slug.includes(keyword);

      const matchCategory =
        category === "All" || articleCategory === category.toLowerCase();
      return matchSearch && matchCategory;
    });
  }, [articles, search, category]);
  const visibleArticles = filteredArticles.slice(0, 9);
  if (isLoading) return <LoadingPage />;

  return (
    <Box
      sx={{
        minHeight: "70vh",
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        bgcolor: "#05080d",
        color: "#f8fafc",
        py: { xs: 5, md: 7 },
        px: { xs: 3, md: 6, lg: 10 },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1280, mx: "auto" }}>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            mb: 4,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { xs: 28, md: 38 },
                fontWeight: 950,
                lineHeight: 1.05,
                letterSpacing: "-0.06em",
              }}
            >
              Featured Workflows{" "}
              <Box component="span" sx={{ color: "rgba(148,163,184,0.25)" }}>
                — pick yours
              </Box>
            </Typography>
          </Box>

          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search workflows..."
            sx={{
              width: { xs: "100%", md: 320 },
              "& .MuiOutlinedInput-root": {
                height: 52,
                borderRadius: 3,
                bgcolor: "rgba(255,255,255,0.045)",
                color: "#e2e8f0",
                border: "1px solid rgba(255,255,255,0.08)",
                "& fieldset": { border: "none" },
              },
              "& input::placeholder": {
                color: "rgba(226,232,240,0.45)",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} color="#64748b" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 1.2, flexWrap: "wrap", mb: 4 }}>
          {categories.map((item) => (
            <Chip
              key={item}
              label={item}
              onClick={() => setCategory(item)}
              sx={{
                px: 1,
                height: 38,
                borderRadius: 999,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all .22s ease",

                color:
                  category === item
                    ? "#20e0ca"
                    : "rgba(226,232,240,0.55)",

                bgcolor:
                  category === item
                    ? "rgba(32,224,202,0.12)"
                    : "rgba(255,255,255,0.025)",

                border:
                  category === item
                    ? "1px solid rgba(32,224,202,0.45)"
                    : "1px solid rgba(255,255,255,0.08)",

                backdropFilter: "blur(10px)",

                "&:hover": {
                  transform: "translateY(-2px)",
                  color: "#20e0ca",
                  bgcolor: "rgba(32,224,202,0.10)",
                  border: "1px solid rgba(32,224,202,0.32)",
                  boxShadow: "0 10px 24px rgba(32,224,202,0.12)",
                },

                "&:active": {
                  transform: "scale(0.96)",
                },
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            },
          }}
        >
          {visibleArticles.map((article, index) => (
            <Box
              key={article._id || article.slug}
              sx={{
                minHeight: 390,
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid rgba(148,163,184,0.14)",
                bgcolor: "linear-gradient(180deg, #111a25 0%, #080c12 100%)",
                background:
                  "linear-gradient(180deg, rgba(17,26,37,0.96), rgba(8,12,18,0.98))",
                boxShadow: "0 24px 70px rgba(0,0,0,0.28)",
                display: "flex",
                flexDirection: "column",
                transition: "0.25s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  borderColor: "rgba(32,224,202,0.35)",
                },
              }}
            >
              <Box
                sx={{
                  height: 175,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              >
                {article.badge && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      px: 1.4,
                      py: 0.5,
                      borderRadius: 999,
                      color: "#fbbf24",
                      bgcolor: "rgba(251,191,36,0.1)",
                      border: "1px solid rgba(251,191,36,0.35)",
                      fontSize: 11,
                      fontWeight: 900,
                      textTransform: "uppercase",
                    }}
                  >
                    {article.badge}
                  </Box>
                )}

                <Typography sx={{ fontSize: 42 }}>
                  {["🏃", "🕸️", "📧", "🎯", "✍️", "🧾"][index % 6]}
                </Typography>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 18,
                    display: "flex",
                    gap: 2,
                  }}
                >
                  {[Zap, Link2, Bot].map((Icon, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "rgba(32,224,202,0.1)",
                        border: "1px solid rgba(32,224,202,0.42)",
                      }}
                    >
                      <Icon size={15} color="#20e0ca" />
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box sx={{ p: 2.5, flex: 1 }}>
                <Typography
                  sx={{
                    color: "#20e0ca",
                    fontSize: 12,
                    fontWeight: 900,
                    textTransform: "uppercase",
                    mb: 1.5,
                  }}
                >
                  {article.category || "Workflow"} · {article.node_count || 0} nodes
                </Typography>
                <Typography
                  sx={{
                    fontSize: 17,
                    fontWeight: 900,
                    lineHeight: 1.35,
                    mb: 1.5,
                    minHeight: 46,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {article.title}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(226,232,240,0.46)",
                    fontSize: 14,
                    lineHeight: 1.7,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {article.description}
                </Typography>
              </Box>
              <Box
                sx={{
                  px: 2.5,
                  py: 2,
                  borderTop: "1px solid rgba(148,163,184,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Typography sx={{ color: "#22c55e", fontSize: 13 }}>
                  ●
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: 13,
                    color: "#f8fafc",
                  }}
                >
                  {article.sales_count} sold
                </Typography>
                {Number(article.discount || 0) > 0 && (
                  <Typography
                    sx={{
                      color: "rgba(226,232,240,0.38)",
                      fontWeight: 900,
                      fontSize: 20,
                      textDecoration: "line-through",
                      textDecorationThickness: "2px",
                    }}
                  >
                    ${article.price}
                  </Typography>
                )}

                <Typography
                  sx={{
                    position: "relative",
                    color: "#20e0ca",
                    fontWeight: 950,
                    fontSize: 22,
                    letterSpacing: "-0.03em",
                    textShadow: "0 0 24px rgba(32,224,202,0.35)",
                  }}
                >
                  {article.price_formatted}
                </Typography>
                <Button
                  onClick={() => navigate(ROUTES_GEN.articleDetail(article.slug))}
                  sx={{
                    minWidth: 92,
                    height: 38,
                    color: "#e2e8f0",
                    bgcolor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(148,163,184,0.2)",
                    borderRadius: 2.2,
                    px: 2,
                    textTransform: "none",
                    fontWeight: 900,
                    "&:hover": {
                      bgcolor: "rgba(32,224,202,0.1)",
                      borderColor: "rgba(32,224,202,0.35)",
                      color: "#20e0ca",
                    },
                  }}
                >
                  Preview
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            mt: 8,
            p: { xs: 4, md: 6 },
            borderRadius: 5,
            border: "1px solid rgba(32,224,202,0.22)",
            background:
              "linear-gradient(135deg, rgba(32,224,202,0.15), rgba(15,23,42,0.4), rgba(2,6,23,0.9))",
            display: "flex",
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#20e0ca",
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: 2,
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              Custom Solutions
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 30, md: 40 },
                fontWeight: 950,
                lineHeight: 1.08,
                letterSpacing: "-0.05em",
              }}
            >
              Workflow not found
              <br />
              Is this right for you?
            </Typography>

            <Typography sx={{ mt: 1.5, color: "rgba(226,232,240,0.5)" }}>
              We build complete, customized solutions tailored to your processes
              and needs.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            <Button
              onClick={() => navigate(ROUTES.CUSTOM_BUILT)}
              sx={{
                height: 54,
                px: 4,
                borderRadius: 3,
                bgcolor: "#38e39f",
                color: "#03100b",
                fontWeight: 900,
                textTransform: "none",
                "&:hover": { bgcolor: "#20e0ca" },
              }}
            >
              Get a Custom Quote →
            </Button>

            <Button
              onClick={() => navigate(ROUTES.ABOUT)}
              sx={{
                height: 54,
                px: 3,
                borderRadius: 3,
                color: "rgba(226,232,240,0.55)",
                border: "1px solid rgba(148,163,184,0.22)",
                textTransform: "none",
                fontWeight: 800,
              }}
            >
              See process
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ArticleHomePage;