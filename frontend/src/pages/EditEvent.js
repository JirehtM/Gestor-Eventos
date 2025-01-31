import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { updateEvent, getEvents } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const events = await getEvents(token);
        const currentEvent = events.find((ev) => ev._id === id);
        setEvent(currentEvent);
      } catch (err) {
        console.error("Error al cargar evento:", err);
      }
    };

    fetchEvent();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await updateEvent(id, event, token);
      navigate("/events");
    } catch (err) {
      setError("Error al actualizar el evento. Inténtalo de nuevo.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Editar Evento
      </Typography>
      {event && (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre del evento"
            name="name"
            value={event.name || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Fecha"
            type="date"
            InputLabelProps={{ shrink: true }}
            name="date"
            value={event.date || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Hora"
            type="time"
            InputLabelProps={{ shrink: true }}
            name="time"
            value={event.time || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Ubicación"
            name="location"
            value={event.location || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Descripción"
            multiline
            rows={4}
            name="description"
            value={event.description || ""}
            onChange={handleChange}
          />
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" fullWidth>
            Actualizar
          </Button>
        </form>
      )}
    </Container>
  );
};

export default EditEvent;
