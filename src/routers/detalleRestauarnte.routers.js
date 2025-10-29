import { Router } from "express";
import { detalleRestaurante } from "../controllers/detalleRestaurante.controllers.js";
import { autenticacionMiddleware } from "../middlewares/autenticacion.middleware.js";
import { validationRequest } from "../middlewares/validatorDTO.js";

const router = Router();

router.get("/:id/detalle", autenticacionMiddleware,validationRequest, detalleRestaurante);

export default router;
