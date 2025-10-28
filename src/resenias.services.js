import { obtenerDB } from "../config/db";;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";
import { ObjectId } from "mongodb";

dotenv.config();
const COLECCION_RESENIAS = "resenias";

export async function crearResenia(datos){
    const {comentario, calificacion, platoId, usuarioId} = datos;

    if(!comentario || !calificacion || !platoId || !usuarioId){
        throw new Error("Falta algún campo");
    }

    const nuevaResenia = {
        comentario,
        calificacion,
        platoId,
        usuarioId
    }

    await obtenerDB().collection(COLECCION_RESENIAS).insertOne(nuevaResenia);
    return {message:"Nueva reseña creada"};
}

export async function editarResenia(id,datos) {
    const resultado = await obtenerDB().collection(COLECCION_RESENIAS).findOne({_id:new ObjectId(id)},{$set:datos});
    return resultado.matcheCount > 0;
}

export async function eliminarResenia(id){
    const resultado = await obtenerDB().collection(COLECCION_RESENIAS).deleteOne({_id:new ObjectId(id)});
    return resultado.deleteCount  > 0;
}