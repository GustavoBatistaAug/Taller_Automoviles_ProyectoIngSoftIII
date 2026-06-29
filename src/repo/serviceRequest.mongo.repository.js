import ServiceRequest from "../models/serviceRequest.model.js";

export async function getAllServices() {
    return await ServiceRequest.find();
}

export async function getServiceById(id) {
    return await ServiceRequest.findById(id);
}

export async function getServicesByClientId(clientId) {
    return await ServiceRequest.find({ clientId });
}

export async function getServicesByVehicleId(vehicleId) {
    return await ServiceRequest.find({ vehicleId });
}

export async function getServicesByType(type) {
    return await ServiceRequest.find({ type });
}

export async function getServicesByStatus(status) {
    return await ServiceRequest.find({ status });
}

export async function createService(service) {
    return await ServiceRequest.create(service);
}

export async function updateService(id, updatedData) {
    return await ServiceRequest.findByIdAndUpdate(
        id,
        updatedData,
        {
            new: true,
            runValidators: true
        }
    );
}

export async function deleteService(id) {
    return await ServiceRequest.findByIdAndDelete(id);
}