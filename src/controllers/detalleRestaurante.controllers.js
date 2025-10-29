import { obtenerDetalleRestaurante } from "../services/detalleRestaurante.services";

export async function detalleRestaurante(req, res, next) {
    try {
        const restauranteId = req.params.id;
        const detalle = await obtenerDetalleRestaurante(restauranteId);
        res.status(200).json(detalle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}