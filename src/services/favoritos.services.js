import { obtenerDB } from "../config/db.js";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

dotenv.config();

export async function agregarFavoritos(restauranteId, usuarioId){
    if (!usuarioId) throw new Error ("Es necesario el Id del usuario");

    const restaurante = await obtenerDB().collection(restaurantes).findOne({_id: new ObjectId(restauranteId)});
    if (!restaurante) throw new Error("Restaurante no encontrado");
}


if (!Array.isArray(restaurante.favorito)){
    restaurante.favorito
}

 const agregadoFavoritos = restaurante.favorito.some(
    (id) => id.toString() === usuarioIdStr
  );

  const operacion = agregadoFavoritos
    ? { $pull: { favorito: new ObjectId(usuarioId) } }
    : { $addToSet: { favorito: new ObjectId(usuarioId) } };

  await obtenerDB()
    .collection(restaurantes)
    .updateOne({ _id: new ObjectId(restauranteId) }, operacion);

  return { message: agregadoFavoritos ? "Eliminado de favoritos" : "Agregado a favoritos" };
