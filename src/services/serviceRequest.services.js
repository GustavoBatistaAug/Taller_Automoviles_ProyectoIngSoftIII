import { getAllServices, getServiceById, 
    createService as repositoryCreateService, 
    updateService as repositoryUpdateService,
    deleteService as repositoryDeleteService
} from "../repo/serviceRequest.mock.repository.js";

export function findAllServices() {
    return getAllServices();
}

export function findServiceById(id) {
    return getServiceById(id);
}

export function createService(serviceData) {
    const newService = {
        id: `SRV${Date.now()}`,
        clientId: serviceData.clientId,
        vehicleId: serviceData.vehicleId,
        type: serviceData.type,
        description: serviceData.description,
        status: "PENDING",
        createdAt: new Date().toISOString()
    };
    return repositoryCreateService(newService);

}

export function updateService(id, updatedData) {
    return repositoryUpdateService(id, updatedData);
}

export function deleteService(id) {
    return repositoryDeleteService(id);
}