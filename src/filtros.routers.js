import { Router } from "express";
import{
    obtenerRestaurantesOrdenados,
    filtrarRestaurantesCategoria
} from "../controllers/restaurantes.controllers.js";

const router = Router();

router.get("/orden",obtenerRestaurantesOrdenados);
router.get("/categoria", filtrarRestaurantesCategoria)
