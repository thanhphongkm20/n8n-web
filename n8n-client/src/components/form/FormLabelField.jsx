import { Stack, TextField, Typography } from '@mui/material';
import { getIn } from 'formik';
import ChipRequired from '../common/ChipRequired';
import { COLORS } from '../common/Colors';
import StackRow from '../common/StackRow';

const FormLabelField = ({
  id,
  placeholder,
  form,
  value,
  onChange,
  type = 'text',
  size = 'medium',
  sx = {},
  title = null,
  gap = 2,
  disabled = false,
  required = false,
  label,
  error,
  helperText,
}) => {
  const fieldValue = value ?? getIn(form?.values, id) ?? '';
  const isError = error ?? (form?.touched?.[id] && Boolean(form?.errors?.[id]));
  const helper = helperText ?? (form?.touched?.[id] && form?.errors?.[id]);

  return (
    <>
      <Stack
        justifyContent="flex-start"
        direction='column'
        alignItems="flex-start"
        gap={{ xs: 1, md: gap }}
        sx={{ width: '100%' }}
      >
        {title && (
          <StackRow alignItems="center">
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 700,
                color: "#1a1a1a",
                mb: 1,
                lineHeight: 1.4,
              }}
            >
              {title}
            </Typography>

            {required && <ChipRequired sx={{ ml: 1 }} />}
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
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: 2,
            },
            "& .MuiInputBase-input.Mui-disabled": {
              color: COLORS.BLACK,
              WebkitTextFillColor: COLORS.BLACK,
            },
            ...sx,
          }}
        />
      </Stack>
    </>
  );
};

export default FormLabelField;
