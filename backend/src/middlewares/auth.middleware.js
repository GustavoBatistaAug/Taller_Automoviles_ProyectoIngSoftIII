import { verifyToken } from "../utils/jwt.js";
import { error } from "../utils/apiResponse.js";

export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return error(
            res,
            401,
            "Token de autenticación no proporcionado."
        );
    }
    if (!authHeader.startsWith("Bearer ")) {
        return error(
            res,
            401,
            "Formato de token inválido."
        );
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload = verifyToken(token);
        req.user = payload;
        next();
    } catch {
        return error(
            res,
            401,
            "Token inválido o expirado."
        );
    }
}