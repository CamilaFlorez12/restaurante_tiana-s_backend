import rateLimit from "express-rate-limit";

export const limiterPeticiones = rateLimit({
    windowMs: 1000 * 60,
    max: 20,
    message:"Demasiadas solicitudes, intenta de nuevo en un minuto"
})