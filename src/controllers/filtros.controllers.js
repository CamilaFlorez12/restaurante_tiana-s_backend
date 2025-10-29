import { json } from "express";

import {
    listarRestaurantes,
    filtrarRestaurantesCategoria
} from "../services/filtros.services.js";

export async function obtenerRestaurantesOrdenados(req, res, next) {
    try {
        const { tipo } = req.query;
        const restaurantes = await listarRestaurantes(tipo);
        res.status(200).json(restaurantes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function filtroRestaurantesCategoria(req, res, next) {
    try {
        const { categoria } = req.query;
        const restaurantes = await filtrarRestaurantesCategoria(categoria);
        res.status(200).json(restaurantes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}