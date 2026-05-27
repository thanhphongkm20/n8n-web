import { useState } from "react";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import { LoadingPage } from "../bases/LoadingPage";
import { UI } from "../../configs/constants";
import quoteApi from "../../api/quote.api";
import quoteValidation from "../../validation/quote.validation";

import CustomBuiltHero from "../../components/custom-built/CustomBuiltHero";
import CustomBuiltProcess from "../../components/custom-built/CustomBuiltProcess";
import CustomBuiltUseCases from "../../components/custom-built/CustomBuiltUseCases";
import CustomBuiltQuoteForm from "../../components/custom-built/CustomBuiltQuoteForm";

const CustomBuiltPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useFormik({
    initialValues: {
      companyName: "",
      contactPerson: "",
      email: "",
      budget: "",
      timeline: "",
      description: "",
    },
    validationSchema: quoteValidation,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        setIsLoading(true);

        const payload = {
          companyName: values.companyName.trim(),
          contactPerson: values.contactPerson.trim(),
          email: values.email.trim(),
          budget: values.budget,
          timeline: values.timeline,
          description: values.description.trim(),
        };

        const res = await quoteApi.requestQuote(payload);

        if (res?.success === false) {
          throw new Error(res.message);
        }

        toast.success("Request sent successfully!");
        resetForm();
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong!";

        toast.error(message);
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });

  if (isLoading) return <LoadingPage />;

  return (
    <Box
      sx={{
        bgcolor: UI.bg,
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <CustomBuiltHero />
      <CustomBuiltProcess />
      <CustomBuiltUseCases />
      <CustomBuiltQuoteForm form={form} />
    </Box>
  );
};

export default CustomBuiltPage;