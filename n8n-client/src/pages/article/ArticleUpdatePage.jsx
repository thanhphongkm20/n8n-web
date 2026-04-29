import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Grid,
  Button,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";

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

const ArticleUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workflowFile, setWorkflowFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [oldImageUrl, setOldImageUrl] = useState("");
  const [oldWorkflowUrl, setOldWorkflowUrl] = useState("");

  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      slug: "",
      price: "",
      status: "draft",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await handleSave(values);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        const res = await articleApi.getById(id);
        const data = res?.data || res;

        formik.setValues({
          title: data?.title,
          slug: data?.slug,
          price: data?.price,
          status: data?.status,
          description: data?.description,
        });

        if (data?.image) setOldImageUrl(data.image);
        if (data?.workflow) setOldWorkflowUrl(data.workflow);

      } catch (err) {
        console.error(err);
        showError("Unable to retrieve article data");
        navigate(ROUTES.ARTICLE.LIST);
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSave = async (values) => {
    try {
      setSubmitting(true);
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("slug", values.slug);
      formData.append("price", values.price);
      formData.append("status", values.status);
      formData.append("description", values.description);

      if (imageFile) {
        formData.append("image", imageFile);
      }
      if (workflowFile) {
        formData.append("workflow", workflowFile);
      }

      await articleApi.update(id, formData, true);

      showSuccess("Article updated successfully!🚀");
      setTimeout(() => navigate(ROUTES.ARTICLE.LIST), 1000);
    } catch (err) {
      showError(err?.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGenerateSlug = async () => {
    if (!formik.values.title) {
      showError("Please enter the title first");
      return;
    }
    try {
      const res = await articleApi.generateSlug(formik.values.title);
      formik.setFieldValue("slug", res?.data?.slug || res?.slug);
    } catch {
      showError("Slug creation failed");
    }
  };

  if (fetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

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
                  oldUrl={oldWorkflowUrl}
                  setOldUrl={setOldWorkflowUrl}
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
                  oldImageUrl={oldImageUrl}
                  setOldImageUrl={setOldImageUrl}
                  onImageChange={setImageFile}
                />
              </MPaper>
              <Button
                variant="contained"
                fullWidth
                onClick={formik.handleSubmit}
                disabled={submitting}
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
                {submitting ? "Updating..." : "UPDATE ARTICLE"}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ArticleUpdatePage;