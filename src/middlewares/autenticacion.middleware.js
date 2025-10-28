import passport from "passport";
import"../config/contrasenia.js";

export const autenticacionMiddleware = passport.authenticate("jwt",{session:false});

