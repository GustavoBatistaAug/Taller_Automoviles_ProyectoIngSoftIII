import Vehicle from "../models/vehicle.model.js";

export async function getAllVehicles() {
    return await Vehicle.find()
        .populate(
            "owner",
            "firstName lastName email phone"
        );
}

export async function getVehicleById(id) {
    return await Vehicle.findById(id)
        .populate(
            "owner",
            "firstName lastName email phone"
        );
}

export async function getVehiclesByOwner(ownerId) {
    return await Vehicle.find({
        owner: ownerId
    });
}

export async function getVehicleByPlate(plate) {
    return await Vehicle.findOne({
        plate
    });
}

export async function getVehicleByVIN(vin) {
    return await Vehicle.findOne({
        vin
    });
}

export async function createVehicle(vehicleData) {
    return await Vehicle.create(vehicleData);
}

export async function updateVehicle(id, vehicleData) {
    return await Vehicle.findByIdAndUpdate(
        id,
        vehicleData,
        {
            new: true,
            runValidators: true
        }
    );

}

export async function deleteVehicle(id) {
    return await Vehicle.findByIdAndDelete(id);
}