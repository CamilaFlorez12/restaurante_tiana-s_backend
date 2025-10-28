import { json } from "express";
import {
    registrarPlatos,
    listarPlatos,
    listarPlato,
    actualizarPlato,
    eliminarPlato
} from "../services/platos.services.js";

export async function registroPlato(req, res, next) {
    try {
        const platoCreado = await registrarPlatos(req.body);
        res.status(201).json(platoCreado)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function verPlatos(req, res, next) {
    try {
        const paltos = await listarPlatos();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export async function verUnPlato(req, res, next) {
    try {
        const plato = await listarPlato();
        res.status(200).json(plato);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export async function actualizacionPlato(req,res,next){
    try {
        const platoActualizado = await actualizarPlato(req.params.id,req.body);
        if(!platoActualizado) return res.status(404).json({error:"Plato no encontrado"});
        res.status(200).json(platoActualizado);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export async function eliminacionPlato(req,res,next) {
    try {
        const platoEliminado = await eliminarPlato(req.params.id);
        if(!platoEliminado) return res.status(404).json({error:"plato no encontrado"});
        res.status(200).json(platoEliminado);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}