import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to 'user'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/signup', { email, password, role });
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Signup</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" fullWidth type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select value={role} onChange={(e) => setRole(e.target.value)} label="Role">
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="superadmin">Admin</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">Signup</Button>
      </form>
    </Box>
  );
};

export default Signup;
