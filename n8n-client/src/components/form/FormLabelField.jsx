import { Box, Stack, TextField, Typography } from "@mui/material";
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
  onKeyDown,
  type = "text",
  size = "medium",
  sx = {},
  title = null,
  titleIcon = null,
  disabled = false,
  required = false,
  label,
  error,
  helperText,
  multiline = false,
  rows,
  minRows,
  maxRows,
  inputProps,
  slotProps,
}) => {
  const fieldValue = value ?? getIn(form?.values, id) ?? "";

  const isTouched = getIn(form?.touched, id);
  const formError = getIn(form?.errors, id);

  const isError = error ?? (isTouched && Boolean(formError));
  const helper = helperText ?? (isTouched && formError);

  return (
    <Stack sx={{ width: "100%" }}>
      {title && (
        <StackRow
          alignItems="center"
          sx={{
            mb: 1,
            minHeight: 18,
          }}
        >
          {titleIcon && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mr: 0.8,
                color: "#374151",
              }}
            >
              {titleIcon}
            </Box>
          )}

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 800,
              color: "#374151",
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
        onKeyDown={onKeyDown}
        error={Boolean(isError)}
        helperText={helper || ""}
        multiline={multiline}
        rows={rows}
        minRows={minRows}
        maxRows={maxRows}
        slotProps={{
          input: inputProps,
          ...slotProps,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: multiline ? "auto" : 48,
            borderRadius: "12px",
            backgroundColor: "#fff",
            fontSize: 15,
            fontWeight: 700,
            transition: "all .2s ease",

            "& fieldset": {
              borderColor: "#d6dce5",
            },

            "&:hover fieldset": {
              borderColor: "#aeb8c5",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#2563eb",
              borderWidth: 1.5,
            },
          },

          "& .MuiInputBase-input": {
            px: 1.7,
            py: multiline ? 1.4 : 1.45,
          },

          "& .MuiInputAdornment-root": {
            mr: 0.5,
          },

          "& .MuiIconButton-root": {
            color: "#6b7280",
          },

          "& .MuiInputBase-input::placeholder": {
            color: "#9ca3af",
            opacity: 1,
            fontWeight: 600,
          },

          "& textarea": {
            resize: "vertical",
            lineHeight: 1.6,
          },

          "& .MuiInputBase-input.Mui-disabled": {
            color: COLORS.BLACK,
            WebkitTextFillColor: COLORS.BLACK,
          },

          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px #fff inset",
            WebkitTextFillColor: "#111827",
          },

          ...sx,
        }}
      />
    </Stack>
  );
};

export default FormLabelField;