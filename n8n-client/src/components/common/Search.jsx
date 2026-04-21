import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Search as SearchIcon, X } from "lucide-react";
import { COLORS } from "./Colors";

const Search = ({
  value = "",
  onChange = () => { },
  placeholder,
  height = 50,
  sx,
}) => {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        ...sx,
        "& .MuiOutlinedInput-root": {
          width: "100%",
          height: height,
          bgcolor: COLORS.WHITE,
          borderRadius: "50px",
        },
        "& .MuiOutlinedInput-input": {
          height: "100%",
          boxSizing: "border-box",
          padding: "0 12px",
          display: "flex",
          alignItems: "center",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon size={18} color="#94a3b8" />
          </InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton size="small" onClick={() => onChange("")}>
              <X size={16} />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
};

export default Search;