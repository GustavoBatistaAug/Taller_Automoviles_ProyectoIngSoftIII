import { registerUser, loginUser, getProfile, getAllProfiles, updateUser as serviceUpdateUser } from "../services/auth.services.js";
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

export async function allUsers(req, res){
    try{
        const users = await getAllProfiles();
        return success(
            res,
            200,
            "Usuarios obtenidos correctamente.",
            users
        );
    } catch (err) {
        return error(res, 500, err.message);
    }
}

export async function updateUser(req, res){
    try {
        const { id } = req.params;
        const user = await serviceUpdateUser(
            id,
            req.body
        );
        if (!user) {
            return error(
                res,
                404,
                "Usuario no encontrado."
            );
        }
        return success(
            res,
            200,
            "Usuario actualizado correctamente.",
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