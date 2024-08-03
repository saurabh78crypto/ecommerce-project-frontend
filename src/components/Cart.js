import React, { useContext, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get('/cart');
        
        setCartItems(response.data.data.cart.products || []);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setCartItems([]);
      }
    };
    fetchCartItems();
  }, [setCartItems]);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Box>
      <Typography variant="h4">Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h6">Your cart is empty. Please add products to your cart.</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {cartItems.map((item) => {
              const { product, quantity, _id } = item;
              return (
                <Grid item key={_id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardMedia component="img" height="140" image={product.image} alt={product.title} />
                    <CardContent>
                      <Typography variant="h5">{product.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                      <Typography variant="h6">${product.price}</Typography>
                      <Typography variant="body1">Quantity: {quantity}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <Button variant="contained" color="primary" onClick={handleCheckout}>Checkout</Button>
        </>
      )}
    </Box>
  );
};

export default Cart;
