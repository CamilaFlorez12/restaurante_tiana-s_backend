export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API Restaurante Tiana’s",
    version: "1.0.0",
    description:
      "API del Restaurante Tiana’s. Permite gestionar usuarios, restaurantes, platos y reseñas con control de roles (admin y usuario).",
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Servidor local de desarrollo",
    },
  ],
  paths: {
    // 🧍 USUARIOS
    "/usuarios/registro": {
      post: {
        summary: "Registrar un nuevo usuario",
        tags: ["Usuarios"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsuarioInput" },
            },
          },
        },
        responses: {
          201: { description: "Usuario registrado correctamente" },
          400: { description: "Datos inválidos" },
        },
      },
    },
    "/usuarios/login": {
      post: {
        summary: "Iniciar sesión de usuario",
        tags: ["Usuarios"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginInput" },
            },
          },
        },
        responses: {
          200: {
            description: "Inicio de sesión exitoso (retorna token JWT)",
          },
          401: { description: "Credenciales incorrectas" },
        },
      },
    },
    "/usuarios": {
      get: {
        summary: "Ver todos los usuarios (solo admin)",
        tags: ["Usuarios"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Lista de usuarios" },
          403: { description: "Acceso denegado" },
        },
      },
    },
    "/usuarios/{id}": {
      patch: {
        summary: "Actualizar datos de usuario (solo admin)",
        tags: ["Usuarios"],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsuarioInput" },
            },
          },
        },
        responses: {
          200: { description: "Usuario actualizado" },
        },
      },
      delete: {
        summary: "Eliminar usuario (solo admin)",
        tags: ["Usuarios"],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          204: { description: "Usuario eliminado" },
        },
      },
    },

    // 🍽️ RESTAURANTES
    "/restaurantes": {
      get: {
        summary: "Ver todos los restaurantes",
        tags: ["Restaurantes"],
        responses: { 200: { description: "Lista de restaurantes" } },
      },
      post: {
        summary: "Registrar un restaurante (solo admin)",
        tags: ["Restaurantes"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RestauranteInput" },
            },
          },
        },
        responses: {
          201: { description: "Restaurante creado" },
        },
      },
    },
    "/restaurantes/{id}": {
      get: {
        summary: "Obtener restaurante por ID",
        tags: ["Restaurantes"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: { 200: { description: "Restaurante encontrado" } },
      },
      patch: {
        summary: "Actualizar restaurante (solo admin)",
        tags: ["Restaurantes"],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RestauranteInput" },
            },
          },
        },
        responses: { 200: { description: "Restaurante actualizado" } },
      },
      delete: {
        summary: "Eliminar restaurante (solo admin)",
        tags: ["Restaurantes"],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: { 204: { description: "Restaurante eliminado" } },
      },
    },

    // 🔍 FILTROS RESTAURANTES (CORREGIDO)
    "/restaurantes/orden": {
      get: {
        summary: "Obtener restaurantes ordenados por tipo (ranking o popularidad)",
        tags: ["Restaurantes - Filtros"],
        parameters: [
          {
            name: "tipo",
            in: "query",
            required: false,
            schema: {
              type: "string",
              enum: ["ranking", "popularidad"],
              example: "ranking",
            },
            description: "Tipo de ordenamiento: ranking o popularidad",
          },
        ],
        responses: {
          200: { description: "Restaurantes ordenados obtenidos" },
          400: { description: "Tipo de orden inválido" },
        },
      },
    },
    "/restaurantes/categoria": {
      get: {
        summary: "Filtrar restaurantes por categoría",
        tags: ["Restaurantes - Filtros"],
        parameters: [
          {
            name: "categoria",
            in: "query",
            required: true,
            schema: {
              type: "string",
              enum: ["Comida rápida", "Gourmet", "Vegetariano", "Sushi"],
              example: "Sushi",
            },
            description: "Categoría de restaurante para filtrar",
          },
        ],
        responses: {
          200: { description: "Restaurantes filtrados por categoría" },
          400: { description: "Categoría no válida" },
        },
      },
    },

    // 🍛 PLATOS
    "/platos": {
      get: {
        summary: "Ver todos los platos",
        tags: ["Platos"],
        responses: { 200: { description: "Lista de platos" } },
      },
      post: {
        summary: "Registrar un plato (solo admin)",
        tags: ["Platos"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PlatoInput" },
            },
          },
        },
        responses: {
          201: { description: "Plato registrado correctamente" },
        },
      },
    },
    "/platos/{id}": {
      get: {
        summary: "Obtener un plato por ID",
        tags: ["Platos"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: { 200: { description: "Plato encontrado" } },
      },
      patch: {
        summary: "Actualizar un plato (solo admin)",
        tags: ["Platos"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PlatoInput" },
            },
          },
        },
        responses: { 200: { description: "Plato actualizado" } },
      },
      delete: {
        summary: "Eliminar un plato (solo admin)",
        tags: ["Platos"],
        security: [{ bearerAuth: [] }],
        responses: { 204: { description: "Plato eliminado" } },
      },
    },

    // ✍️ RESEÑAS
    "/resenias": {
      post: {
        summary: "Registrar una reseña (usuario autenticado)",
        tags: ["Reseñas"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ReseniaInput" },
            },
          },
        },
        responses: { 201: { description: "Reseña registrada" } },
      },
    },
    "/resenias/{id}": {
      patch: {
        summary: "Editar una reseña (usuario)",
        tags: ["Reseñas"],
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Reseña actualizada" } },
      },
      delete: {
        summary: "Eliminar una reseña (usuario)",
        tags: ["Reseñas"],
        security: [{ bearerAuth: [] }],
        responses: { 204: { description: "Reseña eliminada" } },
      },
    },
    "/resenias/{id}/like": {
      post: {
        summary: "Dar like a una reseña (usuario)",
        tags: ["Reseñas"],
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Like registrado" } },
      },
    },
    "/resenias/ranking/{platoId}": {
      get: {
        summary: "Obtener ranking promedio de un plato",
        tags: ["Reseñas"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "platoId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Ranking obtenido exitosamente" },
        },
      },
    },
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      UsuarioInput: {
        type: "object",
        required: ["nombre", "correo", "password"],
        properties: {
          nombre: { type: "string", example: "Laura Florez" },
          correo: { type: "string", example: "laura@example.com" },
          password: { type: "string", example: "123456" },
          rol: { type: "string", enum: ["usuario", "admin"] },
        },
      },
      LoginInput: {
        type: "object",
        required: ["correo", "password"],
        properties: {
          correo: { type: "string" },
          password: { type: "string" },
        },
      },
      RestauranteInput: {
        type: "object",
        required: ["nombre", "categoria"],
        properties: {
          nombre: { type: "string", example: "Restaurante Tiana" },
          categoria: {
            type: "string",
            enum: ["Comida rápida", "Gourmet", "Vegetariano", "Sushi"],
          },
          direccion: { type: "string", example: "Calle 123 #45-67" },
        },
      },
      PlatoInput: {
        type: "object",
        required: ["nombre", "precio", "categoria"],
        properties: {
          nombre: { type: "string", example: "Sushi especial" },
          precio: { type: "number", example: 25000 },
          categoria: {
            type: "string",
            enum: ["Comida rápida", "Gourmet", "Vegetariano", "Sushi"],
          },
          restauranteId: { type: "string" },
        },
      },
      ReseniaInput: {
        type: "object",
        required: ["comentario", "puntuacion"],
        properties: {
          comentario: { type: "string", example: "Excelente comida!" },
          puntuacion: { type: "number", example: 5 },
          usuarioId: { type: "string" },
          platoId: { type: "string" },
        },
      },
    },
  },
};
