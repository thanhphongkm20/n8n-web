import { Box, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import ChipRequired from '../common/ChipRequired.jsx';
import { COLORS } from '../common/Colors';
import StackRow from '../common/StackRow';

const FormCreatePassword = ({
  id,
  placeholder,
  form,
  size = 'medium',
  sx = {},
  title = null,
  gap = 5,
  required = false,
  rules = null,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Stack
        justifyContent="flex-start"
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        gap={{ xs: 1, md: title ? gap : 0 }}
        sx={{ width: '100%' }}
      >
        {title && (
          <StackRow
            alignItems='center'
            justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
            sx={{
              width: { xs: '100%', md: "30%" },
              whiteSpace: 'normal',
              color: COLORS.BLACK,
              pr: { md: 2 },
            }}
          >
            <StackRow alignItems='center'>
              <Typography fontSize={{ xs: 14, md: 16 }}>
                {title}
              </Typography>
              {required && <ChipRequired />}
            </StackRow>
          </StackRow>
        )}
        <TextField
          fullWidth
          size={size}
          id={id}
          name={id}
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          value={form?.values?.[id] || ''}
          onChange={form?.handleChange}
          onBlur={form?.handleBlur}
          error={form?.touched?.[id] && Boolean(form?.errors?.[id])}
          helperText={form?.touched?.[id] && form?.errors?.[id]}
          slotProps={{
            htmlInput: { autoComplete: 'new-password' },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={toggleVisibility}
                    edge="end"
                    sx={{ mr: 0.5, color: '#94a3b8' }}
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          }}
          sx={{
            mb: 3,
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
          {...sx}
        />
      </Stack>

      {!!rules?.length && (
        <Box
          sx={{
            color: COLORS.PRIMARY,
            mt: 1,
            ml: title ? { xs: 0, md: '30%', xl: '30%' } : 0,
            pl: title ? { md: gap } : 0
          }}
        >
          {rules.map((rule, index) => (
            <Typography
              key={index}
              sx={{
                fontSize: { xs: 12, md: 13 },
                opacity: 0.8,
                display: 'block'
              }}
            >
              • {rule}
            </Typography>
          ))}
        </Box>
      )}
    </>
  );
};

export default FormCreatePassword;