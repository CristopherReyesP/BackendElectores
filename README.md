# BackendElectores (Censo-Backend)

Node.js/Express + MongoDB backend for a voter-canvassing ("censo electoral") tool: user accounts with roles, voter registration records, and real-time map markers shared between connected clients over Socket.IO.

> Learning project built in February 2021 while practicing Express REST APIs, MongoDB/Mongoose, JWT auth and Socket.IO. Kept public as part of my learning history.

## What it does

- **Auth** (`router/auth.js`, `controllers/auth.js`): create user, login, renew JWT, and edit a user with or without re-hashing the password. Passwords are hashed with `bcryptjs`; JWTs are issued/verified via `helpers/jwt.js` and `middlewares/validar-jwt.js`.
- **Usuarios** (`router/usuarios.js`, `models/usuario.js`): users have `nombre`, `email`, `password`, `rol` (e.g. digitador/candidato) and `vinculo`, plus an `online` flag toggled on socket connect/disconnect.
- **Votantes** (`router/votantes.js`, `models/votantes.js`): voter records (name, address, CURP, elector key, municipality, section, the surveyor `digitador` and the `candidato` they're linked to, plus survey answers and vote). Fetched by user id/role or all at once; validated by JWT.
- **Marcadores** (`router/marcador.js`, `models/marcador.js`): map markers (`longitud`, `latitud`, tied to a user/role), listed via a JWT-protected GET route.
- **Sockets** (`models/sockets.js`, `controllers/sockets.js`): on connection, the socket's JWT is validated and the user is marked online; events handle creating/editing/deleting a voter and creating a map marker, broadcasting the result to all connected clients, and mark the user offline on disconnect.
- `models/server.js` wires up Express middleware (static `public/`, CORS, JSON body parsing), mounts the routers under `/api/login`, `/api/votantes`, `/api/usuarios`, `/api/marcadores`, and starts Socket.IO on the same HTTP server.

## Tech Stack

- Node.js, Express 4
- MongoDB via Mongoose 5
- Socket.IO 3
- jsonwebtoken, bcryptjs, express-validator, cors, dotenv

Environment variables used (read via `process.env` in source): `PORT`, `DB_CNN_STRING`, `JWT_KEY`.

## Running Locally

```
npm install
npm run dev     # nodemon index.js
```

Requires a `.env` file (or equivalent environment configuration) providing `PORT`, `DB_CNN_STRING` (MongoDB connection string) and `JWT_KEY`.

## What I practiced

- REST API design with Express routers/controllers and Mongoose models
- JWT-based authentication and route-level authorization middleware
- Password hashing with bcrypt
- Real-time updates with Socket.IO, including auth on the socket handshake
