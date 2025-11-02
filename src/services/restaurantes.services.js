import { obtenerDB } from "../config/db.js";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

dotenv.config();
const COLECCION_RESTAURANTES = "restaurantes";
const COLECCION_RESENIAS = "resenias";
export const CATEGORIAS = ["Comida Rápida", "Gourmet", "Vegetariana", "Sushi"];

export async function registrarRestaurantes(datos) {
  const { nombre, descripcion, categoria, ubicacion, likes = [] } = datos;
  if (!nombre || !descripcion || !categoria || !ubicacion) {
    throw new Error("Falta algún campo");
  }

  if (!CATEGORIAS.includes(categoria)) {
    throw new Error("Categoría no válida");
  }

  const restauranteExistente = await obtenerDB()
    .collection(COLECCION_RESTAURANTES)
    .findOne({ nombre });
  if (restauranteExistente) throw new Error("El restaurante ya existe");

  const nuevoRestaurante = {
    nombre,
    descripcion,
    categoria,
    ubicacion,
    likes,
  };

  await obtenerDB()
    .collection(COLECCION_RESTAURANTES)
    .insertOne(nuevoRestaurante);
  return { message: "nuevo restaurante creado" };
}

// 🔥 CORREGIDO: Ahora SIEMPRE calcula promedios y likes
export async function listarRestaurantes() {
  const restaurantes = await obtenerDB()
    .collection(COLECCION_RESTAURANTES)
    .aggregate([
      {
        $lookup: {
          from: COLECCION_RESENIAS,
          localField: "_id",
          foreignField: "restauranteId",
          as: "resenias",
        },
      },
      {
        $addFields: {
          promedioCalificacion: {
            $cond: {
              if: { $gt: [{ $size: "$resenias" }, 0] },
              then: { $avg: "$resenias.calificacion" },
              else: 0,
            },
          },
          totalLikes: {
            $reduce: {
              input: "$resenias",
              initialValue: 0,
              in: { $add: ["$$value", { $size: "$$this.likes" }] },
            },
          },
          totalResenias: { $size: "$resenias" },
        },
      },
      {
        $project: {
          resenias: 0, // No enviar el array completo de reseñas
        },
      },
    ])
    .toArray();

  return restaurantes;
}

export async function listarRestaurante(id) {
  if (!ObjectId.isValid(id)) {
    throw new Error("ID de restaurante no válido");
  }

  // 🔥 CORREGIDO: También calcula promedios al buscar uno
  const restaurante = await obtenerDB()
    .collection(COLECCION_RESTAURANTES)
    .aggregate([
      {
        $match: { _id: new ObjectId(id) },
      },
      {
        $lookup: {
          from: COLECCION_RESENIAS,
          localField: "_id",
          foreignField: "restauranteId",
          as: "resenias",
        },
      },
      {
        $addFields: {
          promedioCalificacion: {
            $cond: {
              if: { $gt: [{ $size: "$resenias" }, 0] },
              then: { $avg: "$resenias.calificacion" },
              else: 0,
            },
          },
          totalLikes: {
            $reduce: {
              input: "$resenias",
              initialValue: 0,
              in: { $add: ["$$value", { $size: "$$this.likes" }] },
            },
          },
          totalResenias: { $size: "$resenias" },
        },
      },
    ])
    .toArray();

  if (!restaurante || restaurante.length === 0)
    throw new Error("Restaurante no encontrado");

  return restaurante[0];
}

export async function actualizarRestaurante(id, datos) {
  const resultado = await obtenerDB()
    .collection(COLECCION_RESTAURANTES)
    .updateOne({ _id: new ObjectId(id) }, { $set: datos });
  return resultado.matchedCount > 0;
}

export async function eliminarRestaurante(id) {
  const resultado = await obtenerDB()
    .collection(COLECCION_RESTAURANTES)
    .deleteOne({ _id: new ObjectId(id) });
  return resultado.deletedCount > 0;
}

export async function listarRestaurantesOrden(tipoOrden) {
  const ordenamiento = [
    {
      $lookup: {
        from: COLECCION_RESENIAS,
        localField: "_id",
        foreignField: "restauranteId",
        as: "resenias",
      },
    },
    {
      $addFields: {
        promedioCalificacion: {
          $cond: {
            if: { $gt: [{ $size: "$resenias" }, 0] },
            then: { $avg: "$resenias.calificacion" },
            else: 0,
          },
        },
        totalLikes: {
          $reduce: {
            input: "$resenias",
            initialValue: 0,
            in: { $add: ["$$value", { $size: "$$this.likes" }] },
          },
        },
      },
    },
    {
      $project: {
        resenias: 0,
      },
    },
  ];

  if (tipoOrden === "ranking") {
    ordenamiento.push({ $sort: { promedioCalificacion: -1 } });
  } else if (tipoOrden === "popularidad") {
    ordenamiento.push({ $sort: { totalLikes: -1 } });
  }

  const resultado = await obtenerDB()
    .collection(COLECCION_RESTAURANTES)
    .aggregate(ordenamiento)
    .toArray();
  return resultado;
}

// 🔥 CORREGIDO: También calcula promedios al filtrar
export async function filtrarRestaurantesCategoria(categoria) {
  if (!categoria) throw new Error("Debe especificar una categoría");

  const resultado = await obtenerDB()
    .collection(COLECCION_RESTAURANTES)
    .aggregate([
      {
        $match: { categoria },
      },
      {
        $lookup: {
          from: COLECCION_RESENIAS,
          localField: "_id",
          foreignField: "restauranteId",
          as: "resenias",
        },
      },
      {
        $addFields: {
          promedioCalificacion: {
            $cond: {
              if: { $gt: [{ $size: "$resenias" }, 0] },
              then: { $avg: "$resenias.calificacion" },
              else: 0,
            },
          },
          totalLikes: {
            $reduce: {
              input: "$resenias",
              initialValue: 0,
              in: { $add: ["$$value", { $size: "$$this.likes" }] },
            },
          },
        },
      },
      {
        $project: {
          resenias: 0,
        },
      },
    ])
    .toArray();

  return resultado;
}