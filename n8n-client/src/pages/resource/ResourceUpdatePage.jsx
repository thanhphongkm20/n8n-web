import { Box, Button, Container, Stack } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BasicInformation from "../../components/resource/BasicInformation";
import RouteBreadcrumbs from "../../components/common/RouteBreadcrumbs";
import Classification from "../../components/resource/Classification";
import Thumbnail from "../../components/resource/Thumbnail";
import LinksDownloads from "../../components/resource/Linksdownloads";
import Options from "../../components/resource/Options";

import resourceApi from "../../api/resource.api";
import resourceValidationSchema from "../../validation/resource.validation";
import { showError, showSuccess } from "../../utils/toast";
import { ROUTES } from "../../configs/routes";

const ResourceUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      slug: "",
      description: "",
      content: "",
      resource_type: "community",
      tags: [],
      status: "published",
      thumbnail_url: "",
      thumbnail_file: null,
      download_url: "",
      external_url: "",
      is_featured: true,
      allow_comments: true,
      notify_subscribers: false,
    },
    validationSchema: resourceValidationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const cleanTags = values.tags.filter((tag) => tag?.trim());

        const payload = {
          title: values.title,
          slug: values.slug,
          description: values.description,
          content: values.content,
          type: values.resource_type,
          status: values.status,
          tags: cleanTags,
          thumbnail: values.thumbnail_url,
          download_url: values.download_url,
          external_url: values.external_url,
          is_featured: values.is_featured,
          allow_comments: values.allow_comments,
          notify_subscribers: values.notify_subscribers,
        };

        if (values.thumbnail_file) {
          const formData = new FormData();

          Object.entries(payload).forEach(([key, value]) => {
            formData.append(
              key,
              key === "tags" ? JSON.stringify(value) : value ?? ""
            );
          });

          formData.append("thumbnail", values.thumbnail_file);

          await resourceApi.update(id, formData, true);
        } else {
          await resourceApi.update(id, payload);
        }

        showSuccess("Resource updated successfully");

        setTimeout(() => {
          navigate(ROUTES.RESOURCE.LIST);
        }, 1000);
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Update resource failed";

        if (message?.toLowerCase().includes("slug")) {
          formik.setFieldError("slug", message);
          formik.setFieldTouched("slug", true, false);
        }

        showError(message);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchResource = async () => {
      try {
        setPageLoading(true);

        const response = await resourceApi.getById(id);
        const resource = response?.data;

        formik.setValues({
          title: resource?.title,
          slug: resource?.slug,
          description: resource?.description,
          content: resource?.content,
          resource_type: resource?.type,
          tags: Array.isArray(resource?.tags) ? resource.tags : [],
          status: resource?.status,
          thumbnail_url: resource?.thumbnail,
          thumbnail_file: null,
          download_url: resource?.download_url,
          external_url: resource?.external_url,
          is_featured: resource?.is_featured ?? true,
          allow_comments: resource?.allow_comments ?? true,
          notify_subscribers: resource?.notify_subscribers ?? false,
        });
      } catch (error) {
        console.error(error);
        showError("Unable to retrieve resource data");
        navigate(ROUTES.RESOURCE.LIST);
      } finally {
        setPageLoading(false);
      }
    };

    if (id) fetchResource();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={3}>
          <RouteBreadcrumbs />

          <BasicInformation formik={formik} />
          <Classification formik={formik} />
          <Thumbnail formik={formik} />
          <LinksDownloads formik={formik} />
          <Options formik={formik} />

          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 1 }}>
            <Button
              variant="contained"
              size="large"
              disabled={loading || pageLoading}
              onClick={formik.handleSubmit}
              sx={{
                minWidth: 180,
                height: 46,
                borderRadius: "10px",
                textTransform: "none",
                fontSize: 15,
                fontWeight: 700,
                boxShadow: "none",
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                  boxShadow: "none",
                },
              }}
            >
              {loading ? "Updating..." : "Update resource"}
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ResourceUpdatePage;