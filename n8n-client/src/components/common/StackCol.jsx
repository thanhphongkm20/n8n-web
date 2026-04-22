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
      gap={gap}
      direction="column"
      justifyContent={justifyContent}
      alignItems={alignItems}
      sx={sx}
    >
      {children}
    </Stack>
  );
};

export default StackCol;
