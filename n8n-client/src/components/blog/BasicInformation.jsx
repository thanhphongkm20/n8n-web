import { Box, Paper, Typography } from "@mui/material";
import { FileText } from "lucide-react";

import StackCol from "../common/StackCol";
import StackRow from "../common/StackRow";
import FormLabelField from "../form/FormLabelField";

const BasicInformation = ({ formik }) => {
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
          <FileText size={16} />

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 0.6,
              color: "#262626",
            }}
          >
            BASIC INFORMATION
          </Typography>
        </StackRow>
        <Box sx={{ py: 1 }}>
          <FormLabelField
            id="title"
            title="TITLE"
            placeholder="How AI Automation Saved 40 Hours Per Week"
            form={formik}
          />
        </Box>
        <Box sx={{ py: 1 }}>
          <FormLabelField
            id="slug"
            title="SLUG"
            placeholder="how-ai-automation-saved-40-hours-per-week"
            form={formik}
          />
        </Box>
        <Box sx={{ py: 1 }}>
          <FormLabelField
            id="excerpt"
            title="EXCERPT"
            placeholder="A brief summary shown in the blog list..."
            form={formik}
            multiline
            rows={3}
          />
        </Box>
        <Box sx={{ py: 1 }}>
          <FormLabelField
            id="content"
            title="CONTENT"
            placeholder="Write your full article content here..."
            form={formik}
            multiline
            rows={7}
          />
        </Box>
      </StackCol>
    </Paper>
  );
};

export default BasicInformation;