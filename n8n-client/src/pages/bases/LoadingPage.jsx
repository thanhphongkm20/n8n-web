import { Box, CircularProgress } from "@mui/material";

export const LoadingPage = () => (
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}
  >
    <CircularProgress size={80} />
  </Box>
);