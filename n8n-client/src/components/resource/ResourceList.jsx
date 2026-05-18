import { Box, Container, IconButton, Skeleton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import ResourceCard from "./ResourceCard";

const COLUMN_SIZE = 2;
const VISIBLE_COLUMNS = 4;
const VISIBLE_ITEMS = COLUMN_SIZE * VISIBLE_COLUMNS;

const ResourceList = ({ loading, resources = [] }) => {
  const [startIndex, setStartIndex] = useState(0);

  const maxStartIndex = Math.max(0, resources.length - VISIBLE_ITEMS);
  const canSlide = resources.length > VISIBLE_ITEMS;

  const safeStartIndex = Math.min(startIndex, maxStartIndex);

  const visibleResources = useMemo(() => {
    return resources.slice(
      safeStartIndex,
      safeStartIndex + VISIBLE_ITEMS
    );
  }, [resources, safeStartIndex]);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - COLUMN_SIZE));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(maxStartIndex, prev + COLUMN_SIZE)
    );
  };

  const sliderBtnSx = {
    position: "absolute",
    top: "50%",
    zIndex: 20,
    width: 56,
    height: 56,
    transform: "translateY(-50%) scale(0.96)",
    transition: "all 0.22s ease",
    bgcolor: "#00C9A7",
    color: "#06111F",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "0 18px 45px rgba(0,0,0,0.5)",
    opacity: 0.55,

    "&:hover": {
      bgcolor: "#05DDB8",
      opacity: 1,
      transform: "translateY(-50%) scale(1.06)",
    },

    "&.Mui-disabled": {
      opacity: 0,
      pointerEvents: "none",
    },
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 7 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(4, minmax(0, 1fr))",
            },
            gap: 3,
          }}
        >
          {Array.from({ length: VISIBLE_ITEMS }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height={420}
              sx={{
                borderRadius: 1,
                bgcolor: "rgba(255,255,255,0.06)",
              }}
            />
          ))}
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 7 }}>
      <Box
        sx={{
          position: "relative",
          mx: { xs: 0, lg: 4 },
          px: { xs: 0, lg: 3 },

          "& .resource-slider-btn": {
            opacity: canSlide ? 0.55 : 0,
          },

          "&:hover .resource-slider-btn": {
            opacity: 1,
          },
        }}
      >
        {canSlide && (
          <>
            <IconButton
              className="resource-slider-btn"
              onClick={handlePrev}
              disabled={safeStartIndex === 0}
              sx={{
                ...sliderBtnSx,
                left: { xs: 8, lg: -45 },
              }}
            >
              <ChevronLeft size={30} />
            </IconButton>

            <IconButton
              className="resource-slider-btn"
              onClick={handleNext}
              disabled={safeStartIndex >= maxStartIndex}
              sx={{
                ...sliderBtnSx,
                right: { xs: 8, lg: -45 },
              }}
            >
              <ChevronRight size={30} />
            </IconButton>
          </>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(4, minmax(0, 1fr))",
            },
            gap: 3,
            transition: "opacity 0.18s ease",
          }}
        >
          {visibleResources.map((resource) => (
            <ResourceCard
              key={resource._id || resource.id}
              resource={resource}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default ResourceList;