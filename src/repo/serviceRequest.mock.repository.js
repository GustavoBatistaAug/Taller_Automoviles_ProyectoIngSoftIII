import { serviceRequests } from "../mock/serviceRequest.mock.js";

export function getAllServices(){
    return serviceRequests;
}

export function getServiceById(id) {
    return serviceRequests.find(service => service.id === id);
}

export function getServicesByClientId(clientId){
    return serviceRequests.filter(service => service.clientId === clientId);
}

export function getServicesByVehicleId(vehicleId){
    return serviceRequests.filter(service => service.vehicleId === vehicleId);
}

export function getServicesByType(type){
    return serviceRequests.filter(service => service.type === type);
}

export function getServicesByStatus(status){
    return serviceRequests.filter(service => service.status === status);
}

export function createService(service) {
    serviceRequests.push(service);
    return service;
}

export function updateService(service, id){
    const updatedData = getServiceById(id);
    if (!service) return undefined;
    Object.assign(service, updatedData);
    return service;
}

export function deleteService(){
    const index = serviceRequests.findIndex(service => service.id === id);
    if(index === -1)
        return undefined;
    return serviceRequests.splice(index,1)[0];
}