import { Router } from "express";
import { registrarReseniaDTO,editarReseniaDTO } from "./reseniasDTO";
import { registroResenia,edicionResenia,eliminacionResenia} from "./resenias.controllers";
import { verificarRol } from "../middlewares/verificacionRoles.middleware";
import { autenticacionMiddleware } from "../middlewares/autenticacion.middleware";

const router = Router();

router.post("/",autenticacionMiddleware,verificarRol("usuario"),registrarReseniaDTO,registroResenia);
router.patch("/",autenticacionMiddleware,verificarRol("usuario"),editarReseniaDTO,edicionResenia);
router.delete("/",autenticacionMiddleware,verificarRol("usuario"),eliminacionResenia);