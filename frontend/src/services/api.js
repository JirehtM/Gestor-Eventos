import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Configuración global para axios
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Registrar usuario
export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

// Iniciar sesión
export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

// Obtener eventos (requiere token)
export const getEvents = async (token) => {
  const response = await api.get("/events", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Crear evento
export const createEvent = async (data, token) => {
  const response = await api.post("/events", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Actualizar evento
export const updateEvent = async (id, data, token) => {
  const response = await api.put(`/events/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Eliminar evento
export const deleteEvent = async (id, token) => {
  const response = await api.delete(`/events/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
