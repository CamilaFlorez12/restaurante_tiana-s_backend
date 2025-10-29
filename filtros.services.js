import { obtenerDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const COLECCION_RESTAURANTES = "restaurantes";
const COLECCION_RESENIAS = "resenias";

export async function listarRestaurantes(tipoOrden) {
    
    const ordenamiento = [
        {
            $lookup:{
                from :COLECCION_RESENIAS,
                localField:"_id",
                foreignField:"restauranteId",
                as:"resenias"
            }
        },
        {
            $addFields:{
                promedioCalificacion:{$avg:"$resenias.calificacion"},
                totalLikes:{
                    $sum:{
                        $map:{
                            input:"$resenias",
                            as:"r",
                            in:{$size:"$$r.likes"}
                        }
                    }
                }
            }
        }
    ];

    if(tipoOrden === "ranking"){
        ordenamiento.push({$sort:{promedioCalificacion: -1}});
    }else if(tipoOrden==="popularidad"){
        ordenamiento.push({$sort:{totalLikes:-1}});
    }

    const resultado = await await obtenerDB().collection(COLECCION_RESTAURANTES).aggregate(ordenamiento).toArray();
    return resultado;
}

export async function filtrarRestaurantesCategoria(categoria) {
    if(!categoria) throw new Error("Debe especificar una categoría");

    const resultado = await obtenerDB().collection(COLECCION_RESTAURANTES).find({categoria}).toArray();
    return resultado;
}