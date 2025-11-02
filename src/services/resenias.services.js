import { obtenerDB } from "../config/db.js";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

dotenv.config();
const COLECCION_RESENIAS = "resenias";
const COLECCION_USUARIOS = "usuarios";

export async function crearResenia(datos) {
  const { comentario, calificacion, restauranteId, usuarioId } = datos;

  if (!comentario || !calificacion || !restauranteId) {
    throw new Error("Falta algún campo");
  }

  if (calificacion < 1 || calificacion > 5) {
    throw new Error("La calificación debe estar entre 1 y 5");
  }

  const nuevaResenia = {
    comentario,
    calificacion,
    restauranteId: new ObjectId(restauranteId),
    usuarioId: usuarioId ? new ObjectId(usuarioId) : null,
    likes: [],
    fecha: new Date(),
  };

  await obtenerDB().collection(COLECCION_RESENIAS).insertOne(nuevaResenia);
  return { message: "Nueva reseña creada" };
}

export async function editarResenia(id, datos) {
  const resultado = await obtenerDB()
    .collection(COLECCION_RESENIAS)
    .updateOne({ _id: new ObjectId(id) }, { $set: datos });
  return resultado.matchedCount > 0;
}

export async function eliminarResenia(id) {
  const resultado = await obtenerDB()
    .collection(COLECCION_RESENIAS)
    .deleteOne({ _id: new ObjectId(id) });
  return resultado.deletedCount > 0;
}

// 🔥 ESTA ES LA FUNCIÓN CORREGIDA
export async function obtenerResenias() {
  const resenias = await obtenerDB()
    .collection(COLECCION_RESENIAS)
    .aggregate([
      {
        $lookup: {
          from: COLECCION_USUARIOS,
          localField: "usuarioId",
          foreignField: "_id",
          as: "usuarioData",
        },
      },
      {
        $addFields: {
          usuario: {
            $cond: {
              if: { $gt: [{ $size: "$usuarioData" }, 0] },
              then: {
                $concat: [
                  { $arrayElemAt: ["$usuarioData.nombre", 0] },
                  " ",
                  { $arrayElemAt: ["$usuarioData.apellido", 0] },
                ],
              },
              else: "Anónimo",
            },
          },
          cantidadLikes: { $size: "$likes" },
        },
      },
      {
        $project: {
          usuarioData: 0, // No enviar el array completo al frontend
        },
      },
      {
        $sort: { fecha: -1 }, // Más recientes primero
      },
    ])
    .toArray();

  return resenias;
}

export async function darLikeResenia(reseniaId, usuarioId) {
  if (!ObjectId.isValid(reseniaId)) throw new Error("ID de reseña no válido");
  if (!usuarioId) throw new Error("usuarioId es requerido");

  const resenia = await obtenerDB()
    .collection(COLECCION_RESENIAS)
    .findOne({ _id: new ObjectId(reseniaId) });
  
  if (!resenia) throw new Error("Reseña no encontrada");

  // Convertir usuarioId a string para comparación
  const usuarioIdStr = usuarioId.toString();
  
  // Verificar que no sea su propia reseña
  if (resenia.usuarioId && resenia.usuarioId.toString() === usuarioIdStr) {
    throw new Error("No puedes dar like a tu propia reseña");
  }

  // Asegurar que likes es un array
  if (!Array.isArray(resenia.likes)) {
    resenia.likes = [];
  }

  // Verificar si ya dio like (comparar como strings)
  const yaLeDioLike = resenia.likes.some(
    (id) => id.toString() === usuarioIdStr
  );

  const operacion = yaLeDioLike
    ? { $pull: { likes: new ObjectId(usuarioId) } }
    : { $addToSet: { likes: new ObjectId(usuarioId) } };

  await obtenerDB()
    .collection(COLECCION_RESENIAS)
    .updateOne({ _id: new ObjectId(reseniaId) }, operacion);

  return { message: yaLeDioLike ? "Like eliminado" : "Like agregado" };
}

export async function calcularRankingPlato(platoId) {
  if (!ObjectId.isValid(platoId)) throw new Error("ID de plato no válido");

  const resultado = await obtenerDB()
    .collection(COLECCION_RESENIAS)
    .aggregate([
      { $match: { platoId: new ObjectId(platoId) } },
      { $group: { _id: "$platoId", promedio: { $avg: "$calificacion" } } },
    ])
    .toArray();
  
  return resultado[0]?.promedio || 0;
}