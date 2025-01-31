const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Generar un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Registro de usuarios
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validación
    if (!email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El usuario ya está registrado" });
    }

    // Crear usuario
    const user = await User.create({ email, password });

    res.status(201).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Inicio de sesión
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user.id,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { registerUser, loginUser };
