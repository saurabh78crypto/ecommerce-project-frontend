// src/components/AddProduct.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import api from '../api';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/products', { title, description, price, image });
      if (response.status === 201) {
        alert('Product added successfully');
        setTitle('');
        setDescription('');
        setPrice('');
        setImage('');
      }
    } catch (error) {
      console.error('Error adding product', error);
      alert('Failed to add product');
    }
  };

  return (
    <Box>
      <Typography variant="h4">Add Product</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Price"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          required
          margin="normal"
        />
        <TextField
          label="Image URL"
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Add Product
        </Button>
      </form>
    </Box>
  );
};

export default AddProduct;
