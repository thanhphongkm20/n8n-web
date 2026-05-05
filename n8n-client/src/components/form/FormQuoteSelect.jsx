import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  Typography
} from "@mui/material";

import ChipRequired from "../common/ChipRequired.jsx";
import { COLORS } from '../common/Colors';
import StackRow from "../common/StackRow";

const getOptionValue = (option) => (
  Object.prototype.hasOwnProperty.call(option, "value")
    ? option.value
    : option.id
);

const FormQuoteSelect = ({
  id,
  form = { values: {}, touched: {}, errors: {}, handleChange: () => { } },
  data = [],
  sx = {},
  onChange,
  width = "100%",
  placeholder = null,
  value,
  title = null,
  required = false,
  disabled = false,
  subRequired = false,
  backgroundColor = null,
  titleColor = "#1a1a1a",
}) => {
  const hasError = form.touched[id] && Boolean(form.errors[id]);
  const rawValue = value !== undefined ? value : form.values[id];

  const isValidValue = data.some(
    (option) => getOptionValue(option) === rawValue
  );

  const selectedValue = isValidValue ? rawValue : "";

  return (
    <FormControl sx={{ width }} error={hasError}>
      <Stack direction="column" alignItems="flex-start" gap={1} sx={{ width: "100%" }}>

        {/* LABEL */}
        {title && (
          <StackRow alignItems="center" sx={{ mb: 1 }}>
            <Typography
              sx={{
                fontSize: { xs: 14, md: 16 },
                fontWeight: 500,
                color: titleColor,
                lineHeight: 1.4,
              }}
            >
              {title}
            </Typography>

            {required && <ChipRequired sx={{ ml: 1 }} />}

            {subRequired && (
              <Typography
                sx={{
                  bgcolor: COLORS.PRIMARY,
                  color: COLORS.WHITE,
                  px: 1,
                  py: 0.3,
                  fontSize: 12,
                  borderRadius: 1,
                  ml: 1,
                }}
              >
                {subRequired}
              </Typography>
            )}
          </StackRow>
        )}

        {/* SELECT */}
        <Stack sx={{ width: "100%" }}>
          <Select
            sx={{
              width: "100%",
              height: 50,
              borderRadius: 2,
              backgroundColor: backgroundColor || "rgba(255,255,255,0.05)",
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
                color: '#ffffff',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255,255,255,0.3)',
                borderWidth: '1px',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255,255,255,0.5)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255,255,255,0.8)',
                borderWidth: '2px',
              },
              '& em': {
                fontStyle: 'normal',
                color: 'rgba(255,255,255,0.6)',
              },
              ...sx
            }}
            id={id}
            name={id}
            value={selectedValue}
            onChange={onChange || form.handleChange}
            displayEmpty
            disabled={disabled}
          >
            {placeholder && (
              <MenuItem value="" disabled>
                <em>{placeholder}</em>
              </MenuItem>
            )}

            {data.map((option, index) => (
              <MenuItem
                key={index}
                value={getOptionValue(option)}
                disabled={option.disabled}
              >
                {option.title}
              </MenuItem>
            ))}
          </Select>

          {hasError && <FormHelperText>{form.errors[id]}</FormHelperText>}
        </Stack>
      </Stack>
    </FormControl>
  );
};

export default FormQuoteSelect;