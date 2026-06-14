import userService from '../services/userService.services.js';

export const getAllUsers = async (req, res) => {
    const users = userService.getAllUsers();
    res.status(200).json(users);
}

export const getUserById = async (req, res) => {
    const user = userService.getUserById(req.params.id);
    if(!user){
        res.status(404).json({message: "404. User not found."})
    }
    else{
        res.status(200).json(user);
    }
}

export const createUser = async (req, res) => {
    const newUser = userService.addUser(req.body);
    res.status(201).json(newUser);
}

export const updateUser = async (req, res) => {
    const updateUser = userService.updateUser(req.params.id, req.body);
    if(!updateUser){
        res.status(404).json({message: "404. User not found."})
    }
    else{
        res.status(200).json(updateUser);
    }
}

export const deleteUser = async (req, res) => {
    const deleteUser = userService.deleteUser(req.params.id);
    if(!deleteUser){
        res.status(404).json({message: "404: User not found."})
    }
    else{
        res.status(200).json(deleteUser);
    }
}

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}