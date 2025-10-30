import { body, param } from "express-validator";

export const registrarUsuarioDTO = [
    body("nombre")
        .isString()
        .trim()
        .notEmpty()
        .withMessage("El nombre es un campo obligatorio")
        .bail(),
    body("apellido")
        .isString()
        .trim()
        .notEmpty()
        .withMessage("El apellido es un campo requerido")
        .bail(),
    body("correo")
        .trim()
        .notEmpty()
        .withMessage("El correo es obligatorio")
        .bail()
        .isEmail()
        .withMessage("Debe proporcionar un correo electrónico válido"),
    body("contrasenia")
        .isString()
        .trim()
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres")
        .bail(),
];

export const iniciarSesionDTO = [
    body("correo")
        .trim()
        .notEmpty()
        .withMessage("El correo es obligatorio")
        .bail()
        .isEmail()
        .withMessage("Debe proporcionar un correo electrónico válido"),
    body("contrasenia")
        .isString()
        .trim()
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres")
        .bail(),
];

export const actualizarUsuarioDTO = [
    body("nombre")
        .optional()
        .isString()
        .trim()
        .withMessage("El nombre es un campo obligatorio")
        .bail(),
    body("apellido")
        .optional()
        .isString()
        .trim()
        .withMessage("El apellido es un campo requerido")
        .bail(),
    body("correo")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Debe proporcionar un correo electrónico válido")
        .bail(),
    body("contrasenia")
        .optional()
        .isString()
        .trim()
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres")
        .bail(),
];
