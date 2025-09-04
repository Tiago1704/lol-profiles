import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response: any = await axios.post("http://localhost:3001/auth/login", {
        email,
        password
      });

      const { token, username, id, email: userEmail } = response.data;
      dispatch(loginSuccess({ token, email: userEmail, username, id }));
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err: any) {
      setError("Error en login: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Paper sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" mb={2}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Stack spacing={1} mt={3}>
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/register")}
            >
              Registrate acá
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
