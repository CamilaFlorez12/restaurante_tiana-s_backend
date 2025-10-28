import { obtenerDB } from "../config/db";;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";
import { ObjectId } from "mongodb";

dotenv.config();
const COLECCION_RESTAURANTES = "restaurantes";

export async function registrarRestaurantes(datos) {

}