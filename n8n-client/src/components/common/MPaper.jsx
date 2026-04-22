import { Box, Paper, Typography } from '@mui/material';

const MPaper = ({
  title,
  children,
  fullHeight = false,
  sx = {},
  p = 3,
  ...rest
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: p,
        height: fullHeight ? '100%' : 'unset',
        boxShadow:
          'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
        ...sx,
      }}
      {...rest}
    >
      {title && (
        <Typography variant="body1" fontWeight={600} mb={3}>
          {title}
        </Typography>
      )}
      <Box>
        {children}
      </Box>
    </Paper>
  );
};

export default MPaper;
