import { Router } from "express";
import { registrarPlatoDTO,actualizarPlatoDTO } from "../dtos/platosDTO.js";
import { registroPlato,verPlatos,verUnPlato,actualizacionPlato,eliminacionPlato} from "../controllers/platos.controllers.js";
import { verificarPermiso } from "../middlewares/verificacionRoles.middleware.js";
import { autenticacionMiddleware } from "../middlewares/autenticacion.middleware.js";
import { validationRequest } from "../middlewares/validatorDTO.js";

const router = Router();

router.post("/",autenticacionMiddleware,verificarPermiso("registrarPlato"),registrarPlatoDTO,registroPlato);
router.get("/",verPlatos);
router.get("/:id",verUnPlato);
router.patch("/:id",autenticacionMiddleware,verificarPermiso("actualizarPlato"),actualizarPlatoDTO,validationRequest,actualizacionPlato);
router.delete("/:id",autenticacionMiddleware,verificarPermiso("eliminarPlato"),validationRequest,eliminacionPlato);  //TODOS LOS PERMISOS SON PARA EL ADMIN

export default router;
