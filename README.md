-GESTIÓN DE EVENTOS-
Descripcion:
Gestión de Eventos es una aplicación CRUD diseñada para administrar eventos de manera eficiente. Permite a los usuarios registrarse, iniciar sesión y gestionar eventos con detalles como nombre, fecha, hora, ubicación y descripción.

🚀 Características

Autenticación y Registro: Los usuarios pueden registrarse e iniciar sesión con correo y contraseña.
Gestión de eventos: Crear, editar, eliminar y listar eventos.
Filtrado: Buscar eventos por ubicación.
Seguridad: Uso de JWT para la gestión de sesiones.
Interfaz moderna: Construida con React y una librería de diseño como Material-UI o Bootstrap
Base de datos: Almacenamiento eficiente con MongoDB.

🛠 Tecnologías Utilizadas
📌 Frontend
React
Material-UI / Bootstrap
React Router DOM

📌 Backend
Node.js con Express
MongoDB con Mongoose
JSON Web Tokens (JWT) para autenticación

✅Preparacion de entorno de desarrollo:
npm init -y
npm install express mongoose jsonwebtoken bcryptjs cors dotenv
npm install react-router-dom

✅Configuración BACKEND:
cd backend
npm install
# Configurar variables de entorno en un archivo .env
MONGO_URI= "mongodb://localhost:27017/eventos"
JWT_SECRET= "tu_secreto"
# Ejecutar el servidor
npm start

✅Configuracion Frontend
cd frontend
npm install
# Iniciar la aplicación
npm start
