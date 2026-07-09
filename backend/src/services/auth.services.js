import {
    findUserByEmail,
    createUser as repositoryCreateUser,
    findUserById,
    updateUser
} from "../repo/auth.repository.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { ROLES } from "../constants/roles.js";

export async function registerUser(userData) {
    const email = userData.email.toLowerCase();
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error("El correo electrónico ya está registrado.");
    }
    const hashedPassword = await hashPassword(userData.password);
    const newUser = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: email,
        password: hashedPassword,
        phone: userData.phone,
        role: ROLES.CLIENT,
        isActive: true
    };
    const user = await repositoryCreateUser(newUser);
    return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt
    };
}

export async function loginUser(email, password) {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error("Credenciales inválidas.");
    }
    if (!user.isActive) {
        throw new Error("La cuenta se encuentra deshabilitada.");
    }
    const validPassword = await comparePassword(
        password,
        user.password
    );
    if (!validPassword) {
        throw new Error("Credenciales inválidas.");
    }
    const token = generateToken(user);
    return {
        token,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }
    };
}

export async function getProfile(userId) {
    const user = await findUserById(userId);
    if (!user) {
        throw new Error("Usuario no encontrado.");
    }
    return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
}

export async function updateUserProfile(userId, userData) {
    const user = await findUserById(userId);

    if (!user) {
        throw new Error("Usuario no encontrado.");
    }

    const updatedUser = await updateUser(userId, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone
    });

    return {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        isActive: updatedUser.isActive,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt
    };
}

export async function changeUserPassword(userId, passwords) {
    const user = await findUserById(userId);

    if (!user) {
        throw new Error("Usuario no encontrado.");
    }

    // Necesitamos el usuario con su contraseña
    const userWithPassword = await findUserByEmail(user.email);

    const validPassword = await comparePassword(
        passwords.currentPassword,
        userWithPassword.password
    );

    if (!validPassword) {
        throw new Error("La contraseña actual es incorrecta.");
    }

    const hashedPassword = await hashPassword(passwords.newPassword);

    await updateUser(userId, {
        password: hashedPassword
    });
}