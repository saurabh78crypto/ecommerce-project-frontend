import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = ({ setIsLoggedIn, setIsAdmin, setUserEmail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [greeting, setGreeting] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      console.log(response.data.message);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.data.user.role);
        localStorage.setItem('email', email); 
        setIsLoggedIn(true);
        setIsAdmin(response.data.data.user.role === 'superadmin');
        setUserEmail(email); 
        setGreeting(response.data.message); 
        setOpenSnackbar(true);
        
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" fullWidth type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" color="primary">Login</Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        action={<Button color="inherit" onClick={handleCloseSnackbar}>Close</Button>}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {greeting}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
