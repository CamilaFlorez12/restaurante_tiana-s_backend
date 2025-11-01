import { Router } from "express";
import {
  registrarRestauranteDTO,
  actualizarRestauranteDTO,
} from "../dtos/restaurantesDTO.js";

import {
  registroRestaurante,
  verRestaurantes,
  verUnRestaurante,
  actualizacionRestaurante,
  eliminacionRestaurante,
  obtenerRestaurantesOrdenados,
  filtroRestaurantesCategoria,
} from "../controllers/restaurantes.controllers.js";

import { verificarPermiso } from "../middlewares/verificacionRoles.middleware.js";
import { autenticacionMiddleware } from "../middlewares/autenticacion.middleware.js";

const router = Router();



// Obtener todos los restaurantes
router.get("/", verRestaurantes);

//Obtener restaurantes ordenados (por popularidad o ranking)
router.get("/orden", obtenerRestaurantesOrdenados);

// Filtrar restaurantes por categoría
router.get("/categoria", filtroRestaurantesCategoria);

//Obtener un restaurante por ID
router.get("/:id", verUnRestaurante);

// Registrar nuevo restaurante
router.post(
  "/",
  autenticacionMiddleware,
  verificarPermiso("registrarRestaurante"),
  registrarRestauranteDTO,
  registroRestaurante
);

// Actualizar restaurante
router.patch(
  "/:id",
  autenticacionMiddleware,
  verificarPermiso("actualizarRestaurante"),
  actualizarRestauranteDTO,
  actualizacionRestaurante
);

// Eliminar restaurante
router.delete(
  "/:id",
  autenticacionMiddleware,
  verificarPermiso("eliminarRestaurante"),
  eliminacionRestaurante
);

export default router;