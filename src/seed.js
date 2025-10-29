import { conectarDB, obtenerDB } from "./config/db.js";
import { ObjectId } from "mongodb";

async function seed() {
    await conectarDB();

    const usuarios = [
        {
            nombre: "Laura Camila",
            apellido: "Florez",
            correo: "laura@example.com",
            contraseña: "12345",
            rol: "usuario",
        }
    ]

    const categorias = [
        {
            _id: ObjectId(""),
            nombre: "Gourmet",
            descripcion: "Restaurantes con propuestas culinarias de alta cocina.",
        }

    ]

    const retaurantes = [
        {
            nombre: "El Rincón Gourmet",
            descripcion: "Comida artesanal con ingredientes locales.",
            categoria_id: ObjectId(""),
            ubicacion: "Bogotá, Colombia",
            imagen: "https://ejemplo.com/imagen.jpg",
            aprobado: true,
            creado_por:ObjectId("")
        }
    ]

    const platos = [
        {
            _id: ObjectId("..."),
            nombre: "Ensalada Mediterránea",
            descripcion: "Con aceitunas, tomate cherry y queso feta.",
            precio: 35000,
            restaurante_id: ObjectId(""),
        }
    ]

    const reseñas = [
        {
            _id: ObjectId(""),
            usuario_id: ObjectId(""),
            restaurante_id: ObjectId(""),
            comentario: "Excelente servicio y comida deliciosa.",
            calificacion: 5,
            likes: 11,
            dislikes: 7,
        }

    ]

    const rainkings = [
        {
            _id: ObjectId(""),
            restaurante_id: ObjectId(""),
            puntaje_promedio: 4.7,
            total_resenas: 124,
            total_likes: 320,
            total_dislikes: 12,
            ranking_ponderado: 4.85,
        }

    ]
}

