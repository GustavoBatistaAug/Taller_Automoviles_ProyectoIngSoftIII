import { z } from "zod";

export const createVehicleSchema = z.object({
    owner: z.string().min(1),
    brand: z.string().min(2),
    model: z.string().min(1),
    engine: z.string().min(1),
    year: z.number().int().min(1950).max(new Date().getFullYear() + 1),
    plate: z.string().min(3).max(20),
    vin: z.string().min(11).max(17),
    color: z.string().min(2)
});

export const updateVehicleSchema = createVehicleSchema.partial();