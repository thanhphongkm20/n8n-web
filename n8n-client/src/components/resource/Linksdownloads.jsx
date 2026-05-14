import { Box, Paper, Typography } from "@mui/material";
import { Link } from "lucide-react";

import StackRow from "../common/StackRow";
import FormLabelField from "../form/FormLabelField";

const LinksDownloads = ({ formik }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #d9d9d9",
        borderRadius: "12px",
        px: 3.5,
        py: 3,
        bgcolor: "#fff",
      }}
    >
      <StackRow spacing={1} alignItems="center" sx={{ mb: 2.4 }}>
        <Link size={16} color="#3f3f3f" />

        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 0.6,
            color: "#3f3f3f",
          }}
        >
          LINKS & DOWNLOADS
        </Typography>
      </StackRow>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
          gap: 2,
        }}
      >
        <Box>
          <FormLabelField
            id="download_url"
            title="Download URL"
            placeholder="https://example.com/download.json"
            form={formik}
          />
        </Box>

        <Box>
          <FormLabelField
            id="external_url"
            title="External URL"
            placeholder="https://docs.n8n.io"
            form={formik}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default LinksDownloads;