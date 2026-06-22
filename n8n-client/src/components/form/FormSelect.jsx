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

const normalizeData = (data) => {
  // If data is an array, return as-is
  if (Array.isArray(data)) {
    return data;
  }
  
  // If data is an object, convert to array format
  if (data && typeof data === "object") {
    return Object.entries(data).map(([key, value]) => ({
      title: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
      value: value,
    }));
  }
  
  return [];
};

const FormSelect = ({
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
}) => {
  const hasError = form.touched[id] && Boolean(form.errors[id]);
  const rawValue = value !== undefined ? value : form.values[id];
  const normalizedData = normalizeData(data);

  const isValidValue = normalizedData.some(
    (option) => getOptionValue(option) === rawValue
  );

  const selectedValue = isValidValue ? rawValue : "";

  return (
    <FormControl sx={{ width }} error={hasError}>
      <Stack
        direction="column"
        spacing={1.9}
        sx={{ width: "100%", alignItems: 'flex-start' }}
      >

        {/* LABEL */}
        {title && (
          <StackRow alignItems="center">
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 700,
                color: "#1a1a1a",
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
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center'
              },
              '& em': {
                fontStyle: 'normal',
                color: COLORS.PLACEHOLDER,
              },
              backgroundColor: backgroundColor,
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

            {normalizedData.map((option, index) => (
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

export default FormSelect;