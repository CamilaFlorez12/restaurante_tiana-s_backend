import { Router } from "express";
import { registrarPlatoDTO,actualizarPlatoDTO } from "./platosDTO";
import { registroPlato,verPlatos,verUnPlato,actualizacionPlato,eliminacionPlato} from "./platos.controllers";
import { verificarRol } from "../middlewares/verificacionRoles.middleware";
import { autenticacionMiddleware } from "../middlewares/autenticacion.middleware";

const router = Router();

router.post("/",autenticacionMiddleware,verificarRol("admin"),registrarPlatoDTO,registroPlato);
router.get("/",verPlatos);
router.get("/:id",verUnPlato);
router.patch("/:id",autenticacionMiddleware,verificarRol("admin"),actualizarPlatoDTO,actualizacionPlato);
router.delete("/:id",autenticacionMiddleware,verificarRol("admin"),eliminacionPlato);