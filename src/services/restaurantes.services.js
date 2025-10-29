import { obtenerDB } from "../config/db.js";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

dotenv.config();
const COLECCION_RESTAURANTES = "restaurantes";
export const CATEGORIAS = ["Comida rápida", "Gourmet", "Vegetariano", "Sushi"];


export async function registrarRestaurantes(datos) {
    const {nombre,descripcion,categoria,ubicacion, likes = []} = datos;
    if(!nombre || !descripcion || !categoria || !ubicacion){
        throw new Error("Falta algún campo");
    }

    if(!CATEGORIAS.includes(categoria)){
        throw new Error("Categoria no válida")
    }

    const restauranteExistente = await obtenerDB().collection(COLECCION_RESTAURANTES).findOne({nombre});
    if(restauranteExistente) throw new Error("El restaurante ya existe");

    const nuevoRestaurante = {
        nombre,
        descripcion,
        categoria,
        ubicacion,
        likes
    }

    await obtenerDB().collection(COLECCION_RESTAURANTES).insertOne(nuevoRestaurante);
    return {message:"nuevo restaurante creado"};
}

export async function listarRestaurantes(){
    const restaurantes = await obtenerDB().collection(COLECCION_RESTAURANTES).find().toArray();
    return restaurantes;
}

export async function listarRestaurante(id){
    if(!ObjectId.isValid(id)){
        throw new Error("ID de retaurante no válido");
    }
    const restaurante = await obtenerDB().collection(COLECCION_RESTAURANTES).findOne({_id: new ObjectId(id)});

    if(!restaurante) throw new Error("Restaurante no encontrado");

    return restaurante;
}

export async function actualizarRestaurante(id,datos){
    const resultado = await obtenerDB().collection(COLECCION_RESTAURANTES).updateOne({_id: new ObjectId(id)},{$set:datos});
    return resultado.matchedCount > 0;    
}

export async function eliminarRestaurante(id) {
    const resultado = await obtenerDB().collection(COLECCION_RESTAURANTES).deleteOne({_id:new ObjectId(id)});
    return resultado.deletedCount > 0;
}