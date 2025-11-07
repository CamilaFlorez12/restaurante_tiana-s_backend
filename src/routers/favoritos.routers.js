import { Router } from "express";
import { restauranteFav } from "../controllers/favoritos.controllers";

const router = Router();

router.post(
  "/:id/favorito",
  restauranteFav
);

export default router;