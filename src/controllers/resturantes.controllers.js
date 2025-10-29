import { json } from "express";
import {
    registrarRestaurantes,
    listarRestaurantes,
    listarRestaurante,
    actualizarRestaurante,
    eliminarRestaurante,
    listarRestaurantesOrden,
    filtrarRestaurantesCategoria
} from "../services/restaurantes.services.js";

export async function registroRestaurante(req, res, next) {
    try {
        const RestauranteCreado = await registrarRestaurantes(req.body);
        res.status(201).json(RestauranteCreado)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function verRestaurantes(req, res, next) {
    try {
        const restaurantes = await listarRestaurantes();
        res.status(200).json(restaurantes);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export async function verUnRestaurante(req, res, next) {
    try {
        const restaurantes = await listarRestaurante(req.params.id);
        if(!restaurantes) return res.status(404).json({error:"Restaurante no encontrado"})
        res.status(200).json(restaurantes);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export async function actualizacionRestaurante(req,res,next){
    try {
        const restauranteActualizado = await actualizarRestaurante(req.params.id,req.body);
        if(!restauranteActualizado) return res.status(404).json({error:"Restaurante no encontrado"});
        res.status(200).json(restauranteActualizado);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export async function eliminacionRestaurante(req,res,next) {
    try {
        const restauranteEliminado = await eliminarRestaurante(req.params.id);
        if(!restauranteEliminado) return res.status(404).json({error:"Restaurante no encontrado"});
        res.status(200).json(restauranteEliminado);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export async function obtenerRestaurantesOrdenados(req, res, next) {
    try {
        const { tipo } = req.query;
        const restaurantes = await listarRestaurantesOrden(tipo);
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