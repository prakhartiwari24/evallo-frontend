import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Container } from '@mui/material';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/calendar');
    }
  }, [navigate]);

  const handleLogin = () => {
    window.location.href = 'http://localhost:5002/api/auth/google';
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Typography variant="h3" gutterBottom>
          Evallo
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Manage your calendar and events.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{
            mt: 3,
            padding: '10px 20px',
            fontSize: '1rem',
          }}
        >
          Login with Google
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
