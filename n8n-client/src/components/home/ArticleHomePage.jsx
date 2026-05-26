import React, { useState, useEffect, useMemo } from "react";

import {
  Typography,
  Card,
  CardContent,
  Box,
  Container,
  Button,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Search from "../common/Search";
import { COLORS } from "../common/Colors";
import StackRow from "../common/StackRow";
import Animate from "../common/Animate";
import articleApi from "../../api/article.api";
import { ROUTES_GEN } from "../../configs/routes";

const ArticleHomePage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await articleApi.list();
        if (response?.success) {
          setArticles(Array.isArray(response.posts) ? response.posts : []);
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return Array.isArray(articles) ? articles : [];

    return (Array.isArray(articles) ? articles : []).filter((article) => {
      const title = article?.title?.toLowerCase() || "";
      const description = article?.description?.toLowerCase() || "";
      const type = article?.type?.toLowerCase() || "";
      const slug = article?.slug?.toLowerCase() || "";
      const tags = Array.isArray(article?.tags)
        ? article.tags.join(" ").toLowerCase()
        : "";

      return (
        title.includes(keyword) ||
        description.includes(keyword) ||
        type.includes(keyword) ||
        slug.includes(keyword) ||
        tags.includes(keyword)
      );
    });
  }, [articles, search]);

  const visibleArticles = filteredArticles.slice(0, 6);

  return (
    <Box sx={{ flexGrow: 1, width: "100%", py: 2 }}>
      <Container maxWidth="lg">
        <StackRow
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 5, width: "100%" }}
        >
          <Typography variant="h5" fontWeight={800} sx={{ color: "#0f172a" }}>
            Featured Workflows
          </Typography>
          <Box sx={{ width: 280 }}>
            <Search
              value={search}
              onChange={setSearch}
              placeholder="Search workflows..."
            />
          </Box>
        </StackRow>

        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
            },
          }}
        >
          {loading ? (
            [1, 2, 3, 4, 5, 6].map((n) => (
              <Box key={n} sx={{ display: "flex" }}>
                <Skeleton
                  variant="rectangular"
                  height={350}
                  sx={{ borderRadius: 4, width: "100%" }}
                />
              </Box>
            ))
          ) : visibleArticles.length > 0 ? (
            visibleArticles.map((article) => (
              <Box key={article._id} sx={{ display: "flex" }}>
                <Animate type="fade" sx={{ width: "100%" }}>
                  <Card
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 4,
                      border: "1px solid #e2e8f0",
                      boxShadow: "none",
                      overflow: "hidden",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: 180,
                        overflow: "hidden",
                        flexShrink: 0,
                        position: "relative",
                        bgcolor: "#f1f5f9",
                      }}
                    >
                      {article.image && (
                        <Box
                          component="div"
                          role="img"
                          aria-label={article.title}
                          sx={{
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${article.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            transition: "transform 0.5s ease-in-out",
                            "&:hover": {
                              transform: "scale(1.08)",
                            },
                          }}
                        />
                      )}
                    </Box>

                    <CardContent
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        p: 2.5,
                      }}
                    >
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          fontWeight={700}
                          variant="h6"
                          sx={{
                            mb: 1,
                            fontSize: "1.1rem",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            minHeight: "2.8rem",
                          }}
                        >
                          {article.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: "#64748b",
                            mb: 2,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {article.description}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            navigate(ROUTES_GEN.articleDetail(article.slug))
                          }
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600,
                          }}
                        >
                          Preview
                        </Button>

                        <Button
                          fullWidth
                          variant="contained"
                          size="small"
                          onClick={() =>
                            navigate(ROUTES_GEN.articleDetail(article.slug))
                          }
                          sx={{
                            bgcolor: COLORS.SECONDARY,
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600,
                            "&:hover": {
                              bgcolor: COLORS.SECONDARY,
                              opacity: 0.9,
                            },
                          }}
                        >
                          Buy
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Animate>
              </Box>
            ))
          ) : (
            <Typography sx={{ color: "#64748b", gridColumn: "1 / -1" }}>
              No workflows found.
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ArticleHomePage;