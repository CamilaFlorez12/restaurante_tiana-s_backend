import { Router } from "express";
import { registrarUsuarioDTO,iniciarSesionDTO,actualizarUsuarioDTO } from "../dtos/usuariosDTO";
import { registroUsuario,inicioSesion,verUsuarios,actualizacionUsuario,eliminacionUsuario } from "../controllers/usuarios.controllers";
import { verificarRol } from "../middlewares/verificacionRoles.middleware";
import { autenticacionMiddleware } from "../middlewares/autenticacion.middleware";

const router = Router();

router.post("/registro",registrarUsuarioDTO,registroUsuario);
router.post("/login",iniciarSesionDTO,inicioSesion);
router.get("/",autenticacionMiddleware,verificarRol("admin"),verUsuarios);
router.patch("/:id",autenticacionMiddleware,verificarRol("admin"),actualizarUsuarioDTO,actualizacionUsuario);
router.delete("/:id",autenticacionMiddleware,verificarRol("admin"),eliminacionUsuario);

