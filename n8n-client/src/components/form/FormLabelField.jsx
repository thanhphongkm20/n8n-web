import { Stack, TextField, Typography } from "@mui/material";
import { getIn } from "formik";

import ChipRequired from "../common/ChipRequired";
import { COLORS } from "../common/Colors";
import StackRow from "../common/StackRow";

const FormLabelField = ({
  id,
  placeholder,
  form,
  value,
  onChange,
  type = "text",
  size = "medium",
  sx = {},
  title = null,
  disabled = false,
  required = false,
  label,
  error,
  helperText,
  multiline = false,
  rows,
  minRows,
  maxRows,
  ...props
}) => {
  const fieldValue = value ?? getIn(form?.values, id) ?? "";

  const isError =
    error ?? (form?.touched?.[id] && Boolean(form?.errors?.[id]));

  const helper = helperText ?? (form?.touched?.[id] && form?.errors?.[id]);

  return (
    <Stack sx={{ width: "100%" }}>
      {title && (
        <StackRow
          alignItems="center"
          sx={{
            mb: 2,
            minHeight: 18,
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color: "#111827",
              lineHeight: "18px",
            }}
          >
            {title}
          </Typography>
          {required && <ChipRequired sx={{ ml: 0.5 }} />}
        </StackRow>
      )}

      <TextField
        fullWidth
        disabled={disabled}
        size={size}
        id={id}
        name={id}
        placeholder={placeholder}
        label={label}
        type={type}
        value={fieldValue}
        onChange={onChange ?? form?.handleChange}
        error={isError}
        helperText={helper}
        multiline={multiline}
        rows={rows}
        minRows={minRows}
        maxRows={maxRows}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "9px",
            backgroundColor: "#fff",
            fontSize: 15,

            "& fieldset": {
              borderColor: "#d6d6d6",
            },

            "&:hover fieldset": {
              borderColor: "#bdbdbd",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#1976d2",
              borderWidth: 1,
            },
          },

          "& .MuiInputBase-input": {
            px: 1.6,
            py: multiline ? 1.4 : 1.55,
          },

          "& .MuiInputBase-input::placeholder": {
            color: "#8b8b8b",
            opacity: 1,
          },

          "& textarea": {
            resize: "vertical",
            lineHeight: 1.6,
          },

          "& .MuiInputBase-input.Mui-disabled": {
            color: COLORS.BLACK,
            WebkitTextFillColor: COLORS.BLACK,
          },

          ...sx,
        }}
      />
    </Stack>
  );
};

export default FormLabelField;