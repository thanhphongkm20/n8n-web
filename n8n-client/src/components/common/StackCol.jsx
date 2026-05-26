import { Stack } from "@mui/material";

const StackCol = ({
  children,
  justifyContent = "flex-start",
  alignItems = "stretch",
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
      direction="column"
      spacing={spacing}
      className={className}
      onClick={onClick}
      sx={{
        display: "flex",
        justifyContent,
        alignItems,
        gap,
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

export default StackCol;