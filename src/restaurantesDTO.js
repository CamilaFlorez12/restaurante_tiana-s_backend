import {body,param} from "express-validator";

export const registrarRestauranteDTO = [
    body("nombre").isString().trim().notEmpty().withMessage("El nombre es un campo obligatorio"),
    body("descripcion").isString().trim().notEmpty().withMessage("La descripcion es un campo obligatorio"),
    body("categoria").isString().trim().notEmpty().withMessage("La categoria es un campo obligatorio"),
    body("ubicacion").isString().trim().notEmpty().withMessage("La dirección es un campo obligatorio")
]

export const actualizarRestauranteDTO = [
    body("nombre").optional().isString().trim().withMessage("El nombre es un campo obligatorio"),
    body("descripcion").optional().isString().trim().withMessage("La descripcion es un campo obligatorio"),
    body("categoria").optional().isString().trim().withMessage("La categoria es un campo obligatorio"),
    body("ubicacion").optional().isString().trim().withMessage("La dirección es un campo obligatorio")
]