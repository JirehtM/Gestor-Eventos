import React, { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../services/api";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/ima6.jpg"; // Imagen debajo del navbar

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents(token);
        setEvents(data);
      } catch (err) {
        setError("Error al cargar los eventos.");
      }
    };

    fetchEvents();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id, token);
      setEvents(events.filter((event) => event._id !== id)); // Actualiza la lista
    } catch (err) {
      console.error("Error al eliminar evento:", err);
      setError("No se pudo eliminar el evento. Inténtalo de nuevo.");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#800000" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Nombre a la izquierda */}
          <Typography variant="h6">Gestión de Eventos</Typography>

          {/* Opciones a la derecha */}
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
        sx={{
          width: "100%",
          height: "150px",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Contenido principal */}
      <Container maxWidth="md" sx={{ flexGrow: 1, textAlign: "center", mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Lista de Eventos
        </Typography>

        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}

        {/* Botón centrado */}
        <Button
          variant="contained"
          component={Link}
          to="/events/create"
          sx={{ marginBottom: 3 }}
        >
          Crear Nuevo Evento
        </Button>

        {/* Lista de eventos */}
        <List>
          {events.map((event) => (
            <React.Fragment key={event._id}>
              <ListItem>
                <ListItemText
                  primary={event.name}
                  secondary={`${event.date} - ${event.time} | ${event.location}`}
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="outlined"
                    component={Link}
                    to={`/events/edit/${event._id}`}
                    sx={{ marginRight: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(event._id)}
                  >
                    Eliminar
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          padding: 2,
          marginTop: "auto",
        }}
      >
        © 2024 Gestión de Eventos. Todos los derechos reservados.
      </Box>
    </Box>
  );
};

export default EventList;
