import passport from "passport";
import { ExtractJwt,Strategy as JwtStrategy } from "passport-jwt";
import dotenv from "dotenv";
import { obtenerDB } from "./db.js";
import { ObjectId } from "mongodb";

dotenv.config();

const opciones = {
    secretOrKey: process.env.JWT_SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

passport.use(
    new JwtStrategy(opciones, async (playLoad,done)=>{
        try {
            const user = await obtenerDB().collection("usuarios").findOne({_id:new ObjectId(playLoad.id)});
            if(!user) return done(null, false);
            return done(null,user);
        } catch (error) {
            done (error, false)
        }
    })
)

export default passport;