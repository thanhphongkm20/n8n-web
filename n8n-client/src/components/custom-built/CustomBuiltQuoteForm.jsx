import { Box, Button, Container, Typography } from "@mui/material";
import { Send } from "lucide-react";

import { BUDGET_OPTIONS, TIMELINE_OPTIONS } from "../../configs/constants";
import FormQuoteField from "../form/FormQuoteField";
import FormQuoteSelect from "../form/FormQuoteSelect";

const CustomBuiltQuoteForm = ({ form }) => {
  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 8, md: 12 },
        borderTop: "1px solid rgba(255,255,255,0.08)",
        bgcolor: "#020617",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 0%, rgba(34,197,94,0.14), transparent 36%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            mx: "auto",
            maxWidth: 780,
            p: { xs: 3, sm: 4, md: 6 },
            borderRadius: "32px",
            bgcolor:
              "linear-gradient(180deg, rgba(255,255,255,0.065), rgba(255,255,255,0.025))",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(18px)",
            boxShadow:
              "0 36px 100px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography
              sx={{
                color: "#22c55e",
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              Custom request
            </Typography>

            <Typography
              variant="h4"
              sx={{
                color: "#f8fafc",
                fontSize: { xs: 30, md: 42 },
                fontWeight: 950,
                letterSpacing: "-0.045em",
                lineHeight: 1.05,
              }}
            >
              Get a Custom Quote
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 2,
                mx: "auto",
                color: "rgba(226,232,240,0.58)",
                lineHeight: 1.75,
                maxWidth: 460,
                fontSize: 15,
              }}
            >
              Tell us what you need. Our team will review your requirements and
              contact you shortly.
            </Typography>
          </Box>

          <Box component="form" onSubmit={form.handleSubmit} noValidate>
            <FormQuoteField
              id="companyName"
              title="Company Name"
              placeholder="Enter company name"
              form={form}
              direction="column"
              titleWidth="100%"
              titleJustify="flex-start"
              titleColor="#f8fafc"
              sx={{ mb: 3 }}
            />

            <FormQuoteField
              id="contactPerson"
              title="Contact Person"
              placeholder="Enter contact person"
              form={form}
              direction="column"
              titleWidth="100%"
              titleJustify="flex-start"
              titleColor="#f8fafc"
              sx={{ mb: 3 }}
            />

            <FormQuoteField
              id="email"
              title="Business Email"
              placeholder="Enter email"
              form={form}
              direction="column"
              titleWidth="100%"
              titleJustify="flex-start"
              titleColor="#f8fafc"
              sx={{ mb: 3 }}
            />

            <FormQuoteSelect
              id="budget"
              title="Budget Range"
              form={form}
              data={BUDGET_OPTIONS}
              placeholder="Select budget"
              backgroundColor="rgba(255,255,255,0.055)"
              titleColor="#f8fafc"
              sx={{ mb: 3 }}
            />

            <FormQuoteSelect
              id="timeline"
              title="Project Timeline"
              form={form}
              data={TIMELINE_OPTIONS}
              placeholder="Select timeline"
              backgroundColor="rgba(255,255,255,0.055)"
              titleColor="#f8fafc"
              sx={{ mb: 3 }}
            />

            <FormQuoteField
              id="description"
              title="Project Details"
              placeholder="Describe your project..."
              form={form}
              direction="column"
              titleWidth="100%"
              titleJustify="flex-start"
              titleColor="#f8fafc"
              multiline
              rows={4}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              disabled={form.isSubmitting}
              endIcon={!form.isSubmitting && <Send size={18} />}
              sx={{
                mt: 2,
                height: 58,
                borderRadius: "16px",
                fontWeight: 900,
                color: "#020617",
                background: "linear-gradient(135deg, #22c55e, #86efac)",
                boxShadow: "0 18px 45px rgba(34,197,94,0.28)",
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(135deg, #16a34a, #4ade80)",
                  boxShadow: "0 22px 55px rgba(34,197,94,0.34)",
                },
                "&.Mui-disabled": {
                  color: "rgba(2,6,23,0.55)",
                  background: "rgba(34,197,94,0.38)",
                },
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

export default CustomBuiltQuoteForm;