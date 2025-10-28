import { json } from "express";
import {
    registrarUsuario,
    iniciarSesion
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