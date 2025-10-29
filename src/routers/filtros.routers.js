import { Router } from "express";
import { validationRequest } from "../middlewares/validatorDTO.js";
import{
    obtenerRestaurantesOrdenados,
    filtrarRestaurantesCategoria
} from "../controllers/restaurantes.controllers.js";

const router = Router();

router.get("/orden",validationRequest,obtenerRestaurantesOrdenados);
router.get("/categoria",validationRequest, filtrarRestaurantesCategoria)

export default router;
