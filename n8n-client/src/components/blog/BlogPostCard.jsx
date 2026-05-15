import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import {
  CalendarDays,
  Clock3,
} from "lucide-react";
import {
  formatDate,
  getTypeLabel,
} from "../../utils/blog-resource.util";
import { CARD_COLORS } from "../common/Colors";
import { UI } from "../../configs/constants";

const BlogPostCard = ({
  post,
  index = 0,
}) => {
  const color =
    CARD_COLORS[index % CARD_COLORS.length];

  return (
    <Card
      sx={{
        position: "relative",
        height: 260,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: "20px",
        bgcolor: "#1E1E1E",
        border:
          "1px solid rgba(255,255,255,0.08)",
        transition: "all .22s ease",
        background: `
          radial-gradient(circle at top right, ${color}20, transparent 38%),
          linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))
        `,
        "&:hover": {
          transform: "translateY(-6px)",
          borderColor: `${color}80`,
          boxShadow: `0 20px 50px ${color}18`,
          cursor: "pointer",
        },
      }}
    >
      {/* TOP BAR */}
      <Box
        sx={{
          height: 7,
          bgcolor: color,
          flexShrink: 0,
        }}
      />

      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          p: 3.5,
        }}
      >
        {/* BADGE */}
        <Box
          sx={{
            display: "inline-flex",
            alignSelf: "flex-start",
            px: 1.4,
            py: 0.5,
            borderRadius: 999,
            bgcolor: `${color}20`,
            color,
            mb: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 800,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "0.09em",
            }}
          >
            {getTypeLabel(post.type)}
          </Typography>
        </Box>

        {/* TITLE */}
        <Typography
          sx={{
            fontFamily: "Georgia, serif",

            fontSize: {
              xs: 19,
              md: 21,
            },
            fontWeight: 800,
            lineHeight: 1.35,
            color: "#fff",
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 58,
          }}
        >
          {post.title}
        </Typography>

        {/* DESC */}
        <Typography
          sx={{
            color: "rgba(255,255,255,0.72)",
            fontSize: 15,
            lineHeight: 1.7,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 52,
            mb: "auto",
          }}
        >
          {post.excerpt ||
            post.description}
        </Typography>

        {/* FOOTER */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            mt: 3,
            pt: 1,
            borderTop:
              "1px solid rgba(255,255,255,0.06)",
            color:
              "rgba(255,255,255,0.48)",
            fontSize: 13,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
          >
            <CalendarDays size={14} />
            {formatDate(
              post.published_at
            )}
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap={0.7}
          >
            {post.reading_time}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;