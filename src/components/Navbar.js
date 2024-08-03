// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = ({ isLoggedIn, isAdmin, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Ecommerce
        </Typography>
        {!isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/signup">Register</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
          </>
        ) : isAdmin ? (
          <>
            <Button color="inherit" component={Link} to="/products">Product List</Button>
            <Button color="inherit" component={Link} to="/add-product">Add Product</Button>
            <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/products">Product List</Button>
            <Button color="inherit" component={Link} to="/cart">Cart</Button>
            <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
