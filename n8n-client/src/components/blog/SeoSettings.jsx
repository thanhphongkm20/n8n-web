import { Box, Paper, Typography } from "@mui/material";
import { Search } from "lucide-react";

import FormLabelField from "../form/FormLabelField";
import StackCol from "../common/StackCol";
import StackRow from "../common/StackRow";

const SeoSettings = ({ formik }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #d9d9d9",
        borderRadius: "12px",
        px: 3.5,
        py: 3.2,
        bgcolor: "#fff",
      }}
    >
      <StackCol spacing={2.6}>
        <StackRow spacing={1} alignItems="center" sx={{ mb: 0.8 }}>
          <Search size={16} />

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 0.6,
              color: "#262626",
            }}
          >
            SEO SETTINGS
          </Typography>
        </StackRow>

        <Box sx={{ py: 1 }}>
          <FormLabelField
            id="seo_title"
            title="SEO TITLE"
            placeholder="AI Automation with n8n Case Study"
            form={formik}
          />
        </Box>

        <Box sx={{ py: 1 }}>
          <FormLabelField
            id="seo_description"
            title="SEO DESCRIPTION"
            placeholder="Meta description shown in search results..."
            form={formik}
            multiline
            rows={4}
          />
        </Box>
      </StackCol>
    </Paper>
  );
};

export default SeoSettings;