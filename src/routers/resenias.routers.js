import { Router } from "express";
import { registrarReseniaDTO, editarReseniaDTO } from "../dtos/reseniasDTO.js";
import {
  registroResenia,
  edicionResenia,
  eliminacionResenia,
  likeResenia,
  obtenerRankingPlato,
  listarResenias,
  Notificaciones,
  NotificacionVista

} from "../controllers/resenias.controllers.js";
import { verificarPermiso } from "../middlewares/verificacionRoles.middleware.js";
import { autenticacionMiddleware } from "../middlewares/autenticacion.middleware.js";
import { validationRequest } from "../middlewares/validatorDTO.js";

const router = Router();

router.get("/", listarResenias);

router.post(
  "/",
  autenticacionMiddleware,
  verificarPermiso("registrarResenia"),
  registrarReseniaDTO,
  validationRequest,
  registroResenia
);


router.patch(
  "/:id",
  autenticacionMiddleware,
  verificarPermiso("editarResenia"),
  editarReseniaDTO,
  validationRequest,
  edicionResenia
);


router.delete(
  "/:id",
  autenticacionMiddleware,
  verificarPermiso("eliminarResenia"),
  validationRequest,
  eliminacionResenia
);


router.post(
  "/:id/like",
  autenticacionMiddleware,
  verificarPermiso("darLike"),
  validationRequest,
  likeResenia
);

router.get(
  "/ranking/:platoId",
  autenticacionMiddleware,
  verificarPermiso("votar"),
  validationRequest,
  obtenerRankingPlato
);

router.get("/notificacionesUsuario/:usuarioId",validationRequest,Notificaciones)

router.put("/notificaciones/:id",validationRequest,NotificacionVista)
export default router;