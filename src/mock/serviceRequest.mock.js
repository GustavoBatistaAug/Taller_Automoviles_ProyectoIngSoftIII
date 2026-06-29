export const serviceRequests = [
    {
        id: "000001",
        clientId: "CLI001",
        vehicleId: "VEH001",
        type: "General Inspection",
        description: "Inspección general del vehículo.",
        serviceStatus: "PENDING",
        createdAt: new Date().toISOString()
    },
    {
        id: "000002",
        clientId: "CLI001",
        vehicleId: "VEH002",
        type: "General Inspection",
        description: "Inspección general del vehículo.",
        serviceStatus: "ONGOING",
        createdAt: new Date().toISOString()
    },
    {
        id: "000003",
        clientId: "CLI002",
        vehicleId: "VEH003",
        type: "General Inspection",
        description: "Inspección general del vehículo.",
        serviceStatus: "PENDING",
        createdAt: new Date().toISOString()
    },
    {
        id: "000004",
        clientId: "CLI003",
        vehicleId: "VEH004",
        type: "Other",
        description: "Instalación de luces decorativas.",
        serviceStatus: "REJECTED",
        createdAt: new Date().toISOString()
    },
    {
        id: "000005",
        clientId: "CLI003",
        vehicleId: "VEH004",
        type: "General Inspection",
        description: "Inspección general del vehículo.",
        serviceStatus: "PENDING",
        createdAt: new Date().toISOString()
    }
];