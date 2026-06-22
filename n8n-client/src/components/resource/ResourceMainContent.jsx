import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import {
  CalendarDays,
  List,
  ArrowRight,
  Computer,
  Tag,
  Sparkles,
} from "lucide-react";

const ResourceMainContent = ({ resource }) => {
  const tags = resource?.tags;
  const techStack = resource?.techStack;
  const inside = resource?.inside;
  const related = resource?.related;

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: 900,
        mx: "auto",
        px: { xs: 2, md: 3 },
        py: { xs: 4, md: 5 },
        color: "#f8fafc",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -120,
          left: "50%",
          transform: "translateX(-50%)",
          width: 560,
          height: 260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,.22) 0%, transparent 68%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        useFlexGap
        justifyContent="flex-start"
        sx={{ mb: 3, position: "relative" }}
      >
        {tags.map((tag) => (
          <Chip
            key={tag}
            icon={<Tag size={13} />}
            label={tag}
            size="small"
            sx={{
              height: 28,
              color: "#bae6fd",
              bgcolor: "rgba(34,211,238,0.07)",
              border: "1px solid rgba(34,211,238,0.16)",
              backdropFilter: "blur(10px)",
              transition: ".2s ease",
              "& .MuiChip-icon": { color: "#009F8F" },
              "&:hover": {
                bgcolor: "rgba(34,211,238,0.13)",
                transform: "translateY(-2px)",
              },
            }}
          />
        ))}
      </Stack>

      <Typography
        sx={{
          position: "relative",
          fontSize: { xs: 34, md: 52 },
          fontWeight: 950,
          lineHeight: 1,
          letterSpacing: "-0.06em",
          textAlign: "left",
          mb: 2,
          background:
            "linear-gradient(180deg, #ffffff 15%, #dffaff 48%, #67e8f9 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {resource?.title}
      </Typography>

      <Typography
        sx={{
          maxWidth: 760,
          mx: "auto",
          color: "#f8fafc",
          fontSize: { xs: 15, md: 18 },
          lineHeight: 1.75,
          textAlign: "left",
          mb: 3.5,
        }}
      >
        {resource?.description}
      </Typography>

      <Stack
        direction="row"
        spacing={2.5}
        alignItems="center"
        justifyContent="flex-start"
        flexWrap="wrap"
        useFlexGap
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={0.9} alignItems="center">
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: "#009F8F",
              boxShadow: "0 0 22px rgba(34,211,238,0.9)",
            }}
          />
          <Typography sx={{ fontSize: 13, fontWeight: 950 }}>
            N8N Hub
          </Typography>
        </Stack>

        <Stack direction="row" spacing={0.8} alignItems="center">
          <CalendarDays size={15} color="#009F8F" />
          <Typography sx={{ fontSize: 13, fontWeight: 800 }}>
            {resource?.createdAt
              ? new Date(resource.createdAt).toLocaleDateString("vi-VN")
              : ""}
          </Typography>
        </Stack>
      </Stack>

      <Box
        sx={{
          p: { xs: 2.5, md: 4 },
          borderRadius: 5,
          background:
            "linear-gradient(180deg, rgba(15,23,42,.82), rgba(2,6,23,.96))",
          border: `1px solid rgba(34,211,238,0.14)`,
          boxShadow:
            "0 30px 100px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.06)",
        }}
      >
        <Typography
          sx={{
            color: "rgba(226,232,240,0.82)",
            fontSize: { xs: 15, md: 17 },
            lineHeight: 1.95,
            textAlign: "left",
          }}
        >
          {resource?.content}
        </Typography>

        {techStack.length > 0 && (
          <>
            <Divider sx={{ my: 3.5, borderColor: "rgba(34,211,238,.12)" }} />

            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <Sparkles size={16} color="#009F8F" />
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 950,
                  letterSpacing: "0.16em",
                  color: "#009F8F",
                }}
              >
                TECH STACK
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {techStack.map((item) => (
                <Chip
                  key={item}
                  icon={<Computer size={14} />}
                  label={item}
                  sx={{
                    color: "#e0faff",
                    bgcolor: "rgba(34,211,238,.08)",
                    border: "1px solid rgba(34,211,238,.22)",
                    "& .MuiChip-icon": { color: "#009F8F" },
                  }}
                />
              ))}
            </Stack>
          </>
        )}

        {inside.length > 0 && (
          <>
            <Divider sx={{ my: 3.5, borderColor: "rgba(34,211,238,.12)" }} />

            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <List size={17} color="#009F8F" />
              <Typography sx={{ fontWeight: 950, fontSize: 18 }}>
                What's inside
              </Typography>
            </Stack>

            <Stack spacing={1.2}>
              {inside.map((item) => (
                <Stack
                  key={item}
                  direction="row"
                  spacing={1.2}
                  alignItems="flex-start"
                  sx={{
                    p: 1.6,
                    borderRadius: 3,
                    bgcolor: "rgba(34,211,238,0.04)",
                    border: "1px solid rgba(34,211,238,0.1)",
                  }}
                >
                  <ArrowRight size={16} color="#009F8F" />
                  <Typography sx={{ fontSize: 14, color: "#f8fafc" }}>
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </>
        )}

        {related.length > 0 && (
          <>
            <Divider sx={{ my: 3.5, borderColor: "rgba(34,211,238,.12)" }} />

            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 950,
                letterSpacing: "0.16em",
                color: "#009F8F",
                mb: 2,
              }}
            >
              RELATED RESOURCES
            </Typography>

            <Stack spacing={1.5}>
              {related.map((item) => (
                <Box
                  key={item.title}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: "rgba(255,255,255,0.035)",
                    border: "1px solid rgba(34,211,238,0.1)",
                  }}
                >
                  <Typography sx={{ fontWeight: 900, fontSize: 15, mb: 1 }}>
                    {item.title}
                  </Typography>

                  <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
                    {(item?.tags || []).map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          color: "#bae6fd",
                          bgcolor: "rgba(34,211,238,0.07)",
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ResourceMainContent;