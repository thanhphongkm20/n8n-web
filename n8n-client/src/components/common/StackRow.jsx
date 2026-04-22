import { Stack } from "@mui/material";

const StackRow = ({
  children,
  justifyContent = "flex-start",
  alignItems = "center",
  direction = "row",
  gap = 2,
  sx = {},
  ...rest
}) => {
  return (
    <Stack
      direction={direction}
      gap={gap}
      sx={{
        justifyContent,
        alignItems,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Stack>
  );
};

export default StackRow;