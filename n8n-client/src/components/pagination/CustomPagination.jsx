import { Box, Pagination } from "@mui/material";
import { BG_COLORS, COLORS } from "../common/Colors";

const CustomPagination = ({
  page,
  pageCount,
  onChange,
  justify = { xs: "center", lg: "center" },
  // sx,
  ...props
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: justify,
      }}
    >
      <Pagination
        variant="outlined"
        shape="rounded"
        color="primary"
        count={pageCount}
        page={page}
        onChange={onChange}
        {...props}
        sx={{
          '& .MuiPaginationItem-root': {
            borderRadius: '6px',
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            borderRadius: '6px',
            bgcolor: BG_COLORS.BREADCRUMB_BGCOLOR,
            borderColor: COLORS.BREADCRUMB_BORDER_ACTIVE,
          },
        }}
      />
    </Box>
  );
};

export default CustomPagination;