import { Router } from "express";
import { detalleRestaurante } from "../controllers/detalleRestaurante.controllers.js";
import { autenticacionMiddleware } from "../middlewares/autenticacion.middleware.js";

const router = Router();

router.get("/:id/detalle", autenticacionMiddleware, detalleRestaurante);

export default router;
