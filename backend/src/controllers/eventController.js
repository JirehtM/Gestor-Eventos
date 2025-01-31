const Event = require("../models/Event");

// Obtener eventos del usuario
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los eventos" });
  }
};

// Crear un evento
const createEvent = async (req, res) => {
  const { name, date, time, location, description } = req.body;

  try {
    const event = await Event.create({
      name,
      date,
      time,
      location,
      description,
      user: req.user.id,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el evento" });
  }
};

// Actualizar un evento
const updateEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event || event.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el evento" });
  }
};

// Eliminar un evento
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event || event.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    await Event.findByIdAndDelete(id);

    res.status(200).json({ message: "Evento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el evento" });
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
