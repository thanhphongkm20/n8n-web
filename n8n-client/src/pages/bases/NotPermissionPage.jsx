import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotPermissionPage = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" gutterBottom>
        403 - Forbidden
      </Typography>
      <Typography variant="body1" gutterBottom>
        You do not have permission to access this page.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ mt: 2 }}
      >
        Go to Homepage
      </Button>
    </Container>
  );
};

export default NotPermissionPage;
