import {
  Box,
  Chip,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Send, Tags } from "lucide-react";
import { useState } from "react";

import { FILTERS, RESOURCE_STATUS_OPTIONS } from "../../configs/constants";
import FormLabelField from "../form/FormLabelField";
import FormSelect from "../form/FormSelect";

const SectionTitle = ({ icon, children }) => {
  const IconComponent = icon;

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.5 }}>
      <IconComponent size={15} />

      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: 0.5,
          color: "#111827",
        }}
      >
        {children}
      </Typography>
    </Stack>
  );
};

const PublishSidebar = ({ form, onChange, onTagsChange }) => {
  const [tagInput, setTagInput] = useState("");
  const tags = form.tags;

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (!tag || tags.includes(tag)) return;

    onTagsChange([...tags, tag]);
    setTagInput("");
  };

  const removeTag = (tag) => {
    onTagsChange(tags.filter((item) => item !== tag));
  };

  return (
    <Stack spacing={2}>
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
        <SectionTitle icon={Send}>PUBLISH</SectionTitle>

        <Stack spacing={1.7}>
          <Box>
            <FormSelect
              id="status"
              title="STATUS"
              placeholder="Select status"
              form={{
                values: form,
                touched: {},
                errors: {},
                handleChange: onChange("status"),
              }}
              data={RESOURCE_STATUS_OPTIONS.map((item) => ({
                title: item.label,
                value: item.value,
              }))}
            />
          </Box>

          <Box>
            <FormSelect
              id="type"
              title="TYPE"
              placeholder="Select type"
              form={{
                values: form,
                touched: {},
                errors: {},
                handleChange: onChange("type"),
              }}
              data={FILTERS.filter((item) => item.value).map((item) => ({
                title: item.label,
                value: item.value,
              }))}
            />
          </Box>

          <FormControlLabel
            sx={{ mt: 0.5 }}
            control={
              <Switch
                checked={Boolean(form.is_featured)}
                onChange={onChange("is_featured")}
              />
            }
            label={<Typography sx={{ fontSize: 13 }}>Featured post</Typography>}
          />
        </Stack>
      </Paper>
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: "10px",
          p: 2,
        }}
      >
        <SectionTitle icon={Tags}>TAGS</SectionTitle>

        <FormLabelField
          fullWidth
          size="small"
          value={tagInput}
          placeholder="Type tag and press Enter"
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 1.5 }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => removeTag(tag)}
              size="small"
              sx={{
                bgcolor: "#e0f2f1",
                color: "#00695c",
              }}
            />
          ))}
        </Box>
      </Paper>
    </Stack>
  );
};

export default PublishSidebar;