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
      sx={{
        display: "flex",
        flexDirection: direction,
        gap,
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