import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import backgroundImage from "../assets/ima4.avif"; // Fondo de imagen

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Manejar errores
  const navigate = useNavigate(); // Usado para redirigir después del login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar mensaje de error al intentar hacer login

    try {
      const data = await loginUser({ email, password }); // Llamada a API de login
      localStorage.setItem("token", data.token); 
      navigate("/events"); // Redirigir al listado de eventos (o donde quieras) al iniciar sesión exitosamente
    } catch (err) {
      setError("Error al iniciar sesión. Intenta de nuevo.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${backgroundImage})`, // Fondo de imagen
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper elevation={6} sx={{ padding: 4, textAlign: "center", maxWidth: 400 }}>
        <Typography variant="h4" gutterBottom>
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Correo Electrónico"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Iniciar Sesión
          </Button>
        </form>
        <Typography mt={2}>
          ¿No tienes una cuenta? <Link to="/">Regístrate aquí</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
