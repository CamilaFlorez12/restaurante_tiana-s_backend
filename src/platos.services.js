import { obtenerDB } from "../config/db";;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";
import { ObjectId } from "mongodb";

dotenv.config();
const COLECCION_PLATOS = "platos";

export async function registrarPlatos(datos) {
    const { nombre, descripcion, precio, categoria, restauranteId } = datos;
    const CATEGORIAS = ["Comida rápida", "Gourmet", "Vegetariano", "Sushi"];
    if (!CATEGORIAS.includes(categoria)) {
        throw new Error("categoria no válida")
    }

    if (!nombre || !descripcion || !precio || !categoria || !restauranteId) {
        throw new Error("Falta algún campo");
    }

    if(precio <= 0){
        throw new Error("Precio no válido")
    }

    const platoExistente = await obtenerDB().collection(COLECCION_PLATOS).findOne({ nombre, restauranteId });
    if (platoExistente) throw new Error("El plato ya existe");

    const nuevoPlato = {
        nombre,
        descripcion,
        precio,
        categoria,
        restauranteId
    }

    await obtenerDB().collection(COLECCION_PLATOS).insertOne(nuevoPlato);
    return { message: "Nuevo plato creado" };
}

export async function listarPlatos() {
    const platos = await obtenerDB().collection(COLECCION_PLATOS).find().toArray();
    return platos;
}

export async function listarPlato(id) {
    if (!ObjectId.isValid(id)) {
        throw new Error("ID de plato no válido");
    }

    const plato = await obtenerDB().collection(COLECCION_PLATOS).findOne({ _id: new ObjectId(id) });

    if (!plato) throw new Error("Plato no encontrado");

    return plato;
}

export async function actualizarPlato(id, datos) {
    const resultado = await obtenerDB().collection(COLECCION_PLATOS).updateOne({ _id: new ObjectId(id) }, { $set: datos });
    return resultado.matchedCount > 0;
}

export async function eliminarPlato(id) {
    const resultado = await obtenerDB().collection(COLECCION_PLATOS).deleteOne({ _id: new ObjectId(id) });
    return resultado.deletedCount > 0;
}