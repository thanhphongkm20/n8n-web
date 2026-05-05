import { Stack, TextField, Typography } from '@mui/material';
import { getIn } from 'formik';

import ChipRequired from '../common/ChipRequired';
import { COLORS } from '../common/Colors';
import StackRow from '../common/StackRow';

const FormQuoteField = ({
  id,
  placeholder,
  form,
  value,
  onChange,
  type = 'text',
  title = null,
  gap = 5,
  disabled = false,
  required = false,
  subRequired = false,
  titleJustify = { xs: 'flex-start', md: 'flex-end' },
  titleWidth = { xs: '100%', md: '30%' },
  direction = { xs: 'column', md: 'row' },
  titleColor = COLORS.BLACK,
  autoComplete = false,
  error,
  helperText,
  sx,
}) => {
  const fieldValue = value ?? getIn(form?.values, id) ?? '';
  const isError = error ?? (form?.touched?.[id] && Boolean(form?.errors?.[id]));
  const helper = helperText ?? (form?.touched?.[id] && form?.errors?.[id]);

  return (
    <>
      <Stack
        justifyContent="flex-start"
        direction={direction}
        alignItems="center"
        gap={{ xs: 1, md: gap }}
        sx={{ width: '100%', ...sx }}
      >
        {title && (
          <StackRow
            alignItems="center"
            justifyContent={titleJustify}
            sx={{
              width: titleWidth,
              whiteSpace: 'normal',
              color: titleColor,
              pr: { md: 2 },
              mb: 1,
            }}
          >
            <Typography fontSize={{ xs: 14, md: 16 }}>
              {title}
            </Typography>

            {required && (
              <ChipRequired sx={{ ml: 1 }} />
            )}
            {subRequired && (
              <Typography
                sx={{
                  bgcolor: COLORS.PRIMARY,
                  color: COLORS.WHITE,
                  p: 0.8,
                  fontSize: 13,
                  borderRadius: 0,
                  ml: 1,
                }}
              >
                {subRequired}
              </Typography>
            )}
          </StackRow>
        )}
        <TextField
          fullWidth
          disabled={disabled}
          size="medium"
          id={id}
          name={id}
          placeholder={placeholder}
          type={type}
          value={fieldValue}
          onChange={onChange ?? form?.handleChange}
          onBlur={form?.handleBlur}
          error={isError}
          helperText={helper}
          slotProps={{
            htmlInput: autoComplete ? undefined : { autoComplete: "new-password" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 48,
              borderRadius: "10px",
              backgroundColor: "rgba(255,255,255,0.05)",

              "& fieldset": {
                borderColor: "rgba(255,255,255,0.3)",
                borderWidth: "1px",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255,255,255,0.5)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(255,255,255,0.8)",
                borderWidth: "2px",
              },
            },

            "& input": {
              fontSize: 14,
              padding: "12px 14px",
              color: "#ffffff",
            },

            "& textarea": {
              color: "#ffffff",
            },

            "& input::placeholder": {
              color: "rgba(255,255,255,0.6)",
              opacity: 1,
            },

            "& textarea::placeholder": {
              color: "rgba(255,255,255,0.6)",
              opacity: 1,
            },
          }}
        />
      </Stack>
    </>
  );
};

export default FormQuoteField;
