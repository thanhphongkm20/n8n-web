import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";

import { LoadingPage } from "../bases/LoadingPage";
import BasicInformation from "../../components/resource/BasicInformation";
import Classification from "../../components/resource/Classification";
import LinksDownloads from "../../components/resource/Linksdownloads";
import Options from "../../components/resource/Options";
import RouteBreadcrumbs from "../../components/common/RouteBreadcrumbs";
import Thumbnail from "../../components/resource/Thumbnail";

import resourceApi from "../../api/resource.api";
import resourceValidationSchema from "../../validation/resource.validation";

const ResourceCreatePage = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
        setSuccessMessage("");
        setErrorMessage("");

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
            if (key === "tags") {
              formData.append(key, JSON.stringify(value));
            } else {
              formData.append(key, value ?? "");
            }
          });

          formData.append("thumbnail", values.thumbnail_file);

          await resourceApi.create(formData, true);
        } else {
          await resourceApi.create(payload);
        }

        setSuccessMessage("Resource created successfully");
        formik.resetForm();
      } catch (error) {
        const message =
          error?.message ||
          error?.response?.data?.message ||
          "Create resource failed";

        if (message?.toLowerCase().includes("slug")) {
          formik.setFieldError("slug", message);
          formik.setFieldTouched("slug", true, false);
        }

        setErrorMessage(message);
        console.error("Create resource failed:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  if (loading) {
    return <LoadingPage />;
  }

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
              disabled={loading}
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
              {loading ? "Creating..." : "Create resource"}
            </Button>
          </Box>
        </Stack>
      </Container>

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSuccessMessage("")}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={4000}
        onClose={() => setErrorMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setErrorMessage("")}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ResourceCreatePage;