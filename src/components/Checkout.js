import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import api from '../api';

const Checkout = () => {
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/cart/checkout', {address});
      if (response.status === 200) {
        alert('Checkout successful');
        setAddress('');
      }
    } catch (error) {
      console.error('Error during checkout', error);
      alert('Checkout failed');
    }
  };

  return (
    <Box>
      <Typography variant="h4">Checkout</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Address"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">Checkout</Button>
      </form>
    </Box>
  );
};

export default Checkout;
