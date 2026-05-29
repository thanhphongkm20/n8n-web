import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

import { LoadingPage } from "../bases/LoadingPage";
import { UI } from "../../configs/constants";
import BlogFeaturedSection from "../../components/blog/BlogFeaturedSection";
import BlogLatestSection from "../../components/blog/BlogLatestSection";
import BlogTagSection from "../../components/blog/BlogTagSection";

import blogApi from "../../api/blog.api";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeType, setActiveType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const res = await blogApi.list({
          status: "published",
          ...(activeType ? { type: activeType } : {}),
        });

        const d = res?.data;

        let next = [];

        if (Array.isArray(d)) next = d;
        else if (Array.isArray(d?.items)) next = d.items;
        else if (Array.isArray(d?.blogs)) next = d.blogs;

        if (mounted) setBlogs(next);
      } catch (error) {
        console.error(error);

        if (mounted) setBlogs([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBlogs();

    return () => {
      mounted = false;
    };
  }, [activeType]);

  const featuredBlog = useMemo(
    () => blogs.find((b) => b.is_featured) || blogs[0],
    [blogs]
  );

  const latestBlogs = useMemo(() => {
    if (!featuredBlog) return blogs;

    const featId = featuredBlog._id || featuredBlog.id;

    return blogs.filter((b) => (b._id || b.id) !== featId);
  }, [blogs, featuredBlog]);

  const tags = useMemo(() => {
    const all = blogs.flatMap((b) => b.tags);

    return [...new Set(all)].slice(0, 12);
  }, [blogs]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 5, md: 10 },
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
          Share knowledge
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
          Blogs & Resources
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
          Real-world case studies, n8n feature updates, and in-depth technical
          guides on AI automation.
        </Typography>

        <BlogFeaturedSection
          blogs={blogs}
          featuredBlog={featuredBlog}
          loading={loading}
          activeType={activeType}
          setActiveType={setActiveType}
        />

        <BlogLatestSection blogs={latestBlogs} />

        <BlogTagSection tags={tags} />
      </Container>
    </Box>
  );
};

export default BlogPage;