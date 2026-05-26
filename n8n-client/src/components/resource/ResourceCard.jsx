import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Clock3, Download, Eye, ExternalLink, Sparkles } from "lucide-react";

import { TYPE_CONFIG } from "../../configs/constants";

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const ResourceCard = ({ resource }) => {
  const typeConfig = TYPE_CONFIG[resource.type];

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        border: resource.is_featured
          ? "1px solid rgba(0,201,167,0.45)"
          : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 1,
        overflow: "hidden",
        position: "relative",
        transition: "0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "rgba(0,201,167,0.5)",
          boxShadow: "0 18px 45px rgba(0,0,0,0.45)",
        },
      }}
    >
      {resource.is_featured && (
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 2,
            px: 1.2,
            py: 0.5,
            borderRadius: 2,
            bgcolor: "#00C9A7",
            color: "#06111F",
            fontSize: "0.65rem",
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            textTransform: "uppercase",
          }}
        >
          <Sparkles size={13} />
          Featured
        </Box>
      )}

      {resource.thumbnail && (
        <Box
          sx={{
            position: "relative",
            height: 165,
            bgcolor: "#101A2D",
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            image={resource.thumbnail}
            alt={resource.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(13,21,37,0.95), transparent 60%)",
            }}
          />

          <Chip
            icon={typeConfig.icon}
            label={typeConfig.label}
            size="small"
            sx={{
              position: "absolute",
              left: 14,
              bottom: 12,
              bgcolor: typeConfig.bg,
              color: typeConfig.color,
              border: `1px solid ${typeConfig.color}66`,
              fontWeight: 700,
              "& .MuiChip-icon": {
                color: typeConfig.color,
              },
            }}
          />
        </Box>
      )}

      <CardContent
        sx={{
          flexGrow: 1,
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            mb: 1,
            color: "text.primary",
            fontWeight: 800,
            fontSize: "1rem",
            lineHeight: 1.4,
            minHeight: 45,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {resource.title}
        </Typography>

        <Typography
          sx={{
            mb: 2,
            color: "text.secondary",
            fontSize: "0.82rem",
            lineHeight: 1.6,
            minHeight: 64,
            maxHeight: 64,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {resource.description}
        </Typography>

        <Stack
          direction="row"
          sx={{
            flexWrap: "wrap",
            gap: 1,
            minHeight: 84,
            maxHeight: 84,
            overflow: "hidden",
            alignContent: "flex-start",
          }}
        >
          {(resource.tags).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                height: 28,
                px: 0.5,
                borderRadius: "999px",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.02em",

                color: "#7CF7E3",
                bgcolor: "rgba(0,201,167,0.10)",
                border: "1px solid rgba(0,201,167,0.24)",

                backdropFilter: "blur(10px)",
                boxShadow: "0 2px 10px rgba(0,201,167,0.08)",

                transition: "all 0.2s ease",

                "& .MuiChip-label": {
                  px: 1.2,
                },

                "&:hover": {
                  transform: "translateY(-1px)",
                  bgcolor: "rgba(0,201,167,0.18)",
                  borderColor: "rgba(0,201,167,0.5)",
                  color: "#B8FFF4",
                  boxShadow: "0 6px 18px rgba(0,201,167,0.22)",
                },
              }}
            />
          ))}
        </Stack>

        <Box sx={{ mt: "auto" }}>
          <Divider sx={{ my: 2 }} />

          <Stack
            direction="row"
            spacing={0.8}
            sx={{
              alignItems: "center",
            }}
          >
            <Clock3 size={14} color="#8B9BB4" />
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.74rem",
                lineHeight: 1,
              }}
            >
              {formatDate(resource.createdAt)}
            </Typography>
          </Stack>
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1 }}>
        {resource.download_url && (
          <Button
            fullWidth
            variant="contained"
            startIcon={<Download size={16} />}
            href={resource.download_url}
            target="_blank"
            sx={{
              bgcolor: "#00C9A7",
              color: "#06111F",
              fontWeight: 800,
              "&:hover": {
                bgcolor: "#00b596",
              },
            }}
          >
            Download
          </Button>
        )}

        {resource.external_url && (
          <Button
            fullWidth={!resource.download_url}
            variant="outlined"
            startIcon={<ExternalLink size={17} />}
            href={resource.external_url}
            target="_blank"
            sx={{
              minWidth: 110,
              height: 44,
              px: 3,

              borderColor: "rgba(255,255,255,0.16)",
              color: "text.secondary",

              fontWeight: 800,
              fontSize: "0.82rem",
              borderRadius: "12px",

              "&:hover": {
                borderColor: "#00C9A7",
                color: "#00C9A7",
                bgcolor: "rgba(0,201,167,0.08)",
              },
            }}
          >
            {resource.download_url ? "Docs" : "Visit"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ResourceCard;