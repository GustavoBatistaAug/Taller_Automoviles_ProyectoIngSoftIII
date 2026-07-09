import {
    registerUser,
    loginUser,
    getProfile,
    updateUserProfile,
    changeUserPassword
} from "../services/auth.services.js";
import { success, error } from "../utils/apiResponse.js";

export async function register(req, res) {
    try {
        const user = await registerUser(req.body);
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
        const { email, password } = req.body;
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

export async function updateProfile(req, res) {
    try {
        const user = await updateUserProfile(
            req.user.id,
            req.body
        );

        return success(
            res,
            200,
            "Perfil actualizado correctamente.",
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

export async function changePassword(req, res) {
    try {
        await changeUserPassword(
            req.user.id,
            req.body
        );

        return success(
            res,
            200,
            "Contraseña actualizada correctamente."
        );
    } catch (err) {
        return error(
            res,
            400,
            err.message
        );
    }
}