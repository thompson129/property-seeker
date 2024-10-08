import React, { useState, useEffect } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import Slider from "react-slick";
import {  ReviewsData, faqData } from "../assets/data/dummydata";
import { Container, Box, Typography, Grid, Paper, CircularProgress, Alert, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import KingBedIcon from '@mui/icons-material/KingBed';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from "../component/header";

function DisplayHouse() {
    const [searchParams] = useSearchParams();
    const houseId = searchParams.get('houseId');
    const [houseData, setHouseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate=useNavigate();

    useEffect(() => {
        const fetchHouseData = async () => {
            if (!houseId) {
                setError("House ID is missing");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/api/houses?houseId=${houseId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setHouseData(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setError("Error fetching data");
            } finally {
                setLoading(false);
            }
        };
        fetchHouseData();
    }, [houseId]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (!houseData) {
        return null;
    }

    // Function to get 3 random FAQs
    const getRandomFaqs = (faqArray) => {
        let shuffled = [...faqArray].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    };

    const randomFaqs = getRandomFaqs(faqData);

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const images = [];
    try {
        JSON.parse(houseData[0].pictures).forEach((picture, index) => {
            images.push(
                <Box key={index}>
                    <img src={picture} alt={`Property image ${index + 1}`} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                </Box>
            );
        });
    } catch (e) {
        console.error("Error parsing images", e);
    }
    const handleSubmit = () => {
        navigate('/payment')
      };

    return (
        <>
        <Navbar/>
        <Container maxWidth="lg">
            <Box sx={{ marginTop: 4, padding: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom>{houseData[0].name}</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                            <Slider {...settings}>
                                {images}
                            </Slider>
                            <Box sx={{ padding: 2 }}>
                                <Typography variant="h6">Address</Typography>
                                <Typography variant="body1" sx={{ marginBottom: 2 }}>{houseData[0].address}</Typography>
                                <Typography variant="h6">Rental Rate</Typography>
                                <Typography variant="body1">{houseData[0].price} THB/month</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
                            <Typography variant="h6" sx={{ marginBottom: 2 }}>Details</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Detail</TableCell>
                                            <TableCell>Value</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Monthly</TableCell>
                                            <TableCell>{houseData[0].price} THB</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Deposit</TableCell>
                                            <TableCell>800 THB</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Advance Payment</TableCell>
                                            <TableCell>1 month</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Electric Price</TableCell>
                                            <TableCell>8 THB per unit</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Water Price</TableCell>
                                            <TableCell>12 THB per unit</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Service Fee</TableCell>
                                            <TableCell>200 THB</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                            <Typography variant="h6" sx={{ marginBottom: 2 }}>Amenities</Typography>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <AcUnitIcon sx={{ marginRight: 1 }} />
                                        <Typography variant="body1">Air Conditioner</Typography>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <KingBedIcon sx={{ marginRight: 1 }} />
                                        <Typography variant="body1">Furnished</Typography>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <LocalParkingIcon sx={{ marginRight: 1 }} />
                                        <Typography variant="body1">Parking</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                            <Typography variant="h6" sx={{ marginBottom: 2 }}>Reviews</Typography>
                            <Grid container spacing={2}>
                                {ReviewsData.map((review, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Paper elevation={1} sx={{ padding: 2, borderRadius: 2, display: 'flex', alignItems: 'center' }}>
                                            <Avatar sx={{ marginRight: 2 }}>R</Avatar>
                                            <Typography variant="body1">{review.reviews}</Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                            <Typography variant="h6" sx={{ marginBottom: 2 }}>Frequently Asked Questions</Typography>
                            {randomFaqs.map((faq, index) => (
                                <Accordion key={index}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel${index}-content`}
                                        id={`panel${index}-header`}
                                    >
                                        <Typography variant="h6">{faq.question}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>{faq.answer}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
            <Box sx={{ textAlign: 'right', mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Rent
              </Button>
            </Box>
          </Grid>
            </Box>
        </Container>
        </>  
    );
}

export default DisplayHouse;