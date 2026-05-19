import { Box, Stack, Typography } from "@mui/material";
import { Copy } from "lucide-react";

const InfoRow = ({ label, value, copy, highlight = false }) => {
  return (
    <Box
      sx={{
        py: 1.1,
        display: "grid",
        gridTemplateColumns: "125px minmax(0, 1fr)",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography
        sx={{
          color: "#94a3b8",
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {label}
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="flex-end"
        sx={{ minWidth: 0 }}
      >
        <Typography
          sx={{
            color: highlight ? "#facc15" : "#ffffff",
            fontSize: 15,
            fontWeight: 850,
            textAlign: "right",
            wordBreak: "break-word",
          }}
        >
          {value}
        </Typography>

        {copy && <IconCopy onClick={copy} />}
      </Stack>
    </Box>
  );
};

const IconCopy = ({ onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 28,
        height: 28,
        flexShrink: 0,
        borderRadius: 1.5,
        cursor: "pointer",
        bgcolor: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "grid",
        placeItems: "center",
        transition: ".2s",
        "&:hover": {
          bgcolor: "rgba(255,255,255,0.12)",
          transform: "translateY(-1px)",
        },
      }}
    >
      <Copy size={14} color="#cbd5e1" />
    </Box>
  );
};

export default InfoRow;