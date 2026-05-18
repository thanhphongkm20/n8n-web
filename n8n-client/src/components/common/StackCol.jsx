import { Stack } from '@mui/material';

const StackCol = ({
  gap = 2,
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  sx = {},
  children
}) => {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent,
        alignItems,
        gap,
        ...sx,
      }}
    >
      {children}
    </Stack>
  );
};

export default StackCol;
