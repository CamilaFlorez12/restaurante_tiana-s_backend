import { obtenerDB } from "../config/db.js";

export const verificarPermiso = (permisoRequerido) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "Usuario no autenticado" });
            }
            const rolUsuario = req.user.rol;

            const rolData = await obtenerDB().collection("roles").findOne({ _id: rolUsuario });
            if (!rolData || !rolData.permisos.includes(permisoRequerido)) {
                return res.status(403).json({ message: "No tienes permiso para realizar esta acción" });
            }
            next();
        } catch (error) {
            console.error("Error al verificar permisos:", error);
            res.status(500).json({ message: "Error en el servidor" });
        }
    }
}