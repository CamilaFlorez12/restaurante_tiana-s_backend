import { agregarFavoritos } from "../services/favoritos.services";

export async function restauranteFav(req, res){
    try {
        const {id} = req.params;

        const usuarioId = decoded.id;
        const resultado = await agregarFavoritos(id, usuarioId);
        res.status(200).json(resultado);
    }

  
 catch (error) {
  console.error("Error agregando reseña", error);
   res.status(500).json({ error: error.message});
    }
}
