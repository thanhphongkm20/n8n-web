import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import { BG_COLORS } from "../components/common/Colors.jsx";
import Topbar from "../components/navigation/Topbar";

const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Main Content Area */}
      <Box display="flex" flex="1">
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflowY: 'hidden',
            bgcolor: BG_COLORS.DEFAULT,
          }}
        >
          <Stack spacing={2} height="100%">
            <Outlet />
          </Stack>
        </Box>
      </Box>
    </Box >
  );
};

export default AuthLayout;
