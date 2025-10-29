import { Router } from "express";
import { registrarRestauranteDTO,actualizarRestauranteDTO } from "../dtos/restaurantesDTO.js";
import { registroRestaurante, verRestaurantes, verUnRestaurante, actualizacionRestaurante, eliminacionRestaurante,obtenerRestaurantesOrdenados,filtroRestaurantesCategoria} from "../controllers/resturantes.controllers.js";
import { verificarPermiso } from "../middlewares/verificacionRoles.middleware.js";
import { autenticacionMiddleware } from "../middlewares/autenticacion.middleware.js";
import { validationRequest } from "../middlewares/validatorDTO.js";

const router = Router();

router.post("/",autenticacionMiddleware,verificarPermiso("registrarRestaurante"),registrarRestauranteDTO,validationRequest,registroRestaurante);
router.get("/",validationRequest,verRestaurantes);
router.get("/orden",validationRequest,obtenerRestaurantesOrdenados);
router.get("/categoria",validationRequest, filtroRestaurantesCategoria)
router.get("/:id",validationRequest,verUnRestaurante);
router.patch("/:id",autenticacionMiddleware,verificarPermiso("actualizarRestaurante"),actualizarRestauranteDTO,validationRequest,actualizacionRestaurante);
router.delete("/:id",autenticacionMiddleware,verificarPermiso("eliminarRestaurante"),validationRequest,eliminacionRestaurante);

//TODOS LOS PERMISOS SON PARA EL ADMIN
export default router;
