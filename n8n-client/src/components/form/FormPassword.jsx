import { IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import ChipRequired from '../common/ChipRequired';
import { COLORS } from '../common/Colors';
import StackRow from '../common/StackRow';

const FormPassword = ({
  id,
  placeholder,
  form,
  title = null,
  gap = 5,
  disabled = false,
  required = false,
  sx,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Stack
      justifyContent="flex-start"
      direction={{ xs: 'column', md: 'row' }}
      alignItems="center"
      gap={{ xs: 1, md: gap }}
      sx={{ width: '100%', ...sx }}
    >
      {title && (
        <StackRow
          alignItems="center"
          justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
          sx={{
            width: { xs: '100%', md: '30%' },
            whiteSpace: 'normal',
            color: COLORS.BLACK,
          }}
        >
          <StackRow alignItems="center">
            <Typography fontSize={{ xs: 14, md: 16 }}>
              {title}
            </Typography>
            {required && (
              <ChipRequired sx={{ ml: 1 }} />
            )}
          </StackRow>
        </StackRow>
      )}

      <TextField
        fullWidth
        disabled={disabled}
        size="medium"
        id={id}
        name={id}
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        value={form?.values?.[id] || ""}
        onChange={form?.handleChange}
        onBlur={form?.handleBlur}
        error={form?.touched?.[id] && Boolean(form?.errors?.[id])}
        helperText={form?.touched?.[id] && form?.errors?.[id]}
        slotProps={{
          htmlInput: { autoComplete: "new-password" },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={toggleVisibility}
                  edge="end"
                  sx={{
                    p: 0.8,
                  }}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: 48,
            borderRadius: "10px",
            backgroundColor: "#f8fafc",

            "& fieldset": {
              borderColor: "#e2e8f0",
            },
            "&:hover fieldset": {
              borderColor: "#94a3b8",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#0f766e",
              borderWidth: "1.5px",
            },
          },

          "& input": {
            fontSize: 14,
            padding: "12px 14px",
          },

          "& input::placeholder": {
            color: "#94a3b8",
            opacity: 1,
          },
        }}
      />
    </Stack>
  );
};

export default FormPassword;
