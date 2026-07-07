import {
    getAllServices,
    getServiceById,
    createService as repositoryCreateService,
    updateService as repositoryUpdateService,
    deleteService as repositoryDeleteService
} from "../repo/serviceRequest.mongo.repository.js";

import { SERVICE_STATUS } from "../constants/serviceStatus.js";

export async function findAllServices() {
    return await getAllServices();
}

export async function findServiceById(id) {
    return await getServiceById(id);
}

export async function createService(serviceData) {

    const newService = {
        clientId: serviceData.clientId,
        vehicleId: serviceData.vehicleId,
        type: serviceData.type,
        description: serviceData.description,
        status: SERVICE_STATUS.PENDING
    };

    return await repositoryCreateService(newService);
}

export async function updateService(id, updatedData) {
    return await repositoryUpdateService(id, updatedData);
}

export async function deleteService(id) {
    return await repositoryDeleteService(id);
}