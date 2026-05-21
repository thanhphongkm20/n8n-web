import { Box, ThemeProvider } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import { darkTheme } from "../../configs/constants";
import { LoadingPage } from "../bases/LoadingPage";
import ResourceFilterBar from "../../components/resource/ResourceFilterBar";
import ResourceHero from "../../components/resource/ResourceHero";
import ResourceList from "../../components/resource/ResourceList";

import resourceApi from "../../api/resource.api";

const ResourcesPage = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    let ignore = false;

    const fetchResources = async () => {
      try {
        const response = await resourceApi.list({
          status: "published",
        });

        if (ignore) return;

        const data = response?.data?.items;

        setResources(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fetch resources error:", error);

        if (!ignore) {
          setResources([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchResources();

    return () => {
      ignore = true;
    };
  }, []);

  const counts = useMemo(() => {
    const result = {
      all: resources.length,
    };

    resources.forEach((item) => {
      if (!item.type) return;

      result[item.type] = (result[item.type] || 0) + 1;
    });

    return result;
  }, [resources]);

  const filteredResources = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return resources.filter((item) => {
      const matchType = filter === "all" || item.type === filter;

      const matchSearch =
        !keyword ||
        item.title?.toLowerCase().includes(keyword) ||
        item.description?.toLowerCase().includes(keyword) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(keyword));

      return matchType && matchSearch;
    });
  }, [resources, filter, search]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: "80vh",
          bgcolor: "background.default",
          fontFamily: "'Sora', sans-serif",
        }}
      >
        <ResourceHero />

        <ResourceFilterBar
          filter={filter}
          search={search}
          counts={counts}
          onFilterChange={setFilter}
          onSearchChange={setSearch}
        />

        <ResourceList loading={loading} resources={filteredResources} />
      </Box>
    </ThemeProvider>
  );
};

export default ResourcesPage;