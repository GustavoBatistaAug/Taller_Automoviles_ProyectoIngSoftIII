import { z } from "zod";

export const createPartSchema = z.object({
    name: z
        .string()
        .min(2, "El nombre es obligatorio."),
    brand: z
        .string()
        .min(2, "La marca es obligatoria."),
    partNumber: z
        .string()
        .min(3, "Número de parte inválido."),
    description: z
        .string()
        .optional(),
    compatibleVehicles: z
        .array(z.string())
        .optional(),
    category: z.enum([
        "ENGINE",
        "BRAKES",
        "SUSPENSION",
        "TRANSMISSION",
        "ELECTRICAL",
        "BODY",
        "FILTER",
        "FLUID",
        "OTHER"
    ]),
    stock: z
        .number()
        .min(0),
    minimumStock: z
        .number()
        .min(0),
    price: z
        .number()
        .positive(),
    supplier: z
        .string()
        .optional(),
    location: z
        .string()
        .optional()
});

export const updatePartSchema =
    createPartSchema.partial();