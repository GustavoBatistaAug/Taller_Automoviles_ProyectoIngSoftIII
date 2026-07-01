import { z } from "zod";

export const createServiceRequestSchema = z.object({
    clientId: z.string().min(1),
    vehicleId: z.string().min(1),
    type: z.string().min(1),
    description: z.string().min(5)
});

export const updateServiceRequestSchema = z.object({
    clientId: z.string().min(1),
    vehicleId: z.string().min(1),
    description: z.string().min(5)
});