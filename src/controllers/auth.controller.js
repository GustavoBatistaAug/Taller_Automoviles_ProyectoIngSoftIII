import {
    registerUser,
    loginUser,
    getProfile
} from "../services/auth.services.js";
import {
    registerUserSchema,
    loginSchema
} from "../validators/auth.validator.js";
import { success, error } from "../utils/apiResponse.js";

export async function register(req, res) {
    try {
        const validation = registerUserSchema.safeParse(req.body);
        if (!validation.success) {
            const errors = validation.error.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message
            }));
            return error(
                res,
                400,
                "Error de validación.",
                errors
            );
        }

        const user = await registerUser(validation.data);
        return success(
            res,
            201,
            "Usuario registrado correctamente.",
            user
        );
    } catch (err) {
        return error(
            res,
            400,
            err.message
        );
    }
}

export async function login(req, res) {
    try {
        const validation = loginSchema.safeParse(req.body);
        if (!validation.success) {
            const errors = validation.error.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message
            }));

            return error(
                res,
                400,
                "Error de validación.",
                errors
            );
        }

        const { email, password } = validation.data;
        const response = await loginUser(
            email,
            password
        );
        return success(
            res,
            200,
            "Inicio de sesión exitoso.",
            response
        );
    } catch (err) {
        return error(
            res,
            401,
            err.message
        );
    }
}

export async function profile(req, res) {
    try {
        const user = await getProfile(req.user.id);
        return success(
            res,
            200,
            "Perfil obtenido correctamente.",
            user
        );
    } catch (err) {
        return error(
            res,
            404,
            err.message
        );
    }
}