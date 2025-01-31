import React, { useState } from "react";
import { TextField, Button, Container, Typography, AppBar, Toolbar, Box } from "@mui/material";
import { createEvent } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import backgroundImage from "../assets/ima6.jpg"; // Asegúrate de que esta imagen exista

const CreateEvent = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createEvent({ name, date, time, location, description }, token);
      navigate("/events"); // Redirigir a la lista de eventos
    } catch (err) {
      setError("Error al crear el evento. Inténtalo de nuevo.");
    }
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#800020" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Gestión de Eventos</Typography>
          <Box>
            <Button color="inherit" component={Link} to="/events">
              Lista de Eventos
            </Button>
            <Button color="inherit" component={Link} to="/events/create">
              Agregar Evento
            </Button>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Salir
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Imagen debajo del navbar */}
      <Box
        component="img"
        src={backgroundImage}
        alt="Banner"
        sx={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
        }}
      />

      {/* Contenido principal */}
      <Container maxWidth="sm" sx={{ flex: "1", textAlign: "center", mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Crear Evento
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre del evento"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Fecha"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Hora"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Ubicación"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Descripción"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Crear
          </Button>
        </form>
      </Container>

      <br></br>

      {/* Footer */}
      <Box component="footer" sx={{ backgroundColor: "black", color: "white", textAlign: "center", py: 2, mt: "auto" }}>
        <Typography variant="body2">© 2025 Gestión de Eventos. Todos los derechos reservados.</Typography>
      </Box>
    </Box>
  );
};

export default CreateEvent;