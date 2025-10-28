export const verificarRol = (...rolesPermitidos)=>{
    return (req,res,next)=>{
        if(!req.user){
            return res.status(401).json({message:"usuario no autenticado"});
        }

        if(!rolesPermitidos.includes(req.user.rol)){
            return res.status(403).json({message:"no tieenes permiso para acceder"})
        }
        next();
    }
}