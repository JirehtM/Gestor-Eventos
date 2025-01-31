import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { registerUser } from "../services/api";
import backgroundImage from "../assets/ima6.jpg"; // Fondo de imagen
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Para manejar el error
  const navigate = useNavigate(); // Usado para redirigir a la página de login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar el error al intentar registrar

    try {
      await registerUser({ email, password }); // Llamar al API de registro
      navigate("/login"); // Redirigir al login si el registro es exitoso
    } catch (err) {
      setError("Error al registrar. Inténtalo de nuevo.");
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
          Gestión de Eventos Online
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
            Registrarse
          </Button>
        </form>
        <Typography mt={2}>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
