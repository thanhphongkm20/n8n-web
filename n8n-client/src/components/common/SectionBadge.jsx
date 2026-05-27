import { Box, Typography } from "@mui/material";
import { Zap } from "lucide-react";

const SectionBadge = ({
  children,
  color = "#14b8a6",
  borderColor,
}) => {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.8,
        px: 2,
        py: 0.7,
        borderRadius: "100px",
        border: `1px solid ${borderColor ?? color + "55"}`,
        bgcolor: `${color}12`,
      }}
    >
      <Zap size={11} color={color} />

      <Typography
        sx={{
          color,
          fontSize: 10.5,
          fontWeight: 800,
          letterSpacing: 2.5,
          textTransform: "uppercase",
          lineHeight: 1,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default SectionBadge;