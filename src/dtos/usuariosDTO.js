import { body,param } from "express-validator";

export const registrarUsuarioDTO =[
    body("nombre").isString().trim().notEmpty().withMessage("El nombre es un campo obligatorio"),
    body("apellido").isString().trim().notEmpty().withMessage("El apellido es un campo requerido"),
    body("correo").isEmail().withMessage("Debe proporcionar un correo electrónico válido"),
    body("contrasenia").isString().trim().isLength({min:6}).withMessage("La contraseña debe tener al menos 6 caracteres"),
]

export const iniciarSesionDTO = [
    body("correo").isEmail().trim().notEmpty().withMessage("Debe proporcionar un correo electrónico válido"),
    body("contrasenia").isString().trim().isLength({min:6}).withMessage("La contraseña debe tener al menos 6 caracteres")
]