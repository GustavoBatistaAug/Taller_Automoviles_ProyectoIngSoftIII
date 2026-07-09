import User from "../models/user.model.js";

export async function getAllUsers() {
    return await User.find().select("-password");
}

export async function getUserById(id) {
    return await User.findById(id).select("-password");
}