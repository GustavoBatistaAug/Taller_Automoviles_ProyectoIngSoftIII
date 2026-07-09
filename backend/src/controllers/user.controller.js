import {
    findAllUsers,
    findUserById
} from "../services/user.service.js";

import { success, error } from "../utils/apiResponse.js";

export async function getUsers(req, res) {
    try {
        const users = await findAllUsers();

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

export async function getUser(req, res) {
    try {
        const user = await findUserById(req.params.id);

        if (!user) {
            return error(res, 404, "Usuario no encontrado.");
        }

        return success(
            res,
            200,
            "Usuario encontrado.",
            user
        );
    } catch (err) {
        return error(res, 500, err.message);
    }
}