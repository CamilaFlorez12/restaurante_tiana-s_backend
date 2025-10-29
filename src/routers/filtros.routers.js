import { Router } from "express";
import { validationRequest } from "../middlewares/validatorDTO.js";
import{
    obtenerRestaurantesOrdenados,
    filtroRestaurantesCategoria
} from "../controllers/restaurantes.controllers.js";

const router = Router();

router.get("/orden",validationRequest,obtenerRestaurantesOrdenados);
router.get("/categoria",validationRequest, filtroRestaurantesCategoria)

export default router;
