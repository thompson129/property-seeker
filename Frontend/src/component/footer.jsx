import React from 'react';
import { Box, Container, Grid, Typography, Link, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6C63FF', 
    background: {
      default: '#D8DFD8', 
    },
    text: {
      primary: "#000000",
    },
  },
}});

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: '#D8DFD8', color: 'black', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" gutterBottom>
                Property Seeker
              </Typography>
              <Typography variant="body2" color="textPrimary">
                Rent smarter, live better.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="h6" gutterBottom>
                Contat us
              </Typography>
              <Link href="#" color="textPrimary" underline="hover" display="block">
                Telephone
              </Link>
              <Link href="#" color="textPrimary" underline="hover" display="block">
                Email
              </Link>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="h6" gutterBottom>
                Types
              </Typography>
              <Link href="#" color="textPrimary" underline="hover" display="block">
                Condo
              </Link>
              <Link href="#" color="textPrimary" underline="hover" display="block">
                Apartment
              </Link>
              <Link href="#" color="textPrimary" underline="hover" display="block">
                Office
              </Link>
              <Link href="#" color="textPrimary" underline="hover" display="block">
                Building
              </Link>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="h6" gutterBottom>
                Services
              </Typography>
              <Link href="#" color="textPrimary" underline="hover" display="block">
                Rent
              </Link>
              <Link href="#" color="textPrimary" underline="hover" display="block">
                Looking for rent
              </Link>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="h6" gutterBottom>
                Company
              </Typography>
              <Link href="#" color="textPrimary" underline="hover" display="block">
                Terms & conditions
              </Link>
              <Link href="#" color="textPrimary" underline="hover" display="block">
                Privacy Policy
              </Link>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" gutterBottom>
                Get in touch
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Facebook sx={{ cursor: 'pointer', color: 'black' }} />
                <Twitter sx={{ cursor: 'pointer', color: 'black' }} />
                <LinkedIn sx={{ cursor: 'pointer', color: 'black' }} />
              </Box>
              
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="textPrimary">
              ©2024 Propety Seeker, All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;