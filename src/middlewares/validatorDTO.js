import { validationResult } from "express-validator";

export function validationRequest(req, res, next) {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    const first = errores.array()[0];
    return res.status(400).json({
      error: "Error de validación dto",
      message: first.msg || "Error de validación",
      field: first.param,
    });
  }
  next();
}
