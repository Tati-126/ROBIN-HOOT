# 🏹 Robin HOOT — Plataforma de Quizzes Interactivos

Aplicación web SPA de quizzes en tiempo real construida con **React + Vite** (frontend) y **Express + MongoDB + Socket.io** (backend).

## Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| Vite | 6.0.5 | Bundler y dev server |
| React | 18.3.1 | UI Library |
| React Router DOM | 7.x | Enrutamiento SPA |
| React Hook Form | 7.x | Manejo de formularios |
| Zod | 3.x | Validación de esquemas |
| Socket.io Client | 4.8.1 | Comunicación en tiempo real |

## Estructura del Proyecto

```
ROBIN-HOOT/
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   │   ├── ui/           # MyButton, CustomCard, FormInput, Modal, Navbar
│   │   │   ├── GameBoard.jsx
│   │   │   └── RankingTable.jsx
│   │   ├── context/          # AuthContext (Context API)
│   │   ├── hooks/            # useAuth (hook personalizado)
│   │   ├── pages/            # LandingPage, LoginPage, RegisterPage, Dashboard
│   │   ├── services/         # api.js (llamadas al backend)
│   │   ├── App.jsx           # Router principal
│   │   ├── App.css           # Estilos globales responsive
│   │   └── main.jsx          # Entry point con AuthProvider
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
└── docker-compose.yml
```

## Instalación y Ejecución

### Requisitos previos
- Node.js 18+
- MongoDB (local o Atlas)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

La app estará disponible en `http://localhost:5173`.

### Backend

```bash
cd backend
npm install
npm run dev
```

El servidor API estará en `http://localhost:5000`.

### Variables de entorno

Crear un archivo `.env` en `/backend` basado en `.env.example`:

```env
MONGO_URI=mongodb://localhost:27017/robinhoot
JWT_SECRET=tu_secreto_jwt
PORT=5000
```

En `/frontend` puedes crear un `.env` opcional:

```env
VITE_BACKEND_URL=http://localhost:5000
```

## Funcionalidades

- **Landing Page**: Página de aterrizaje con sección Hero y secciones informativas
- **Autenticación**: Login y registro con validaciones (React Hook Form + Zod)
- **Dashboard protegido**: Vista exclusiva para usuarios autenticados con ranking y datos
- **Gestión de estado global**: AuthContext con Context API
- **Componentes reutilizables**: MyButton, CustomCard, FormInput, Modal, Navbar
- **Responsive**: Diseño adaptable a móviles, tablets y escritorio
- **Tiempo real**: Comunicación con Socket.io para partidas en vivo
  {
    "_id": "...",
    "nombre": "ADMIN",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

#### Obtener rol por ID
- **GET** `/api/roles/:id`

#### Crear rol
- **POST** `/api/roles`
- **Body:**
```json
{
  "nombre": "ADMIN"
}
```

#### Actualizar rol
- **PUT** `/api/roles/:id`
- **Body:**
```json
{
  "nombre": "DOCENTE"
}
```

#### Eliminar rol
- **DELETE** `/api/roles/:id`

---

### USUARIOS

#### Obtener todos los usuarios
- **GET** `/api/usuarios`
- **Respuesta:**
```json
[
  {
    "_id": "...",
    "nombre": "Juan",
    "email": "juan@example.com",
    "rolId": {
      "_id": "...",
      "nombre": "ESTUDIANTE"
    },
    "fechaRegistro": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

#### Obtener usuario por ID
- **GET** `/api/usuarios/:id`

#### Crear usuario
- **POST** `/api/usuarios`
- **Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "contraseña": "micontraseña123",
  "rolId": "id_del_rol"
}
```
- **Respuesta:** Usuario creado con contraseña encriptada

#### Actualizar usuario
- **PUT** `/api/usuarios/:id`
- **Body:**
```json
{
  "nombre": "Juan Carlos",
  "email": "juancarlos@example.com",
  "rolId": "id_del_rol"
}
```

#### Cambiar contraseña
- **PATCH** `/api/usuarios/:id/cambiar-contraseña`
- **Body:**
```json
{
  "contraseñaActual": "micontraseña123",
  "contraseñaNueva": "micontraseñanueva456"
}
```

#### Eliminar usuario
- **DELETE** `/api/usuarios/:id`

## Características Principales

✅ Modelos con Mongoose
✅ CRUD completo para Roles y Usuarios
✅ Encriptación de contraseñas con bcryptjs
✅ Validación de datos
✅ Relaciones entre modelos (populate)
✅ Manejo de errores
✅ Timestamps automáticos

## Notas

- Las contraseñas se encriptan automáticamente al crear o cambiar
- Los emails deben ser únicos y válidos
- Los roles disponibles son: ADMIN, DOCENTE, ESTUDIANTE
- Todos los usuarios deben tener un rol asignado
