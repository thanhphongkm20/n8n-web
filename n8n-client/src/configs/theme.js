import { createTheme } from "@mui/material/styles";
import { COLORS } from "../components/common/Colors";

export const themeConfigs = createTheme({
  palette: {
    primary: {
      main: "#0078CF",
    },
    secondary: {
      main: "#009F8F",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#28A745",
    },
    error: {
      main: "#DC3545",
    },
  },

  typography: {
    fontFamily: ['"Noto Sans JP", sans-serif'].join(","),
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: COLORS.PRIMARY,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: COLORS.PRIMARY,
          },
        },
      },
    },
  },
});
