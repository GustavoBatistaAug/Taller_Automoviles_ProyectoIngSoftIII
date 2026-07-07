import { SERVICE_STATUS } from "../constants/serviceStatus.js";
import { SERVICE_TYPES } from "../constants/serviceTypes.js";

export const serviceRequests = [
    {
        id: "000001",
        clientId: "CLI001",
        vehicleId: "VEH001",
        type: SERVICE_TYPES.GENERAL_INSPECTION,
        description: "Inspección general del vehículo.",
        serviceStatus: SERVICE_STATUS.PENDING,
        createdAt: new Date().toISOString()
    },
    {
        id: "000002",
        clientId: "CLI001",
        vehicleId: "VEH002",
        type: SERVICE_TYPES.GENERAL_INSPECTION,
        description: "Inspección general del vehículo.",
        serviceStatus: SERVICE_STATUS.ONGOING,
        createdAt: new Date().toISOString()
    },
    {
        id: "000003",
        clientId: "CLI002",
        vehicleId: "VEH003",
        type: SERVICE_TYPES.GENERAL_INSPECTION,
        description: "Inspección general del vehículo.",
        serviceStatus: SERVICE_STATUS.PENDING,
        createdAt: new Date().toISOString()
    },
    {
        id: "000004",
        clientId: "CLI003",
        vehicleId: "VEH004",
        type: SERVICE_TYPES.OTHER,
        description: "Instalación de luces decorativas.",
        serviceStatus: SERVICE_STATUS.REJECTED,
        createdAt: new Date().toISOString()
    },
    {
        id: "000005",
        clientId: "CLI003",
        vehicleId: "VEH004",
        type: SERVICE_TYPES.OIL_CHANGE,
        description: "Cambio anual de aceite.",
        serviceStatus: SERVICE_STATUS.PENDING,
        createdAt: new Date().toISOString()
    }
];