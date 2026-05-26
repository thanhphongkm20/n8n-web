import { useEffect, useState } from "react";

import { Box, Button, Stack } from "@mui/material";
import { Save } from "lucide-react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

import { LoadingPage } from "../bases/LoadingPage";
import BasicInformation from "../../components/blog/BasicInformation";
import SeoSettings from "../../components/blog/SeoSettings";
import PublishSidebar from "../../components/blog/PublishSidebar";
import ThumbnailUpload from "../../components/blog/ThumbnailUpload";
import RouteBreadcrumbs from "../../components/common/RouteBreadcrumbs";

import blogApi from "../../api/blog.api";
import blogValidationSchema from "../../validation/blog.validation.js";
import { ROUTES } from "../../configs/routes.js";
import { slugify } from "../../utils/slugify.js";
import { showSuccess, showError } from "../../utils/toast";

const trimFields = [
  "title",
  "slug",
  "excerpt",
  "content",
  "thumbnail",
  "seo_title",
  "seo_description",
];

const initialBlogValues = {
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
};

const normalizePayload = (values) => ({
  ...values,

  ...Object.fromEntries(trimFields.map((key) => [key, values[key]?.trim?.()])),

  published_at: values.published_at,
  tags: values.tags,
  is_featured: !!values.is_featured,
});

const normalizeBlogValues = (blog = {}) => ({
  title: blog.title,
  slug: blog.slug,
  excerpt: blog.excerpt,
  content: blog.content,
  thumbnail: blog.thumbnail,
  type: blog.type,
  tags: Array.isArray(blog.tags) ? blog.tags : [],
  seo_title: blog.seo_title,
  seo_description: blog.seo_description,
  status: blog.status,
  is_featured: !!blog.is_featured,
  published_at: blog.published_at ? String(blog.published_at).slice(0, 16) : "",
});

const BlogUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    initialValues: initialBlogValues,
    validationSchema: blogValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        await blogApi.update(id, normalizePayload(values));

        showSuccess("Update blog successfully");

        navigate(ROUTES.BLOG_ADMIN.LIST);
      } catch (error) {
        showError(error?.response?.data?.message || error?.message || "Update blog failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);

        const response = await blogApi.getById(id);

        const blog = response?.data?.data || response?.data || response;

        formik.setValues(normalizeBlogValues(blog));
      } catch (error) {
        showError(error?.response?.data?.message || error?.message || "Get blog detail failed");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleFieldChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    formik.setFieldValue(field, value);

    if (field === "title") {
      const nextSlug = slugify(value);

      formik.setFieldValue("slug", nextSlug);

      if (!formik.values.seo_title) {
        formik.setFieldValue("seo_title", value);
      }
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: "100%", maxWidth: 1280, mx: "auto", px: 4, py: 3 }}>
        <Stack spacing={3}>
          <RouteBreadcrumbs />

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 320px" }, gap: 2.5, alignItems: "start" }}>
            <Stack spacing={2}>
              <BasicInformation formik={formik} />
              <SeoSettings formik={formik} />
            </Stack>

            <Stack spacing={2}>
              <PublishSidebar form={formik.values} onChange={handleFieldChange} onTagsChange={(tags) => formik.setFieldValue("tags", tags)} />

              <ThumbnailUpload form={formik.values} onChange={handleFieldChange} />

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
                {formik.isSubmitting ? "Updating..." : "Update Blog"}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default BlogUpdatePage;
