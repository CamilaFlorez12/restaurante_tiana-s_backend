import { json } from "express";
import {
    crearResenia,
    editarResenia,
    eliminarResenia
} from "../servicces/resenias.services.js";

export async function registroResenia(req, res, next) {
    try {
        const reseniaCreada = await crearResenia(req.body);
        res.status(201).json(reseniaCreada)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function edicionResenia(req,res,next){
    try {
        const reseniaEditada = await editarResenia(req.params.id,req.body);
        if(!reseniaEditada) return res.status(404).json({error:"Reseña no encontrado"});
        res.status(200).json(reseniaEditada);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export async function eliminacionResenia(req,res,next) {
    try {
        const reseniaEliminada = await eliminarResenia(req.params.id);
        if(!reseniaEliminada) return res.status(404).json({error:"Reseña no encontrado"});
        res.status(200).json(reseniaEliminada);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}