import { body, param } from "express-validator";
import { CATEGORIAS } from "../services/restaurantes.services.js";
export const registrarPlatoDTO = [
    body("nombre").isString().trim().notEmpty().withMessage("El nombre es un campo obligatorio"),
    body("descripcion").isString().trim().notEmpty().withMessage("La descripcion es un campo obligatorio"),
    body("precio").isFloat({ min: 0.01 }).notEmpty().withMessage("El precio es un campo obligatorio"),
    body("categoria").isIn(CATEGORIAS).withMessage("La categoría no es válida"),
]

export const actualizarPlatoDTO = [
    body("nombre").optional().isString().trim().withMessage("El nombre es un campo obligatorio"),
    body("descripcion").optional().isString().trim().withMessage("La descripcion es un campo obligatorio"),
    body("precio").optional().isFloat({ min: 0.01 }).withMessage("El precio es un campo obligatorio"),
    body("categoria").optional().isIn(CATEGORIAS).withMessage("La categoría no es válida"),
]