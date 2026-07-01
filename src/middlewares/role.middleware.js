import { error } from "../utils/apiResponse.js";

export function authorize(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            return error(
                res,
                401,
                "Usuario no autenticado."
            );
        }

        if (!roles.includes(req.user.role)) {
            return error(
                res,
                403,
                "No tiene permisos para acceder a este recurso."
            );
        }
        next();
    };
}