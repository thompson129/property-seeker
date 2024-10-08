import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, CardActionArea } from '@mui/material';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function PropertyCard({ property }) {
  const navigate = useNavigate();

  let images = [];
  try {
    images = JSON.parse(property.pictures);
  } catch (e) {
    console.error("Error parsing images", e);
  }

  const imageUrl = Array.isArray(images) && images.length > 0 ? images[0] : '';

  const creationDate = format(new Date(property.created_at), 'MMMM dd, yyyy');

  const handleCardClick = () => {
    navigate(`/houses?houseId=${property.house_id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        m: 2,
        borderRadius: 2,
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt="Property image"
          sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            {property.price}THB
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {property.address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Area: {property.area} sq ft
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Created at: {creationDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Type: {property.type}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PropertyCard;
