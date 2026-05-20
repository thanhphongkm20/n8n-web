import { Box, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { UI } from "../../configs/constants";
import BlogPostCard from "./BlogPostCard";
import { ROUTES_GEN } from "../../configs/routes";

const BlogLatestSection = ({ blogs = [] }) => {
  const latestBlogs = blogs.slice(0, 6);

  const navigate = useNavigate();

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
          <Box
            key={post._id}
            onClick={() => navigate(ROUTES_GEN.blogDetail(post.slug))}
            sx={{
              cursor: "pointer",
              height: "100%",
            }}
          >
            <BlogPostCard post={post} index={index} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BlogLatestSection;