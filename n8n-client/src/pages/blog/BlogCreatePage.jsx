import { useState } from "react";
import { Alert, Box, Button, Snackbar, Stack } from "@mui/material";
import { Save } from "lucide-react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import BasicInformation from "../../components/blog/BasicInformation";
import SeoSettings from "../../components/blog/SeoSettings";
import PublishSidebar from "../../components/blog/PublishSidebar";
import ThumbnailUpload from "../../components/blog/ThumbnailUpload";
import RouteBreadcrumbs from "../../components/common/RouteBreadcrumbs";

import blogApi from "../../api/blog.api";
import blogValidationSchema from "../../validation/blog.validation.js";
import { ROUTES } from "../../configs/routes.js";
import { slugify } from "../../utils/slugify.js";

const trimFields = [
  "title",
  "slug",
  "excerpt",
  "content",
  "thumbnail",
  "seo_title",
  "seo_description",
];

const normalizePayload = (values) => ({
  ...values,

  ...Object.fromEntries(
    trimFields.map((key) => [key, values[key]?.trim?.()]),
  ),

  published_at: values.published_at || "",
  tags: values.tags || [],
  is_featured: !!values.is_featured,
});

const BlogCreatePage = () => {
  const navigate = useNavigate();

  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const showToast = (severity, message) => {
    setToast({
      open: true,
      severity,
      message,
    });
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      thumbnail: "",
      type: "",
      tags: [],
      seo_title: "",
      seo_description: "",
      status: "draft",
      is_featured: false,
      published_at: "",
    },

    validationSchema: blogValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await blogApi.create(normalizePayload(values));

        showToast("success", "Create blog successfully");

        resetForm();

        navigate(ROUTES.BLOG_ADMIN.LIST);
      } catch (error) {
        showToast(
          "error",
          error?.response?.data?.message ||
          error?.message ||
          "Create blog failed",
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFieldChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;

    formik.setFieldValue(field, value);

    if (field === "title") {
      const nextSlug = slugify(value);

      formik.setFieldValue("slug", nextSlug);

      if (!formik.values.seo_title) {
        formik.setFieldValue("seo_title", value);
      }
    }
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 1280,
          mx: "auto",
          px: 4,
          py: 3,
        }}
      >
        <Stack spacing={3}>
          <RouteBreadcrumbs />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "minmax(0, 1fr) 320px",
              },
              gap: 2.5,
              alignItems: "start",
            }}
          >
            <Stack spacing={2}>
              <BasicInformation formik={formik} />
              <SeoSettings formik={formik} />
            </Stack>

            <Stack spacing={2}>
              <PublishSidebar
                form={formik.values}
                onChange={handleFieldChange}
                onTagsChange={(tags) =>
                  formik.setFieldValue("tags", tags)
                }
              />

              <ThumbnailUpload
                form={formik.values}
                onChange={handleFieldChange}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={formik.isSubmitting}
                startIcon={<Save size={18} />}
                sx={{
                  height: 52,
                  borderRadius: "14px",
                  textTransform: "none",
                  fontSize: 15,
                  fontWeight: 800,
                  bgcolor: "secondary.main",
                  boxShadow: "none",

                  "&:hover": {
                    bgcolor: "secondary.dark",
                    boxShadow: "0 8px 24px rgba(15,23,42,.18)",
                  },
                }}
              >
                {formik.isSubmitting
                  ? "Creating..."
                  : "Create Blog"}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            open: false,
          }))
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          onClose={() =>
            setToast((prev) => ({
              ...prev,
              open: false,
            }))
          }
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BlogCreatePage;