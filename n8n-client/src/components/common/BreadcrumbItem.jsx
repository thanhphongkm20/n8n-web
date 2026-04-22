import { Stack, Typography } from "@mui/material";
import { BG_COLORS, COLORS } from "./Colors";

const BreadcrumbItem = ({ label, icon, onClick, isLast, height = 40 }) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      onClick={!isLast ? onClick : undefined}
      sx={{
        alignItems: "center",
        height: height,
        px: "14px",
        py: "4px",
        borderRadius: "20px",
        border: `1px solid ${isLast
          ? COLORS.BREADCRUMB_BORDER_ACTIVE
          : COLORS.BREADCRUMB_BORDER
          }`,
        backgroundColor: isLast
          ? BG_COLORS.BREADCRUMB_BGCOLOR
          : COLORS.WHITE,
        color: isLast
          ? COLORS.BREADCRUMB_BORDER_ACTIVE
          : COLORS.GREY,
        fontWeight: isLast ? 600 : 400,
        cursor: isLast ? "default" : "pointer",
        fontSize: "0.875rem",
        transition: "all 0.2s",

        "&:hover": !isLast && {
          borderColor: COLORS.BREADCRUMB_BORDER_ACTIVE,
          color: COLORS.BREADCRUMB_BORDER_ACTIVE,
        },
      }}
    >
      {icon}
      <Typography>{label}</Typography>
    </Stack>
  );
};

export default BreadcrumbItem;