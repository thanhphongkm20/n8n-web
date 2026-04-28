import { Box, Stack, Grid, Button, Typography, Container } from "@mui/material";
import { ChevronLeft } from "lucide-react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { COLORS } from "../../components/common/Colors";
import { ROUTES } from "../../configs/routes";
import ArticleDescriptionField from "../../components/article/ArticleDescriptionField";
import ArticleSidePanel from "../../components/article/ArticleSidePanel";
import FormLabelField from "../../components/form/FormLabelField";
import MPaper from "../../components/common/MPaper";
import RouteBreadcrumbs from "../../components/common/RouteBreadcrumbs";
import WorkflowDataUpload from "../../components/article/WorkflowDataUpload";
import { showError, showSuccess } from "../../utils/toast";


import articleApi from "../../api/article.api";
import validationSchema from "../../validation/article.validation";

const ArticleCreatePage = () => {
  const [workflowFile, setWorkflowFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      slug: "",
      price: "",
      status: "draft",
      description: "",
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
  });

  const handleGenerateSlug = async () => {
    try {
      const title = formik.values.title;

      if (!title) {
        alert("Please enter title first");
        return;
      }

      const res = await articleApi.generateSlug(title);
      const slug = res?.data?.slug || res?.slug;

      if (!slug) throw new Error("No slug");

      formik.setFieldValue("slug", slug);
    } catch (err) {
      console.error(err);
      alert("Generate slug failed");
    }
  };

  const handleApiError = (err) => {
    const message = err?.response?.data?.message || "Something went wrong";

    // map message → field
    const fieldMap = {
      title: "title",
      description: "description",
      price: "price",
      slug: "slug",
      status: "status",
      image: "image",
      workflow: "workflow",
    };

    const foundField = Object.keys(fieldMap).find((key) =>
      message.toLowerCase().includes(key)
    );

    if (foundField) {
      formik.setFieldError(fieldMap[foundField], message);
    }

    return message;
  };

  const handleSubmit = async () => {
    // validate form trước
    const errors = await formik.validateForm();

    // check file
    if (!workflowFile) errors.workflow = "Workflow is required";
    if (!imageFile) errors.image = "Image is required";

    if (Object.keys(errors).length > 0) {
      formik.setTouched({
        title: true,
        description: true,
        slug: true,
        price: true,
        status: true,
      });

      formik.setErrors(errors);

      showError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", formik.values.title);
      formData.append("description", formik.values.description);
      formData.append("price", formik.values.price);
      formData.append("status", formik.values.status);
      formData.append("slug", formik.values.slug);

      formData.append("workflow", workflowFile);
      formData.append("image", imageFile);

      await articleApi.create(formData, true);

      showSuccess("Article published successfully 🚀");

      setTimeout(() => {
        navigate(ROUTES.ARTICLE.LIST);
      }, 600);

    } catch (err) {
      const message = handleApiError(err);
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#f5f7f9",
        py: 4
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={5}
        >
          <RouteBreadcrumbs />
        </Stack>

        <Grid container spacing={3} columns={12} sx={{ mt: 3, alignItems: 'flex-start' }}>
          {/* LEFT COLUMN - Article Content Area */}
          <Grid item xs={12} sm={8} md={9} lg={9} xl={9} sx={{ flexBasis: { sm: '66.6667%', md: '60%' } }}>
            <Stack gap={3}>

              <MPaper sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight="bold">ARTICLE CONTENT</Typography>
                <Box>
                  <Stack direction="row" alignItems="flex-end" gap={2}>
                    <FormLabelField
                      title="ARTICLE TITLE"
                      placeholder="TITLE"
                      value={formik.values.title}
                      onChange={(e) => formik.setFieldValue("title", e.target.value)}
                      sx={{ flex: 1 }}
                    />
                    <Button
                      variant="outlined"
                      onClick={handleGenerateSlug}
                      sx={{
                        mt: "30px",
                        ml: 1.5,
                        height: 56,
                        textTransform: "none",
                        whiteSpace: "nowrap"
                      }}
                    >
                      GENERATE SLUG
                    </Button>
                  </Stack>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#1a1a1a",
                      display: "block",
                      textAlign: "left",
                      mb: 1.5,
                      lineHeight: 1.4,
                      textTransform: "uppercase"
                    }}
                  >
                    ARTICLE DESCRIPTION
                  </Typography>

                  <ArticleDescriptionField
                    value={formik.values.description}
                    onChange={(val) => formik.setFieldValue("description", val)}
                  />
                </Box>
                <WorkflowDataUpload
                  value={workflowFile}
                  onChange={setWorkflowFile}
                />
              </MPaper>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={4} md={3} lg={3} xl={3} sx={{ flexBasis: { sm: '33.3333%', md: '25%' }, maxWidth: { sm: '33.3333%', md: '25%' } }}>
            <Stack gap={3}>
              <MPaper sx={{ p: 3, borderRadius: 3 }}>
                <ArticleSidePanel
                  formik={formik}
                  imageFile={imageFile}
                  onImageChange={setImageFile}
                />
              </MPaper>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  backgroundColor: COLORS.SECONDARY,
                  color: '#fff',
                  textTransform: 'none',
                  fontSize: 15,
                  borderRadius: 2,
                  py: 1.5,
                  mt: 1.5,
                  '&:hover': {
                    backgroundColor: COLORS.SECONDARY,
                    opacity: 0.9
                  }
                }}
              >
                {loading ? "Publishing..." : "PUBLISH ARTICLE"}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ArticleCreatePage;