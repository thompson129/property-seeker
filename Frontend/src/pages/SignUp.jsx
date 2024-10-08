import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Link, CssBaseline, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext'; 


const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',  
    },
    background: {
      paper: '#fff',
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 16,
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        }
      }
    }
  }
});

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validate = () => {
    const errors = {};

    if (!/^[a-zA-Z0-9]{3,20}$/.test(formData.username)) {
      errors.username = 'Username must be 3-20 characters long and alphanumeric';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!/^.{6,}$/.test(formData.password)) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if(!validate()){
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      localStorage.setItem('access_token', data.token);
      login();
      navigate('/signin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Box sx={{ width: '100%', bgcolor: 'background.paper', p: 4, boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h5" textAlign="center" mb={3}>Create an Account</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              variant="outlined"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              InputProps={{ startAdornment: <FaUser style={{ color: '#333', marginRight: '8px' }} /> }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{ startAdornment: <FaEnvelope style={{ color: '#333', marginRight: '8px' }} /> }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{ startAdornment: <FaLock style={{ color: '#333', marginRight: '8px' }} /> }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              variant="outlined"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{ startAdornment: <FaLock style={{ color: '#333', marginRight: '8px' }} /> }}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
              Register
            </Button>
            <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
              Already have an account? <Link href="/signin">Sign In</Link>
            </Typography>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;