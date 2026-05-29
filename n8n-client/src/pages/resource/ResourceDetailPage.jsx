import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";

import ResourceImg from "../../components/resource/ResourceImg";
import ResourceMainContent from "../../components/resource/ResourceMainContent";
import ResourceSidebar from "../../components/resource/ResourceSidebar";
import resourceApi from "../../api/resource.api";

const ResourceDetailPage = () => {
  const { slug } = useParams();
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await resourceApi.getBySlug(slug);
        setResource(res?.data || res?.item || res);
      } catch (error) {
        console.error("Fetch resource detail error:", error);
      }
    };

    if (slug) fetchResource();
  }, [slug]);

  if (!resource) return null;

  return (
    <Box
      sx={{
        minHeight: "70vh",
        bgcolor: "#08090f",
        color: "#fff",
        pb: 10,
      }}
    >
      <Container maxWidth="lg" sx={{ pt: 5 }}>
        <ResourceImg resource={resource} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(0, 1fr) 300px",
            },
            gap: 3,
            alignItems: "start",
            mt: 3,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <ResourceMainContent resource={resource} />
          </Box>

          <Box
            sx={{
              width: "100%",
              position: { md: "sticky" },
              top: { md: 90 },
            }}
          >
            <ResourceSidebar resource={resource} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ResourceDetailPage;