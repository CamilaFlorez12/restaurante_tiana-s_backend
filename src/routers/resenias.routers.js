import { Router } from "express";
import { registrarReseniaDTO,editarReseniaDTO } from "../dtos/reseniasDTO";
import { registroResenia,edicionResenia,eliminacionResenia,likeResenia,obtenerRankingPlato} from "../controllers/resenias.controllers";
import { verificarRol } from "../middlewares/verificacionRoles.middleware";
import { autenticacionMiddleware } from "../middlewares/autenticacion.middleware";

const router = Router();

router.post("/",autenticacionMiddleware,verificarRol("usuario"),registrarReseniaDTO,registroResenia);
router.patch("/:id",autenticacionMiddleware,verificarRol("usuario"),editarReseniaDTO,edicionResenia);
router.delete("/:id",autenticacionMiddleware,verificarRol("usuario"),eliminacionResenia);
router.post("/:id/like",autenticacionMiddleware,verificarRol("usuario"),likeResenia);
router.get("/ranking/:platoId",autenticacionMiddleware,verificarRol("usuario"),obtenerRankingPlato);