import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const TypographyLink = ({
  to,
  children,
  color = 'primary',
  fontSize = '0.875rem',
  sx = {},
  onClick
}) => {
  return (
    <Typography
      color={color}
      fontSize={fontSize}
      component={Link}
      sx={{ textDecoration: 'none', ...sx }}
      to={to}
      onClick={onClick ? onClick : null}
    >
      {children}
    </Typography>
  );
};

export default TypographyLink;
