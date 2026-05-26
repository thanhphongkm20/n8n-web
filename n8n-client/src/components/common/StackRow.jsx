import { Stack } from "@mui/material";

const StackRow = ({
  children,
  justifyContent = "flex-start",
  alignItems = "center",
  direction = "row",
  gap = 2,
  flexWrap = "nowrap",
  spacing,
  width,
  height,
  sx = {},
  className,
  onClick,
}) => {
  return (
    <Stack
      direction={direction}
      spacing={spacing}
      className={className}
      onClick={onClick}
      sx={{
        display: "flex",
        gap,
        justifyContent,
        alignItems,
        flexWrap,
        width,
        height,
        ...sx,
      }}
    >
      {children}
    </Stack>
  );
};

export default StackRow;