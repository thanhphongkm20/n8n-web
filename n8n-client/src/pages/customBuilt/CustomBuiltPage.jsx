import React from "react";

import {
  Box,
  Container,
  Typography,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";
import { Send } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { LoadingPage } from "../bases/LoadingPage";
import { COLORS } from "../../components/common/Colors";
import { BUDGET_OPTIONS, TIMELINE_OPTIONS, UI } from "../../configs/constants";
import quoteApi from "../../api/quote.api";
import quoteValidation from "../../validation/quote.validation";
import FormQuoteField from "../../components/form/FormQuoteField";
import FormQuoteSelect from "../../components/form/FormQuoteSelect";

const CustomBuiltPage = () => {
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
        const payload = {
          companyName: values.companyName.trim(),
          contactPerson: values.contactPerson.trim(),
          email: values.email.trim(),
          budget: values.budget,
          timeline: values.timeline,
          description: values.description.trim(),
        };

        const res = await quoteApi.requestQuote(payload);

        // check response backend
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
        setSubmitting(false);
      }
    },
  });

  if (form.isSubmitting) {
    return <LoadingPage />;
  }

  return (
    <Box
      sx={{
        bgcolor: UI.bg,
        minHeight: "100vh",
        py: { xs: 4, md: 6 },
      }}
    >
      <Typography
        sx={{
          color: UI.muted,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          mb: 1,
        }}
      >
        BUILD CUSTOM AUTOMATION
      </Typography>
      <Typography
        sx={{
          color: UI.text,
          fontSize: { xs: 34, md: 44 },
          fontWeight: 800,
          lineHeight: 1.1,
          fontFamily: "Georgia, serif",
          mb: 1.5,
        }}
      >
        CUSTOM SOLUTIONS
      </Typography>

      <Typography
        sx={{
          color: UI.sub,
          fontSize: { xs: 16, md: 18 },
          lineHeight: 1.7,
          maxWidth: 820,
          mb: 5,

          textAlign: "center",
          mx: "auto",
        }}
      >
        Tailored AI automation systems built for your workflows, business goals, and operational needs.
      </Typography>

      {/* FORM */}
      <Container maxWidth="lg">
        <Box
          sx={{
            mx: "auto",
            maxWidth: 760,
            p: { xs: 4, md: 6 },
            borderRadius: "32px",
            bgcolor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 40px 120px rgba(0,0,0,0.35)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={900}
            sx={{
              textAlign: "center",
              color: "#f8fafc",
              letterSpacing: "-0.02em",
              mb: 1
            }}
          >
            Get a Custom Quote
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#cbd5f5",
              mb: 5,
              textAlign: "center",
              lineHeight: 1.7,
            }}
          >
            Our team will contact you shortly.
          </Typography>

          <Box component="form" onSubmit={form.handleSubmit} noValidate>
            {/* Company */}
            <FormQuoteField
              id="companyName"
              title="Company Name"
              placeholder="Enter company name"
              form={form}
              direction="column"
              titleWidth="100%"
              titleJustify="flex-start"
              titleColor="#ffffff"
              sx={{ mb: 3 }}
            />
            <FormQuoteField
              id="contactPerson"
              title="Contact Person"
              placeholder="Enter contact person"
              form={form}
              sx={{ mb: 3 }}
              direction="column"
              titleWidth="100%"
              titleJustify="flex-start"
              titleColor="#ffffff"
            />
            <FormQuoteField
              id="email"
              title="Business Email"
              placeholder="Enter email"
              form={form}
              direction="column"
              titleWidth="100%"
              titleJustify="flex-start"
              titleColor="#ffffff"
              sx={{ mb: 3 }}
            />
            <FormQuoteSelect
              id="budget"
              title="Budget Range"
              form={form}
              data={BUDGET_OPTIONS}
              placeholder="Select budget"
              sx={{ mb: 3 }}
              backgroundColor="rgba(255,255,255,0.05)"
              titleColor="#ffffff"
            />
            <FormQuoteSelect
              id="timeline"
              title="Project Timeline"
              form={form}
              data={TIMELINE_OPTIONS}
              sx={{ mb: 3 }}
              placeholder="Select timeline"
              backgroundColor="rgba(255,255,255,0.05)"
              titleColor="#ffffff"
            />
            <FormQuoteField
              id="description"
              title="Project Details"
              placeholder="Describe your project..."
              form={form}
              sx={{ mb: 3 }}
              direction="column"
              titleWidth="100%"
              titleJustify="flex-start"
              titleColor="#ffffff"
              multiline
              rows={4}
            />
            {/* Submit */}
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              disabled={form.isSubmitting}
              endIcon={!form.isSubmitting && <Send size={18} />}
              sx={{
                mt: 2,
                height: 56,
                fontWeight: 700,
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, #22c55e, #06b6d4)",
                boxShadow: "0 10px 30px rgba(34,197,94,0.3)",
                textTransform: "none",
                "&:hover": { opacity: 0.9 },
              }}
            >
              {form.isSubmitting ? "Sending..." : "Submit Request"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CustomBuiltPage;