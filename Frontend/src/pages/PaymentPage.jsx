import React, { useState } from 'react';
import { Container, Box, Typography, Grid, TextField, Button, Card, CardContent, Paper, InputAdornment } from '@mui/material';
import { FaCreditCard, FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';
import Navbar from '../component/header';

function PaymentPage() {
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const [cardNumberError, setCarNumberError]=useState('');
    const [cardNameError, setCardNameError]=useState('');
    const [expiryDateError, setExpiryDateError]=useState('');
    const [cvvError, setCvvError]=useState('');

    const validateCardNumber= (number) => {
        const regex=/^(\d{4}[- ]?){3}\d{4}$/;
        return regex.test(number);
    };

    const validateCardName =(name) => {
        const regex=/^[A-Za-z\s]+$/;
        return regex.test(name);
    };

    const validateExpiryDate = (date) => {
        const regex=/^(0[1-9]|1[0-2])\/\d{2}$/;
        return regex.test(date);
    };

    const validateCVV = (date) => {
        const regex = /^\d{3,4}$/;
        return regex.test(cvv);
    }

    const handlePayment = () => {
        let isValid = true;
        
        if(!validateCardNumber(cardNumber)){
            setCarNumberError('Invalid card number');
            isValid = false;
        }else{
            setCarNumberError('');
        }
        if(!validateCardName(cardName)){
            setCardNameError('Invalid cardholder name');
            isValid = false;
        }else{
            setCardNameError('');
        }
        if(!validateExpiryDate(expiryDate)){
            setExpiryDateError('Invalid expiry date');
            isValid = false;
        }else{
            setExpiryDateError('');
        }
        if(!validateCVV(cvv)){
            setCvvError('Invalid CVV');
            isValid = false;
        }else{
            setCvvError('');
        }

        if(isValid){
            console.log('Payment Details:', { cardNumber, cardName, expiryDate, cvv });

           setCardNumber('');
           setCardName('');
           setExpiryDate('');
           setCvv('');
        }
    };

    return (
        <>
        <Navbar/>
        <Container maxWidth="sm" sx={{backgroundColor: '#D8DFD8'}}>
            <Box sx={{ marginTop: 5, padding: 5,backgroundColor: '#D8DFD8', borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Credit Card Payment
                </Typography>
                <Card>
                    <CardContent>
                        <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
                            <FaCcVisa size={50} style={{ marginRight: 10 }} />
                            <FaCcMastercard size={50} style={{ marginRight: 10 }} />
                            <FaCcAmex size={50} style={{ marginRight: 10 }} />
                            <FaCreditCard size={50} />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                label="Card Number"
                                variant="outlined"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FaCreditCard />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                label="Cardholder Name"
                                variant="outlined"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                            />
                        </Box>
                        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Expiry Date (MM/YY)"
                                    variant="outlined"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="CVV"
                                    variant="outlined"
                                    type="password"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ textAlign: 'center' }}>
                            <Button variant="contained" color="primary" onClick={handlePayment}>
                                Pay Now
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
        </>
        
    );
}

export default PaymentPage;
