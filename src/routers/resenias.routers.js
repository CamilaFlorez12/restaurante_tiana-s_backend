import { Router } from "express";
import { registrarReseniaDTO, editarReseniaDTO } from "../dtos/reseniasDTO.js";
import {
  registroResenia,
  edicionResenia,
  eliminacionResenia,
  likeResenia,
  obtenerRankingPlato,
  listarResenias,
} from "../controllers/resenias.controllers.js";
import { verificarPermiso } from "../middlewares/verificacionRoles.middleware.js";
import { autenticacionMiddleware } from "../middlewares/autenticacion.middleware.js";
import { validationRequest } from "../middlewares/validatorDTO.js";

const router = Router();

// 🔥 CAMBIO IMPORTANTE: Listar reseñas ahora es público (sin autenticación obligatoria)
router.get("/", listarResenias);

// Crear reseña (requiere autenticación)
router.post(
  "/",
  autenticacionMiddleware,
  verificarPermiso("registrarResenia"),
  registrarReseniaDTO,
  validationRequest,
  registroResenia
);

// Editar reseña (requiere autenticación)
router.patch(
  "/:id",
  autenticacionMiddleware,
  verificarPermiso("editarResenia"),
  editarReseniaDTO,
  validationRequest,
  edicionResenia
);

// Eliminar reseña (requiere autenticación)
router.delete(
  "/:id",
  autenticacionMiddleware,
  verificarPermiso("eliminarResenia"),
  validationRequest,
  eliminacionResenia
);

// Dar like (requiere autenticación)
router.post(
  "/:id/like",
  autenticacionMiddleware,
  verificarPermiso("darLike"),
  validationRequest,
  likeResenia
);

// Obtener ranking de plato
router.get(
  "/ranking/:platoId",
  autenticacionMiddleware,
  verificarPermiso("votar"),
  validationRequest,
  obtenerRankingPlato
);

export default router;