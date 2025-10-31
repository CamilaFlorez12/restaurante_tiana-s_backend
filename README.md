# 📚 Documentación de la API - Restaurante Tiana's

## 🚀 Introducción
Este proyecto es una API para el restaurante Tiana's, que permite gestionar usuarios, restaurantes, platos y reseñas, con un sistema de control de roles para administrar la información de manera eficiente. El sistema incluye dos tipos de roles: admin (para gestionar restaurantes, platos, usuarios, etc.) y usuario (para interactuar con el sistema, realizar reseñas, y visualizar menús).

La API facilita la creación, actualización y eliminación de los recursos mencionados, y permite a los usuarios registrar sus opiniones sobre los platos. Además, los administradores pueden manejar los restaurantes y los menús disponibles.

## 📌 Endpoints Principales

### Usuarios

#### POST /api/usuarios/registro
Registra un nuevo usuario.

Cuerpo de la solicitud:
```js
{
  "nombre": "Laura Florez",
  "correo": "laura@example.com",
  "password": "123456",
  "rol": "usuario"
}
```

Respuesta exitosa (201 Created):
```js
{
  "id": "123",
  "nombre": "Laura Florez",
  "correo": "laura@example.com",
  "rol": "usuario"
}
```

#### POST /api/usuarios/login
Inicia sesión de un usuario y devuelve un token JWT.

Cuerpo de la solicitud:
```js
{
  "correo": "laura@example.com",
  "password": "123456"
}
```

Respuesta exitosa (200 OK):
```js
{
  "token": "jwt_token_aqui"
}
```
### Restaurantes

#### GET /api/restaurantes
Obtiene la lista de todos los restaurantes disponibles.

Respuesta exitosa (200 OK):
```js
[
  {
    "id": "1",
    "nombre": "Restaurante Tiana",
    "categoria": "Gourmet",
    "direccion": "Calle 123 #45-67"
  }
]
```

#### POST /api/restaurantes
Registra un nuevo restaurante (solo admin).

Cuerpo de la solicitud:
```js
{
  "nombre": "Restaurante Tiana",
  "categoria": "Gourmet",
  "direccion": "Calle 123 #45-67"
}
```

Respuesta exitosa (201 Created):
```js
{
  "id": "1",
  "nombre": "Restaurante Tiana",
  "categoria": "Gourmet",
  "direccion": "Calle 123 #45-67"
}
```
### Platos

#### GET /api/platos
Obtiene la lista de todos los platos disponibles.

Respuesta exitosa (200 OK):
```js
[
  {
    "id": "1",
    "nombre": "Sushi Especial",
    "precio": 25000,
    "categoria": "Sushi",
    "restauranteId": "1"
  }
]
```

#### POST /api/platos
Registra un nuevo plato (solo admin).

Cuerpo de la solicitud:
```js
{
  "nombre": "Sushi Especial",
  "precio": 25000,
  "categoria": "Sushi",
  "restauranteId": "1"
}
```

Respuesta exitosa (201 Created):
```js
{
  "id": "1",
  "nombre": "Sushi Especial",
  "precio": 25000,
  "categoria": "Sushi",
  "restauranteId": "1"
}
```
### Reseñas

#### POST /api/resenias
Registrar una reseña de un plato (usuario autenticado).

Cuerpo de la solicitud:
```js
{
  "comentario": "Excelente comida!",
  "puntuacion": 5,
  "usuarioId": "123",
  "platoId": "1"
}
```

Respuesta exitosa (201 Created):
```js
{
  "id": "1",
  "comentario": "Excelente comida!",
  "puntuacion": 5,
  "usuarioId": "123",
  "platoId": "1"
}
```

#### POST /api/resenias/{id}/like
Dar "like" a una reseña (usuario).

Respuesta exitosa (200 OK):
```js
{
  "mensaje": "Like registrado"
}
```
### Filtros Restaurantes

#### GET /api/restaurantes/orden
Obtener restaurantes ordenados por tipo (ranking o popularidad).

Parámetros de consulta:
```js
{
  "tipo": "ranking"
}
```

Respuesta exitosa (200 OK):
```js
[
  {
    "id": "1",
    "nombre": "Restaurante Tiana",
    "categoria": "Gourmet",
    "direccion": "Calle 123 #45-67"
  }
]
```

#### GET /api/restaurantes/categoria
Filtrar restaurantes por categoría (comida rápida, gourmet, vegetariano, sushi).

Parámetros de consulta:
```js
{
  "categoria": "Sushi"
}
```

Respuesta exitosa (200 OK):
```js
[
  {
    "id": "1",
    "nombre": "Restaurante Tiana",
    "categoria": "Sushi",
    "direccion": "Calle 123 #45-67"
  }
]
```

## 🛠️ Uso con Swagger UI
Para probar los endpoints directamente desde la interfaz Swagger, visita:
http://localhost:4000/documentation

Desde allí, puedes interactuar con la API, enviar solicitudes y ver respuestas en tiempo real.


## 🔗 Repositorio Frontend
- [Repositorio front](https://github.com/ValentinaDelgadoRincon/restaurante_tiana-s-front)

👨‍💻 Autores
Valentina Delgado
Camila Florez