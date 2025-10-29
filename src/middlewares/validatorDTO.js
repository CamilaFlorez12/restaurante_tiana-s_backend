import { validationResult } from "express-validator";

export function validationRequest(req, res, next){
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            error:"Error de validación dto",
            message:errores
        })
    }
    next();
}