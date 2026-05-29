import { Box, Chip, Typography } from "@mui/material";
import { Image } from "lucide-react";

const ResourceImg = ({ resource }) => {
  const thumbnail = resource?.thumbnail;
  const isFeatured = resource?.is_featured;

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: 260, md: 380 },
        borderRadius: 2,
        bgcolor: "#0f6b52",
        backgroundImage: thumbnail ? `url(${thumbnail})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: thumbnail ? "rgba(0,0,0,0.25)" : "transparent",
        }}
      />

      <Chip
        label={isFeatured ? "Featured" : "Resource"}
        size="small"
        sx={{
          position: "absolute",
          top: 16,
          left: 20,
          bgcolor: "#d9fff2",
          color: "#047857",
          fontWeight: 800,
          height: 20,
          zIndex: 1,
        }}
      />
      {!thumbnail && (
        <Box sx={{ textAlign: "center", color: "rgba(255,255,255,0.55)" }}>
          <Image size={34} />
          <Typography sx={{ fontSize: 12, fontWeight: 800 }}>
            thumbnail image
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ResourceImg;