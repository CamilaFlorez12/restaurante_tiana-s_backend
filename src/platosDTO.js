import { body,param } from "express-validator";

export const registrarPlatoDTO = [
    body("nombre").isString().trim().notEmpty().withMessage("El nombre es un campo obligatorio"),
    body("descripcion").isString().trim().notEmpty().withMessage("La descripcion es un campo obligatorio"),
    body("precio").isFloat({ min: 0.01 }).notEmpty().withMessage("El precio es un campo obligatorio"),
    body("restauarnteId").isvalid().withMessage("El id del restaurante no tine un id válido"),
]

export const actualizarPlatoDTO =[
    body("nombre").optional().isString().trim().withMessage("El nombre es un campo obligatorio"),
    body("descripcion").optional().isString().trim().withMessage("La descripcion es un campo obligatorio"),
    body("precio").optional().isFloat({ min: 0.01 }).withMessage("El precio es un campo obligatorio"),
]