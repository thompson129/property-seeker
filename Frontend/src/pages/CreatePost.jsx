import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../component/header';
import '../css/CreatePost.css';

const FormContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  backgroundColor: '#f9f9f9',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const CreatePost = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    address: '',
    owner_name: '',
    price: 0,
    type: '',
    area: 0,
  });

  const [pictures, setPictures] = useState(Array(6).fill(''));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePictureChange = (index) => (e) => {
    const newPictures = [...pictures];
    newPictures[index] = e.target.value;
    setPictures(newPictures);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredPictures = pictures.filter((url) => url.trim() !== '');
    const dataToSend = { ...formData, pictures: filteredPictures };

    try {
      const response = await axios.post('http://localhost:3000/api/houses/create-post', dataToSend);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <FormContainer maxWidth="md">
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom align="center">
          Create A Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Owner Name"
                name="owner_name"
                value={formData.owner_name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Area"
                name="area"
                type="number"
                value={formData.area}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            {pictures.map((picture, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <StyledTextField
                  fullWidth
                  label={`Picture ${index + 1}`}
                  value={picture}
                  onChange={handlePictureChange(index)}
                  variant="outlined"
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Box textAlign="center">
                <Button type="submit" variant="contained" color="primary" size="large">
                  Create Post
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
    </FormContainer>
    </>
  );
};

export default CreatePost;