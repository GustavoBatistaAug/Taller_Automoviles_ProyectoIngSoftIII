import {
    getAllUsers,
    getUserById
} from "../repo/user.mongo.repository.js";

export async function findAllUsers() {
    return await getAllUsers();
}

export async function findUserById(id) {
    return await getUserById(id);
}