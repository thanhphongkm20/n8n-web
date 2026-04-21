import { Box, CircularProgress } from '@mui/material';

import StackCol from '../../components/common/StackCol';

export const LoadingPage = () => (
  <StackCol
    alignItems="center"
    justifyContent="center"
    sx={{
      height: "100%",
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 1000,
    }}
  >
    <Box>
      <CircularProgress size={80} />
    </Box>
  </StackCol>
);