import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import {
  Download,
  ExternalLink,
  Eye,
  FileDown,
  CheckCircle2,
} from "lucide-react";

const ResourceSidebar = ({ resource }) => {
  const menuItems = [
    "Overview",
    "What’s inside",
    "Code examples",
    "Related resources",
  ];

  const handleDownload = () => {
    if (!resource?.download_url) return;
    window.open(resource.download_url, "_blank", "noopener,noreferrer");
  };

  const handleViewDocs = () => {
    if (!resource?.external_url) return;
    window.open(resource.external_url, "_blank", "noopener,noreferrer");
  };

  return (
    <Stack spacing={2} sx={{ position: { md: "sticky" }, top: 24 }}>
      <Box
        sx={{
          p: 2,
          borderRadius: 4,
          background:
            "linear-gradient(180deg, rgba(15,23,42,.92), rgba(2,6,23,.96))",
          border: "1px solid rgba(0,159,143,0.18)",
          boxShadow: "0 24px 80px rgba(0,0,0,.28)",
        }}
      >
        <Stack direction="row" spacing={1.2} sx={{ mb: 2 }}>
          {[
            {
              icon: <FileDown size={18} />,
              value: resource?.download_count || 0,
              label: "Downloads",
            },
            {
              icon: <Eye size={18} />,
              value: resource?.view_count || 0,
              label: "Views",
            },
          ].map((item) => (
            <Box
              key={item.label}
              sx={{
                flex: 1,
                p: 1.6,
                borderRadius: 3,
                bgcolor: "rgba(0,159,143,0.08)",
                border: "1px solid rgba(0,159,143,0.18)",
                textAlign: "center",
                color: "#009F8F",
              }}
            >
              {item.icon}

              <Typography
                sx={{
                  mt: 0.6,
                  fontSize: 20,
                  fontWeight: 950,
                  color: "#ffffff",
                }}
              >
                {item.value}
              </Typography>

              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.48)",
                }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.08)" }} />

        <Stack spacing={1.2}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Download size={16} />}
            onClick={handleDownload}
            disabled={!resource?.download_url}
            sx={{
              height: 42,
              borderRadius: 2.5,
              bgcolor: "#009F8F",
              color: "#ffffff",
              fontWeight: 950,
              textTransform: "uppercase",
              fontSize: 12,
              boxShadow: "0 14px 34px rgba(0,159,143,.28)",
              "&:hover": {
                bgcolor: "#00897c",
                transform: "translateY(-1px)",
              },
              "&.Mui-disabled": {
                bgcolor: "rgba(148,163,184,0.16)",
                color: "rgba(255,255,255,0.35)",
              },
            }}
          >
            Download
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<ExternalLink size={16} />}
            onClick={handleViewDocs}
            disabled={!resource?.external_url}
            sx={{
              height: 42,
              borderRadius: 2.5,
              color: "#d1fae5",
              borderColor: "rgba(0,159,143,0.38)",
              fontWeight: 950,
              textTransform: "uppercase",
              fontSize: 12,
              "&:hover": {
                borderColor: "#2dd4bf",
                bgcolor: "rgba(0,159,143,0.12)",
                transform: "translateY(-1px)",
              },
              "&.Mui-disabled": {
                color: "rgba(255,255,255,0.35)",
                borderColor: "rgba(148,163,184,0.18)",
              },
            }}
          >
            View docs
          </Button>
        </Stack>
      </Box>

      <Box
        sx={{
          p: 2,
          borderRadius: 4,
          background:
            "linear-gradient(180deg, rgba(15,23,42,.92), rgba(2,6,23,.96))",
          border: "1px solid rgba(0,159,143,0.18)",
          boxShadow: "0 24px 80px rgba(0,0,0,.28)",
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 950,
            color: "#2dd4bf",
            mb: 1.6,
            letterSpacing: "0.12em",
          }}
        >
          RESOURCE INFO
        </Typography>

        {[
          { label: "Type", value: resource?.type || "Resource" },
          {
            label: "Status",
            value: (
              <Chip
                icon={<CheckCircle2 size={13} />}
                label={resource?.status}
                size="small"
                sx={{
                  height: 24,
                  color: "#d1fae5",
                  bgcolor: "rgba(0,159,143,0.18)",
                  border: "1px solid rgba(0,159,143,0.35)",
                  fontWeight: 900,
                  textTransform: "capitalize",
                  "& .MuiChip-icon": { color: "#2dd4bf" },
                }}
              />
            ),
          },
        ].map((item) => (
          <Stack
            key={item.label}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1.5}
            sx={{
              py: 1.15,
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              "&:last-child": { borderBottom: "none" },
            }}
          >
            <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
              {item.label}
            </Typography>

            <Typography
              component="div"
              sx={{
                fontSize: 13,
                fontWeight: 850,
                color: "#ffffff",
                maxWidth: 145,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textAlign: "right",
              }}
            >
              {item.value}
            </Typography>
          </Stack>
        ))}
      </Box>

      <Box
        sx={{
          p: 2,
          borderRadius: 4,
          background:
            "linear-gradient(180deg, rgba(15,23,42,.92), rgba(2,6,23,.96))",
          border: "1px solid rgba(0,159,143,0.18)",
          boxShadow: "0 24px 80px rgba(0,0,0,.28)",
          textAlign: "left",
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 950,
            color: "#2dd4bf",
            mb: 1.6,
            letterSpacing: "0.12em",
          }}
        >
          ON THIS PAGE
        </Typography>

        {menuItems.map((item) => (
          <Typography
            key={item}
            sx={{
              fontSize: 13,
              mb: 1,
              color: "rgba(255,255,255,0.68)",
              fontWeight: 700,
              cursor: "pointer",
              transition: ".2s",
              "&:hover": {
                color: "#ffffff",
                transform: "translateX(4px)",
              },
            }}
          >
            <Box
              component="span"
              sx={{ color: "#009F8F", mr: 1, fontWeight: 900 }}
            >
              ◦
            </Box>
            {item}
          </Typography>
        ))}
      </Box>
    </Stack>
  );
};

export default ResourceSidebar;