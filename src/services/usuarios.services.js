import { obtenerDB } from "../config/db.js";;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

dotenv.config();
const COLECCION_USUARIOS = "usuarios";

function generarToken(usuario) {
    return jwt.sign({ id:usuario._id?.toString(), rol:usuario.rol, correo:usuario.correo}, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_TOKEN });
}

export async function registrarUsuario(datos) {
    const { nombre, apellido, correo, contrasenia, rol } = datos;

    if (!nombre || !apellido || !correo || !contrasenia || !rol) {
        throw new Error("Falta algún campo");
    }

    const usuarioExistente = await obtenerDB().collection(COLECCION_USUARIOS).findOne({ correo });
    if (usuarioExistente) throw new Error("Usuario ya existente");

    const contraCifrada = await bcrypt.hash(contrasenia, parseInt(process.env.SALT_ROUNDS));

    

    const usuario = {
        nombre,
        apellido,
        correo,
        contrasenia: contraCifrada,
        rol
    }
    const resultado = await obtenerDB().collection(COLECCION_USUARIOS).insertOne(usuario);
    const token = generarToken({_id:resultado.insertedId,rol:rolFinal,correo});
    return { id: resultado.insertedId, nombre, apellido, correo, rol:rolFinal, token };
}

export async function iniciarSesion(correo,contrasenia) {
      if (!correo || !contrasenia) throw new Error("Correo y contraseña son requeridos");
    const usuarioExistente = await obtenerDB().collection(COLECCION_USUARIOS).findOne({correo});
    if(!usuarioExistente) throw new Error("El usuario no exite");

    const validacion = await bcrypt.compare(contrasenia,usuarioExistente.contrasenia);
    if (!validacion) throw new Error("Constraseña incorrecta");

    const token = generarToken(usuarioExistente);
return {id: usuarioExistente._id,
    name:usuarioExistente.nombre,
    apellido:usuarioExistente.apellido,
    correo:usuarioExistente.correo,
    rol: usuarioExistente.rol,
    token
};
}

export async function listarUsuarios() {
    const usuarios = await obtenerDB().collection(COLECCION_USUARIOS).find().toArray();
    return usuarios;
}

export async function actualizarUsuario(id,datos) {
    const resultado = await obtenerDB().collection(COLECCION_USUARIOS).findOne({_id:new ObjectId(id)},{$set:datos});
    return resultado.matchedCount > 0;
}

export async function eliminarUsuario(id) {
    const resultado = await obtenerDB().collection(COLECCION_USUARIOS).deleteOne({_id:new ObjectId(id)});
    return resultado.deletedCount > 0
}