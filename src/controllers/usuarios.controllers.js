import { json } from "express";
import {
    registrarUsuario,
    iniciarSesion,
    listarUsuarios,
    actualizarUsuario,
    eliminarUsuario
} from "../services/usuarios.services.js";

export async function registroUsuario(req, res, next) {
    try {
        const usuariocreado = await registrarUsuario(req.body);
        res.status(201).json(usuariocreado)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function inicioSesion(req, res, next) {
    try {
        const { correo, contrasenia } = req.body;
        if (!correo || !contrasenia) return res.status(400).json({ error: "Contraseña son necesarios" });
        const sesionIniciada = await iniciarSesion(correo, contrasenia);
        res.status(200).json(sesionIniciada);
    } catch (error) {
        res.status(401).json({ error: error })
    }
}

export async function verUsuarios(req, res, next) {
    try {
        const usuarios = await listarUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export async function actualizacionUsuario(req,res,next){
    try {
        const usuarioActualizado = await actualizarUsuario(req.params.id,req.body);
        if(!usuarioActualizado) return res.status(404).json({error:"Usuario no encontrado"});
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export async function eliminacionUsuario(req,res,next) {
    try {
        const usuarioEliminado = await eliminarUsuario(req.params.id);
        if(!usuarioEliminado) return res.status(404).json({error:"Usuario no encontrado"});
        res.status(200).json(usuarioEliminado);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}