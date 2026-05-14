import { Box, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { Tag } from "lucide-react";

import StackCol from "../common/StackCol";
import StackRow from "../common/StackRow";
import FormTagsInput from "../form/FormTagsInput";
import {
  RESOURCE_STATUS_OPTIONS,
  RESOURCE_TYPES,
} from "../../configs/constants";

const Classification = ({ formik }) => {
  const selectedType = formik.values.resource_type;

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
      {/* Header */}
      <StackRow spacing={1} alignItems="center" sx={{ mb: 2.4 }}>
        <Tag size={16} />
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 0.6,
            color: "#3f3f3f",
          }}
        >
          CLASSIFICATION
        </Typography>
      </StackRow>

      {/* Resource type */}
      <StackRow alignItems="center" sx={{ mb: 1.2 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
          Resource type
        </Typography>
      </StackRow>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 1,
          mb: 2.4,
        }}
      >
        {RESOURCE_TYPES.map((item) => {
          const Icon = item.icon;
          const active = selectedType === item.value;

          return (
            <Box
              key={item.value}
              onClick={() => formik.setFieldValue("resource_type", item.value)}
              sx={{
                height: 42,
                px: 1.6,
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                cursor: "pointer",
                borderRadius: "7px",
                border: active ? "2px solid #1976d2" : "1px solid #d6d2c8",
                bgcolor: active ? "#e9f3ff" : "#f6f4ee",
                color: active ? "#0b63c7" : "#202020",
                fontWeight: 700,
                fontSize: 14,
                transition: "0.15s ease",
              }}
            >
              <Icon size={17} />
              {item.label}
            </Box>
          );
        })}
      </Box>

      {/* Tags */}
      <StackRow alignItems="center" sx={{ mb: 1.2 }}>
        <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
          Tags
        </Typography>
      </StackRow>

      <Box sx={{ mb: 3 }}>
        <FormTagsInput
          id="tags"
          form={formik}
          placeholder="Add tag..."
          maxTags={10}
        />
      </Box>

      {/* Status */}
      <StackRow alignItems="center" sx={{ mb: 1.2 }}>
        <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
          Status
        </Typography>
      </StackRow>

      <Box sx={{ maxWidth: 330 }}>
        <TextField
          select
          fullWidth
          id="status"
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "7px",
              bgcolor: "#fff",
            },
          }}
        >
          {RESOURCE_STATUS_OPTIONS.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Paper>
  );
};

export default Classification;