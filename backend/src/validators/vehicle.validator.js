import { z } from "zod";

export const createVehicleSchema = z.object({
    owner: z
        .string()
        .min(1, "Debe seleccionar un propietario."),

    brand: z
        .string()
        .min(2, "La marca debe tener al menos 2 caracteres."),

    model: z
        .string()
        .min(1, "El modelo es obligatorio."),

    engine: z
        .string()
        .min(1, "El motor es obligatorio."),

    year: z
        .number()
        .int()
        .min(1950, "El año debe ser mayor o igual a 1950.")
        .max(new Date().getFullYear() + 1),

    plate: z
        .string()
        .min(3, "La placa debe tener al menos 3 caracteres.")
        .max(20),

    vin: z
        .string()
        .min(11, "El VIN debe tener mínimo 11 caracteres.")
        .max(17),

    color: z
        .string()
        .min(2, "El color es obligatorio."),

    transmission: z.enum(["MANUAL", "AUTOMATIC"]),

    fuelType: z.enum([
        "GASOLINE",
        "DIESEL",
        "HYBRID",
        "ELECTRIC",
    ]),

    isActive: z.boolean(),
});

export const updateVehicleSchema =
    createVehicleSchema.partial();