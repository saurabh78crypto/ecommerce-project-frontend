import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import api from '../api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ isLoggedIn, isAdmin }) => {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ _id: '', title: '', description: '', price: '', image: '' });
  const [editProductId, setEditProductId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      try {
        await api.post('/cart', { productId });
        alert('Product added to cart!');
      } catch (error) {
        console.error("Error adding to cart:", error);
        alert('Failed to add product to cart. Please try again.');
      }
    }
  };

  const handleEditProduct = (productId) => {
    const product = products.find(p => p._id === productId);
    setCurrentProduct(product);
    setEditProductId(productId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditProductId(null);
    setCurrentProduct({ _id: '', title: '', description: '', price: '', image: '' });
  };

  const handleUpdateProduct = async () => {
    try {
      await api.put(`/products/${editProductId}`, currentProduct);
      const response = await api.get('/products');
      setProducts(response.data.data.products);
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);
      const response = await api.get('/products');
      setProducts(response.data.data.products);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Products</Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia component="img" height="140" image={product.image} alt={product.title} />
              <CardContent>
                <Typography variant="h5">{product.title}</Typography>
                <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                <Typography variant="h6">${product.price}</Typography>
                <Box display="flex" justifyContent="space-between" marginTop={2}>
                  {isAdmin ? (
                    <>
                      <IconButton onClick={() => handleEditProduct(product._id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteProduct(product._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  ) : (
                    <Button variant="contained" color="primary" onClick={() => handleAddToCart(product._id)}>Add to Cart</Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            value={currentProduct.title}
            onChange={(e) => setCurrentProduct({ ...currentProduct, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={currentProduct.description}
            onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            value={currentProduct.price}
            onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            variant="outlined"
            value={currentProduct.image}
            onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateProduct} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;
