import React, { useState, useEffect } from 'react';
import Navbar from '../component/header';
import PropertyCard from '../component/propertyCard';
import Footer from '../component/footer';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';

function HomePage() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/houses/getallhouses') 
      .then(response => response.json())
      .then(data => {
        setProperties(data);
        setFilteredProperties(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Failed to fetch properties');
        setLoading(false);
      });
  }, []);

  const handleSort = (sortType) => {
    const sortedProperties = [...filteredProperties];
    switch (sortType) {
      case 'newest':
        sortedProperties.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'oldest':
        sortedProperties.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case 'highestPrice':
        sortedProperties.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'lowestPrice':
        sortedProperties.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'largestArea':
        sortedProperties.sort((a, b) => parseFloat(b.area) - parseFloat(a.area));
        break;
      case 'smallestArea':
        sortedProperties.sort((a, b) => parseFloat(a.area) - parseFloat(b.area));
        break;
      default:
        break;
    }
    setFilteredProperties(sortedProperties);
  };

  const handleSearch = (searchTerm) => {
    const filtered = properties.filter(property =>
      property.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProperties(filtered);
  };

  const handleTypeSelect = (type) => {
    const filtered = properties.filter(property => property.type === type);
    setFilteredProperties(filtered);
  };

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  if (error) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography variant="h6">Error: {error}</Typography></Box>;

  return (
    <>
      <Navbar onSort={handleSort} onSearch={handleSearch} onTypeSelect={handleTypeSelect} />
      <Box display="flex" flexWrap="wrap" justifyContent="center" p={2}>
        {filteredProperties.length > 0 ? (
          <Grid container spacing={1}> 
            {filteredProperties.map(property => (
              <Grid item xs={12} sm={6} md={3} key={property.house_id}>
                <PropertyCard property={property} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6">No properties found</Typography>
        )}
      </Box>
      <Footer />
    </>
  );
}

export default HomePage;