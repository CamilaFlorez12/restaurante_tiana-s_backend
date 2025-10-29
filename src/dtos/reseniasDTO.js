import { body,param } from "express-validator";

export const registrarReseniaDTO = [
    body("comentario").isString().trim().notEmpty().withMessage("El nombre es un campo obligatorio"),
    body("calificacion").isInt().withMessage("la calificación debe ser un número entero"),
    body("platoId").isString().trim().notEmpty().withMessage("El nombre es un campo obligatorio"),
    body("usuarioId").isString().trim().notEmpty().withMessage("El nombre es un campo obligatorio"),
]

export const editarReseniaDTO = [
    body("comentario").optional().isString().trim().withMessage("El nombre es un campo obligatorio"),
    body("calificacion").optional().isInt().withMessage("la calificación debe ser un número entero"),
]