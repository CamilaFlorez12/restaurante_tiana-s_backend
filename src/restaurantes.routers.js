import { Router } from "express";
import { registrarRestauranteDTO,actualizarRestauranteDTO } from "./restaurantesDTO";
import { registroRestaurante, verRestaurantes, verUnRestaurante, actualizacionRestaurante, eliminacionRestaurante} from "./resturantes.controllers";
import { verificarRol } from "../middlewares/verificacionRoles.middleware";
import { autenticacionMiddleware } from "../middlewares/autenticacion.middleware";

const router = Router();

router.post("/",autenticacionMiddleware,verificarRol("admin"),registrarRestauranteDTO,registroRestaurante);
router.get("/",verRestaurantes);
router.get("/:id",verUnRestaurante);
router.patch("/:id",autenticacionMiddleware,verificarRol("admin"),actualizarRestauranteDTO,actualizacionRestaurante);
router.delete("/:id",autenticacionMiddleware,verificarRol("admin"),eliminacionRestaurante);

