import { z } from "zod";

export const registerUserSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, "El nombre debe tener al menos 2 caracteres.")
        .max(50),
    lastName: z
        .string()
        .trim()
        .min(2, "El apellido debe tener al menos 2 caracteres.")
        .max(50),
    email: z
        .string()
        .trim()
        .email("Correo electrónico inválido."),
    password: z
        .string()
        .min(8, "La contraseña debe tener mínimo 8 caracteres.")
        .max(100),
    phone: z
        .string()
        .trim()
        .min(7)
        .max(20)
});

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email(),
    password: z
        .string()
        .min(1, "Debe proporcionar la contraseña.")
});