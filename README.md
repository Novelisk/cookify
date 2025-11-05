## Cookify -- Buscador y Gestor de Recetas

Nota aclaratoria: Busca recetas en inglés, es una api en inglés.

# Entorno:

Frontend: https://cookify.mooo.com
Backend: https://api.cookify.mooo.com

# Descripción General:

Cookify es una app web que permite a los usuarios buscar recetas por nombre, ver sus detalles y guardar sus recetas favoritas en su perfil de usuario.
El desarrollo fue con React y Vite en el frontend y Node.js, Express y MongoDB en el backend, con despliegue completo en una VM Ubuntu de Google Cloud, manejando seguridad HTTPS mediante Nginx y Certbot.

El sistema implementa: - Búsqueda de recetas desde TheMealDB API. - Visualización en tarjetas (cards) con imagen, nombre y descripción de la receta. - Sistema de usuarios con registro (signup), login y gestión de favoritos. - Persistencia en base de datos MongoDB. - Despliegue completo con Nginx, PM2 y Certbot SSL.

# Arquitectura General:

Frontend: React (Vite) en HTTPS cookify.mooo.com
Backend: Express, MongoDB en HTTPS api.cookify.mooo.com
Servidor: Nginx y PM2

# Frontend:

    - App.jsx maneja rutas protegidas con react-router-dom y ProtectedRoute.
    - UserContext mantiene el estado global del usuario (login, token, favoritos).
    - Main.jsx ejecuta búsqueda de recetas con searchMeals() en TheMealDB API.
    - Popup.jsx muestra detalles de receta con opción de "Guardar en favoritos".
    - UserProfile.jsx consulta y elimina favoritos almacenados en MongoDB.
    - Loader.jsx es una animación de carga global.
    - Diseño responsivo con media queries personalizadas (para visualización tanto en desktop, tablet y smartphone).

# Backend:

Endpoints principales: - POST /api/auth/signup (Registro de nuevo usuario). - POST /api/auth/signin (Inlicio de sesión (login)). - POST /api/users/favorites (Agregar receta a favoritos.) - GET /api/users/me (Perfil de usuario con JWT). - DELETE /api/users/favorites/:recipeId (Eliminar receta de favoritos mediate ID).

Lógica del backend: - authController.js crea usuarios y tokens JWT con bcrypt y jsonwebtoken. - userController.js obtiene, guarda y elimina favoritos. - authMiddleware.js protege rutas mediante validación: Bearer Token. - validation.js implementación de Celebrate/Joi para validación de inputs. - User.js esquema Mongoose para el usuario. - Winston Logger registro de logs/errores. - PM2 mantiene el proceso activo.
