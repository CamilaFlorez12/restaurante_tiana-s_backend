import { obtenerDB } from "../config/db";;
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

dotenv.config();

export async function obtenerDetalleRestaurante(restauranteId) {
    if (!ObjectId.isValid(restauranteId)) {
    throw new Error("ID de restaurante no válido");
  }

  const resultado = await obtenerDB().collection("restaurantes").aggregate([
    {$match:{_id:new ObjectId(restauranteId)}},
    {
      $lookup: {
        from: "platos",
        localField: "_id",
        foreignField: "restauranteId",
        as: "platos"
      }
    },
    {
      $lookup: {
        from: "resenias",
        localField: "platos._id",
        foreignField: "platoId",
        as: "resenias"
      }
    }
  ]).toArray();

  if (resultado.length === 0) {
    throw new Error("Restaurante no encontrado");
  }

  return resultado[0];
}