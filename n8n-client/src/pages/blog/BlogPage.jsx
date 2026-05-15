import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

import { UI } from "../../configs/constants";
import BlogFeaturedSection from "../../components/blog/BlogFeaturedSection";
import BlogLatestSection from "../../components/blog/BlogLatestSection";
import BlogTagSection from "../../components/blog/BlogTagSection";

import blogApi from "../../api/blog.api";

const BlogResourcePage = () => {
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
    () => blogs.find((b) => b.is_featured) || blogs[0] || null,
    [blogs]
  );

  const latestBlogs = useMemo(() => {
    if (!featuredBlog) return blogs;

    const featId = featuredBlog._id || featuredBlog.id;

    return blogs.filter((b) => (b._id || b.id) !== featId);
  }, [blogs, featuredBlog]);

  const tags = useMemo(() => {
    const all = blogs.flatMap((b) => b.tags || []);

    return [...new Set(all)].slice(0, 12);
  }, [blogs]);

  return (
    <Box
      sx={{
        bgcolor: UI.bg,
        minHeight: "100vh",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        {/* HERO */}
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
          Chia sẻ kiến thức...
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
          Blog & Tài ngthức?
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

        {/* SECTION 1 */}
        <BlogFeaturedSection
          blogs={blogs}
          featuredBlog={featuredBlog}
          loading={loading}
          activeType={activeType}
          setActiveType={setActiveType}
        />

        {/* SECTION 2 */}
        <BlogLatestSection blogs={latestBlogs} />

        {/* SECTION 3 */}
        <BlogTagSection tags={tags} />
      </Container>
    </Box>
  );
};

export default BlogResourcePage;