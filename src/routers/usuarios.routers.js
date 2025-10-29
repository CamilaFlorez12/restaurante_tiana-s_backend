import { Router } from "express";
import { registrarUsuarioDTO,iniciarSesionDTO,actualizarUsuarioDTO } from "../dtos/usuariosDTO.js";
import { registroUsuario,inicioSesion,verUsuarios,actualizacionUsuario,eliminacionUsuario } from "../controllers/usuarios.controllers.js";
import { verificarPermiso } from "../middlewares/verificacionRoles.middleware.js";
import { autenticacionMiddleware } from "../middlewares/autenticacion.middleware.js";
import { validationRequest } from "../middlewares/validatorDTO.js";

const router = Router();

router.post("/registro",registrarUsuarioDTO,validationRequest,registroUsuario);
router.post("/login",iniciarSesionDTO,validationRequest,inicioSesion);
router.get("/",autenticacionMiddleware,verificarPermiso("verUsuarios"),validationRequest,verUsuarios);
router.patch("/:id",autenticacionMiddleware,verificarPermiso("actualizarusuario"),actualizarUsuarioDTO,validationRequest,actualizacionUsuario);
router.delete("/:id",autenticacionMiddleware,verificarPermiso("eliminarUsuario"),validationRequest,eliminacionUsuario);
//todos los permisos para el admin
export default router;
