import express from "express";
import 'dotenv/config';
import cors from "cors";
import { swaggerDocument } from "./swagger.js";
import swaggerUI from 'swagger-ui-express';
import { conectarDB } from "./config/db.js";
import usuariosRouters from "./routers/usuarios.routers.js";
import restaurantesRouters from "./routers/restaurantes.routers.js";
import platosRouters from "./routers/platos.routers.js";
import reseniasRouters from "./routers/resenias.routers.js";
import detallesRestauranteRouters from "./routers/detalleRestauarnte.routers.js"
import passport from "passport";

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(passport.initialize());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods:["GET","POST","PATCH","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials:false
}));

app.use("/usuarios",usuariosRouters);
app.use("/restaurantes",restaurantesRouters);
app.use("/platos",platosRouters);
app.use("/resenias",reseniasRouters);
app.use("/detallesRestaurante",detallesRestauranteRouters);

app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


app.use("/helth",(req, res)=>{
    res.json({message:"OK"})
})

app.use((req, res)=>{
    res.status(404).json({error:"Ruta no encontrada"})
})

conectarDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`API escucaha en://localhost:${port}`)
    })
})