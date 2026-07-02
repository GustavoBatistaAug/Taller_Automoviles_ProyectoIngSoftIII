import {
    getAllVehicles,
    getVehicleById,
    getVehiclesByOwner,
    getVehicleByPlate,
    getVehicleByVIN,
    createVehicle,
    updateVehicle,
    deleteVehicle
} from "../repo/vehicle.mongo.repository.js";

export async function findAllVehicles() {
    return await getAllVehicles();
}

export async function findVehicleById(id) {
    return await getVehicleById(id);
}

export async function findVehiclesByOwner(ownerId) {
    return await getVehiclesByOwner(ownerId);
}

export async function registerVehicle(vehicleData) {
    const plateExists = await getVehicleByPlate(vehicleData.plate);
    if (plateExists) {
        throw new Error("La placa ya se encuentra registrada.");
    }

    const vinExists = await getVehicleByVIN(vehicleData.vin);
    if (vinExists) {
        throw new Error("El VIN ya se encuentra registrado.");
    }
    return await createVehicle(vehicleData);
}

export async function editVehicle(id, vehicleData) {
    return await updateVehicle(id, vehicleData);
}

export async function removeVehicle(id) {
    return await deleteVehicle(id);
}