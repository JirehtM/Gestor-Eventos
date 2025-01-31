import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EventList from "./pages/EventList";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/events/edit/:id" element={<EditEvent />} />
      </Routes>
    </Router>
  );
};

export default App;
