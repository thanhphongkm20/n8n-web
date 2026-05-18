import { Box, Divider, Typography } from "@mui/material";

import { UI } from "../../configs/constants";
import BlogPostCard from "./BlogPostCard";

const BlogLatestSection = ({ blogs = [] }) => {
  const latestBlogs = blogs.slice(0, 6);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1120px",
        mx: "auto",
        mb: 8,
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
        Latest article
      </Typography>
      <Divider
        sx={{
          borderColor: "rgba(255,255,255,0.08)",
          mb: 5,
        }}
      />
      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
          },
          gap: 3,
          alignItems: "stretch",
        }}
      >
        {latestBlogs.map((post, index) => (
          <BlogPostCard
            key={post._id || post.id || post.slug}
            post={post}
            index={index}
          />
        ))}
      </Box>
    </Box>
  );
};

export default BlogLatestSection;