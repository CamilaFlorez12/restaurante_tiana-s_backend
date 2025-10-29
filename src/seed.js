import { conectarDB, obtenerDB } from "./config/db.js";
import { ObjectId } from "mongodb";

async function seed() {
    await conectarDB();

    const usuarios = [
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e999001"),
          nombre: "Laura",
          apellido: "Martínez",
          correo: "laura.martinez@example.com",
          contrasenia: "laura123",
          rol: "usuario"
        },
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e999002"),
          nombre: "Carlos",
          apellido: "Gómez",
          correo: "carlos.gomez@example.com",
          contrasenia: "carlos456",
          rol: "usuario"
        },
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e999003"),
          nombre: "Ana",
          apellido: "Rodríguez",
          correo: "ana.admin@example.com",
          contrasenia: "admin789",
          rol: "admin"
        }
      ];
      await obtenerDB().collection("usuarios").deleteMany();
      await obtenerDB().collection("usuarios").insertMany(usuarios);

    
      const restaurantes = [
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e111111"),
          nombre: "Burger Street",
          descripcion:
            "Especialistas en hamburguesas artesanales con ingredientes frescos y pan horneado cada día.",
          categoria: "Comida rápida",
          ubicacion: "Av. Principal 123, Ciudad Central",
          likes: []
        },
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e222222"),
          nombre: "Sakura Roll",
          descripcion:
            "Restaurante japonés con sushi preparado al momento y una experiencia auténtica oriental.",
          categoria: "Sushi",
          ubicacion: "Calle del Sol 55, Barrio Japón",
          likes: ["671f0c9a6a2b8f1a9e999001"]
        },
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e333333"),
          nombre: "Verde Vida",
          descripcion:
            "Comida saludable con ingredientes orgánicos y opciones 100% vegetarianas y veganas.",
          categoria: "Vegetariano",
          ubicacion: "Plaza Central, Local 8",
          likes: []
        }
      ];
      await obtenerDB().collection("restaurantes").deleteMany();
      await obtenerDB().collection("restaurantes").insertMany(restaurantes);
    
      const platos = [
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e555001"),
          nombre: "Hamburguesa Doble Queso",
          descripcion:
            "Hamburguesa con doble carne, doble queso cheddar y salsa especial de la casa.",
          precio: 10.99,
          categoria: "Comida rápida",
          restauranteId: "671f0c9a6a2b8f1a9e111111"
        },
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e555002"),
          nombre: "Papas Fritas Supreme",
          descripcion: "Papas fritas cubiertas con queso fundido, tocineta y cebollín.",
          precio: 6.5,
          categoria: "Comida rápida",
          restauranteId: "671f0c9a6a2b8f1a9e111111"
        },
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e555003"),
          nombre: "Pollo Crispy Burger",
          descripcion: "Sandwich de pollo crujiente con mayonesa de ajo y pepinillos.",
          precio: 9.25,
          categoria: "Comida rápida",
          restauranteId: "671f0c9a6a2b8f1a9e111111"
        },
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e555004"),
          nombre: "Risotto de Champiñones",
          descripcion:
            "Arroz cremoso con champiñones portobello, parmesano y aceite de trufa.",
          precio: 18.9,
          categoria: "Gourmet",
          restauranteId: "671f0c9a6a2b8f1a9e222222"
        },
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e555005"),
          nombre: "Salmón en Costra de Hierbas",
          descripcion:
            "Filete de salmón al horno con costra de hierbas finas y puré de papa al romero.",
          precio: 22.5,
          categoria: "Gourmet",
          restauranteId: "671f0c9a6a2b8f1a9e222222"
        },
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e555006"),
          nombre: "Medallones de Res con Salsa de Pimienta",
          descripcion:
            "Corte premium acompañado de papas rústicas y salsa cremosa de pimienta negra.",
          precio: 26.75,
          categoria: "Gourmet",
          restauranteId: "671f0c9a6a2b8f1a9e222222"
        },
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e555007"),
          nombre: "Tacos Veganos de Quinoa",
          descripcion:
            "Tortillas de maíz rellenas con quinoa, aguacate, frijoles negros y pico de gallo.",
          precio: 8.99,
          categoria: "Vegetariano",
          restauranteId: "671f0c9a6a2b8f1a9e333333"
        },
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e555008"),
          nombre: "Wrap Mediterráneo",
          descripcion:
            "Wrap relleno de hummus, verduras asadas y hojas frescas de espinaca.",
          precio: 7.75,
          categoria: "Vegetariano",
          restauranteId: "671f0c9a6a2b8f1a9e333333"
        },
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e555009"),
          nombre: "Dragon Roll",
          descripcion:
            "Rollo de sushi con tempura de camarón, aguacate y salsa unagi.",
          precio: 15.5,
          categoria: "Sushi",
          restauranteId: "671f0c9a6a2b8f1a9e222222"
        }
      ];
      await obtenerDB().collection("platos").deleteMany();
      await obtenerDB().collection("platos").insertMany(platos);
    
      const resenias = [
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e666001"),
          comentario:
            "La hamburguesa estaba deliciosa, muy jugosa y con excelente sabor.",
          calificacion: 5,
          platoId: "671f0c9a6a2b8f1a9e555001",
          restauranteId: "671f0c9a6a2b8f1a9e111111",
          usuarioId: "671f0c9a6a2b8f1a9e999001",
          likes: ["671f0c9a6a2b8f1a9e999002"],
          fecha: new Date("2025-10-29T10:30:00.000Z")
        },
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e666002"),
          comentario: "Buen sabor pero las papas llegaron un poco frías.",
          calificacion: 3,
          platoId: "671f0c9a6a2b8f1a9e555002",
          restauranteId: "671f0c9a6a2b8f1a9e111111",
          usuarioId: "671f0c9a6a2b8f1a9e999002",
          likes: [],
          fecha: new Date("2025-10-29T10:45:00.000Z")
        },
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e666003"),
          comentario: "Excelente presentación y sabor gourmet, muy recomendado.",
          calificacion: 5,
          platoId: "671f0c9a6a2b8f1a9e555004",
          restauranteId: "671f0c9a6a2b8f1a9e222222",
          usuarioId: "671f0c9a6a2b8f1a9e999003",
          likes: ["671f0c9a6a2b8f1a9e999001", "671f0c9a6a2b8f1a9e999002"],
          fecha: new Date("2025-10-29T11:00:00.000Z")
        },
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e666004"),
          comentario: "El sushi estaba fresco, pero el arroz un poco pasado.",
          calificacion: 4,
          platoId: "671f0c9a6a2b8f1a9e555009",
          restauranteId: "671f0c9a6a2b8f1a9e222222",
          usuarioId: "671f0c9a6a2b8f1a9e999002",
          likes: [],
          fecha: new Date("2025-10-29T11:15:00.000Z")
        },
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e666005"),
          comentario:
            "Excelente opción vegetariana, muy fresca y con ingredientes de calidad.",
          calificacion: 5,
          platoId: "671f0c9a6a2b8f1a9e555007",
          restauranteId: "671f0c9a6a2b8f1a9e333333",
          usuarioId: "671f0c9a6a2b8f1a9e999001",
          likes: ["671f0c9a6a2b8f1a9e999002"],
          fecha: new Date("2025-10-29T11:30:00.000Z")
        },
        {
          _id: new ObjectId("671f0c9a6a2b8f1a9e666006"),
          comentario: "El risotto tenía una textura perfecta, aunque un poco salado.",
          calificacion: 4,
          platoId: "671f0c9a6a2b8f1a9e555004",
          restauranteId: "671f0c9a6a2b8f1a9e222222",
          usuarioId: "671f0c9a6a2b8f1a9e999001",
          likes: [],
          fecha: new Date("2025-10-29T11:45:00.000Z")
        }
      ];
      await obtenerDB().collection("resenias").deleteMany();
      await obtenerDB().collection("resenias").insertMany(resenias);
    
      const roles = [
        {
          _id: "admin",
          permisos: [
            "registrarUsuario",
            "actualizarusuario",
            "eliminarUsuario",
            "verUsuarios",
            "registrarRestaurante",
            "actualizarRestaurante",
            "eliminarRestaurante",
            "registrarPlato",
            "actualizarPlato",
            "eliminarPlato"
          ]
        },
        {
          _id: "usuario",
          permisos: [
            "registrarResenia",
            "editarResenia",
            "eliminarResenia",
            "darLikeResenia",
            "verRestaurantes",
            "verPlatos"
          ]
        }
      ];
      await obtenerDB().collection("roles").deleteMany();
      await obtenerDB().collection("roles").insertMany(roles);
}

seed();
