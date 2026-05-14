import { Box, Chip, TextField } from "@mui/material";
import { getIn } from "formik";
import { useState } from "react";
import { X } from "lucide-react";

const FormTagsInput = ({
  id,
  form,
  placeholder = "Add tag...",
  maxTags = 10,
}) => {
  const [input, setInput] = useState("");

  const tags = getIn(form.values, id) || [];

  const addTag = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (tags.includes(trimmed)) return;
    if (tags.length >= maxTags) return;
    form.setFieldValue(id, [...tags, trimmed]);
  };

  const removeTag = (tagToDelete) => {
    form.setFieldValue(
      id,
      tags.filter((tag) => tag !== tagToDelete)
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
      setInput("");
    }
    if (e.key === "Backspace" && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <Box
      sx={{
        minHeight: 46,
        px: 1.2,
        py: 0.8,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
        border: "1px solid #d6d6d6",
        borderRadius: "8px",
        bgcolor: "#fff",
        "&:focus-within": {
          borderColor: "#1976d2",
        },
      }}
    >
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          onDelete={() => removeTag(tag)}
          deleteIcon={
            <X
              size={12}
              strokeWidth={2.5}
              style={{ color: "#888", marginRight: 4 }}
            />
          }
          sx={{
            height: 28,
            borderRadius: "6px",
            bgcolor: "#f0f0f0",
            color: "#202020",
            fontWeight: 500,
            fontSize: 13,
            "& .MuiChip-label": {
              px: 1,
            },
            "& .MuiChip-deleteIcon": {
              color: "#888",
              ml: 0,
            },
          }}
        />
      ))}

      <TextField
        variant="standard"
        placeholder={tags.length >= maxTags ? "" : placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={tags.length >= maxTags}
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          flex: 1,
          minWidth: 100,
          "& input": {
            fontSize: 14,
            py: 0.4,
            color: "#555",
            "&::placeholder": {
              color: "#aaa",
            },
          },
        }}
      />
    </Box>
  );
};

export default FormTagsInput;