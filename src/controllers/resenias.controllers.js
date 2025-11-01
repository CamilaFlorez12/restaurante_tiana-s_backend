import { json } from "express";
import {
    crearResenia,
    editarResenia,
    eliminarResenia,
    darLikeResenia,
    calcularRankingPlato,
    obtenerResenias
} from "../services/resenias.services.js";

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
    }
}

export async function eliminacionResenia(req, res, next) {
    try {
        const reseniaEliminada = await eliminarResenia(req.params.id);
        if (!reseniaEliminada) return res.status(404).json({ error: "Reseña no encontrado" });
        res.status(200).json(reseniaEliminada);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function listarResenias(req, res) {
    try {
      const resenias = await obtenerResenias();
      res.status(200).json(resenias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

export async function likeResenia(req, res, next) {
    try {
        const { id } = req.params;
        const { usuarioId } = req.body;

        const resultado = await darLikeResenia(id, usuarioId);
        res.status(200).json(resultado);
    } catch (error) {
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