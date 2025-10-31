import { obtenerDB } from "../config/db.js";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

dotenv.config();
const COLECCION_RESENIAS = "resenias";

export async function crearResenia(datos){
    const {comentario, calificacion,restauranteId} = datos;

    if(!comentario || !calificacion || !restauranteId){
        throw new Error("Falta algún campo");
    }

    if (calificacion < 1 || calificacion > 5) {
        throw new Error("La calificación debe estar entre 1 y 5");
    }

    const nuevaResenia = {
        comentario,
        calificacion,
        restauranteId,
        likes:[],
        fecha: new Date()
    }

    await obtenerDB().collection(COLECCION_RESENIAS).insertOne(nuevaResenia);
    return {message:"Nueva reseña creada"};
}

export async function editarResenia(id,datos) {
    const resultado = await obtenerDB().collection(COLECCION_RESENIAS).updateOne({_id:new ObjectId(id)},{$set:datos});
    return resultado.matchedCount > 0;
}

export async function eliminarResenia(id){
    const resultado = await obtenerDB().collection(COLECCION_RESENIAS).deleteOne({_id:new ObjectId(id)});
    return resultado.deletedCount  > 0;
}
export async function obtenerResenias() {
    const resenias = await obtenerDB().collection("resenias").find().toArray();
    return resenias;
  }
  
export async function darLikeResenia(reseniaId, usuarioId) {
    if (!ObjectId.isValid(reseniaId)) throw new Error("ID de reseña no válido");
  if (!usuarioId) throw new Error("usuarioId es requerido");

    const resenia = await obtenerDB().collection(COLECCION_RESENIAS).findOne({_id:new ObjectId(reseniaId)});
    if(!resenia) throw new Error("Reseña no encontrada");

    if(resenia.usuarioId.toString() == usuarioId.toString()){
        throw new Error("No puedes dar like a tu propia reseña");
    }
    if (!Array.isArray(resenia.likes)) {
    resenia.likes = [];
  }
    const like = resenia.likes?.includes(usuarioId);
    const operacion = like?{$pull:{likes:usuarioId}}:{$addToSet:{likes:usuarioId}};

    await obtenerDB().collection(COLECCION_RESENIAS).updateOne({_id:new ObjectId(reseniaId)},operacion);
    return { message: like ? "Like eliminado" : "Like agregado" };
}

export async function calcularRankingPlato(platoId) {
    if(!ObjectId.isValid(platoId)) throw new Error("ID de plato no válido");

    const resultado = await obtenerDB().collection(COLECCION_RESENIAS).aggregate([
        {$match:{platoId}},
        {$group:{_id:"$platoId",promedio:{$avg:"$calificacion"}}}
    ]).toArray();
  return resultado[0]?.promedio || 0;
}