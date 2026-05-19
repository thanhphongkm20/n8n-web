import { Box, Stack, Typography } from "@mui/material";
import { ImageOff } from "lucide-react";

const ArticleHeroMedia = ({ image }) => {
  return (
    <Box
      sx={{
        height: { xs: 260, md: 340 },
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        bgcolor: "#0b121a",
        position: "relative",
      }}
    >
      {image ? (
        <Box
          component="img"
          src={image}
          alt="Article preview"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={1.5}
          sx={{ height: "100%" }}
        >
          <ImageOff size={36} color="#64748b" />
        </Stack>
      )}
    </Box>
  );
};

export default ArticleHeroMedia;