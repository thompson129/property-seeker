import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Link, CssBaseline, Container } from '@mui/material';
import { FaUser, FaLock } from 'react-icons/fa';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../../context/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    background: {
      paper: '#f4f4f4',
    }
  },
});

theme.components = {
  MuiTextField: {
    styleOverrides: {
      root: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      }
    }
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',  
        margin: theme.spacing(3, 0, 2),
      }
    }
  }
};

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('access_token', data.token);
      login();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs" style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', mx: 'auto', my: 4, p: 3, boxShadow: 3, bgcolor: 'background.paper' }}>
          <Typography variant="h5" textAlign="center" mb={3}>Welcome back</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              InputProps={{ startAdornment: <FaUser style={{ marginRight: '8px' }} /> }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              required
              InputProps={{ startAdornment: <FaLock style={{ marginRight: '8px' }} /> }}
              InputLabelProps={{ shrink: true }}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </Button>
            <Typography variant="body2" textAlign="center">
              Don’t you have an account? <Link href="/signup">Sign Up</Link>
            </Typography>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;