import jwt from "jsonwebtoken";
import {
  crearResenia,
  editarResenia,
  eliminarResenia,
  darLikeResenia,
  calcularRankingPlato,
  obtenerResenias,
} from "../services/resenias.services.js";

<<<<<<< HEAD
// 🔥 CORREGIDO: Ahora extrae usuarioId del token
export async function registroResenia(req, res) {
  try {
    // Extraer usuarioId del token
    const authHeader = req.headers.authorization;
    let usuarioId = null;

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      usuarioId = decoded?.id;
=======
export async function registroResenia(req, res, next) {
  try {
    // Verificar que el middleware de autenticación haya agregado el usuario
    if (!req.usuario || !req.usuario._id) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const nuevaResenia = {
      usuario: req.usuario._id, // <-- Agregamos el usuario desde el token
      restaurante: req.body.restaurante, // <-- Viene del body (frontend)
      comentario: req.body.comentario,
      calificacion: req.body.calificacion,
    };

    const reseniaCreada = await crearResenia(nuevaResenia);
    res.status(201).json(reseniaCreada);
  } catch (error) {
    console.error("❌ Error en registroResenia:", error);
    res.status(500).json({ error: error.message });
  }
}


export async function edicionResenia(req, res, next) {
    try {
        const reseniaEditada = await editarResenia(req.params.id, req.body);
        if (!reseniaEditada) return res.status(404).json({ error: "Reseña no encontrado" });
        res.status(200).json(reseniaEditada);
    } catch (error) {
        res.status(500).json({ error: error.message })
>>>>>>> 177412e1c887dc93f0c60ddcf861855b887a333e
    }

    // Agregar usuarioId a los datos
    const datosCompletos = {
      ...req.body,
      usuarioId,
    };

    const reseniaCreada = await crearResenia(datosCompletos);
    res.status(201).json(reseniaCreada);
  } catch (error) {
    console.error("❌ Error en registroResenia:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function edicionResenia(req, res) {
  try {
    const reseniaEditada = await editarResenia(req.params.id, req.body);
    if (!reseniaEditada)
      return res.status(404).json({ error: "Reseña no encontrada" });
    res.status(200).json(reseniaEditada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function eliminacionResenia(req, res) {
  try {
    const reseniaEliminada = await eliminarResenia(req.params.id);
    if (!reseniaEliminada)
      return res.status(404).json({ error: "Reseña no encontrada" });
    res.status(200).json(reseniaEliminada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 🔥 CORREGIDO: Ya no necesita autenticación obligatoria
export async function listarResenias(req, res) {
  try {
    const resenias = await obtenerResenias();
    console.log("📊 Reseñas enviadas al frontend:", resenias.length);
    res.status(200).json(resenias);
  } catch (error) {
    console.error("❌ Error en listarResenias:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function likeResenia(req, res) {
  try {
    const { id } = req.params;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded?.id) {
      return res.status(401).json({ message: "Token inválido o sin ID" });
    }

    const usuarioId = decoded.id;
    const resultado = await darLikeResenia(id, usuarioId);

    res.status(200).json(resultado);
  } catch (error) {
    console.error("❌ Error en likeResenia:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function obtenerRankingPlato(req, res) {
  try {
    const { platoId } = req.params;
    const promedio = await calcularRankingPlato(platoId);
    res.status(200).json({ platoId, promedio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}