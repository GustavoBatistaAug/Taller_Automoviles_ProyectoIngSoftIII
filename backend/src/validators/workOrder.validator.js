import { z } from "zod";

const objectId = /^[0-9a-fA-F]{24}$/;

export const createWorkOrderSchema = z.object({
    serviceRequestId: z
        .string()
        .regex(objectId, "ServiceRequest inválido."),
    clientId: z
        .string()
        .regex(objectId, "Cliente inválido."),
    vehicleId: z
        .string()
        .regex(objectId, "Vehículo inválido."),
    assignedMechanic: z
        .string()
        .regex(objectId, "Mecánico inválido.")
        .optional(),
    services: z.array(
        z.object({
            description: z
                .string()
                .min(3)
                .max(150),
            cost: z
                .number()
                .nonnegative()
        })
    ).default([]),
    observations: z
        .string()
        .max(500)
        .optional(),
    createdBy: z
        .string()
        .regex(objectId, "Cliente inválido."),
});

export const updateWorkOrderSchema = createWorkOrderSchema.partial();

export const updateWorkOrderStatusSchema = z.object({
    status: z.enum([
        "PENDING",
        "ASSIGNED",
        "IN_PROGRESS",
        "WAITING_PARTS",
        "FINISHED",
        "DELIVERED",
        "CANCELLED"
    ])
});

export const addPartSchema = z.object({
    part: z
        .string()
        .regex(objectId),
    quantity: z
        .number()
        .int()
        .positive()
});

export const removePartSchema = z.object({
    part: z
        .string()
        .regex(objectId)
});

export const assignMechanicSchema = z.object({
    mechanic: z
        .string()
        .regex(objectId, "ID del mecánico inválido.")

});