import express from "express";
import 'dotenv/config';
import cors from "cors";
import swaggerUI from 'swagger-ui-express';
import { conectarDB } from "./config/db";
import usuariosRouters from "./routers/usuarios.routers.js";

const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use(cors({
    origin: precess.env.FRONTEND_URL,
    methods:["GET","POST","PATCH","DELETE"],
    allowedHeaders:["Content-Type"],
    credentials:false
}));

app.use("/usuarios",usuariosRouters);

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