import User from "../models/user.model.js";

export async function findUserById(id) {
    return await User.findById(id).select("-password");
}

export async function findUserByEmail(email) {
    return await User.findOne({
        email: email.toLowerCase()
    });
}

export async function createUser(userData) {
    return await User.create(userData);
}

export async function updateUser(id, updatedData) {
    return await User.findByIdAndUpdate(
        id,
        updatedData,
        {
            new: true,
            runValidators: true
        }
    );
}

export async function deleteUser(id) {
    return await User.findByIdAndDelete(id);
}

export async function getAllUsers() {
    return await User.find().select("-password");
}