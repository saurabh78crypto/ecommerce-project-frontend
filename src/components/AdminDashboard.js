import React from 'react';
import { Box, Typography } from '@mui/material';
import ProductList from './ProductList';

const AdminDashboard = () => {
  return (
    <Box>
      <Typography variant="h4" marginBottom={4}>Admin Dashboard</Typography>
      <ProductList 
        isLoggedIn={true}
        isAdmin={true}
      />
    </Box>
  );
};

export default AdminDashboard;
