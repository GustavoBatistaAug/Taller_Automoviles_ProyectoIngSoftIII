import {
    findAllVehicles,
    findVehicleById,
    registerVehicle,
    editVehicle,
    removeVehicle
} from "../services/vehicle.services.js";

import { success, error } from "../utils/apiResponse.js";

export async function getVehicles(req, res) {
    try {
        const vehicles = await findAllVehicles();
        return success(res, 200, "Vehículos obtenidos correctamente.", vehicles);
    } catch (err) {
        return error(res, 500, err.message);
    }
}

export async function getVehicle(req, res) {
    try {
        const vehicle = await findVehicleById(req.params.id);
        if (!vehicle) {
            return error(res, 404, "Vehículo no encontrado.");
        }
        return success(res, 200, "Vehículo encontrado.", vehicle);
    } catch (err) {
        return error(res, 500, err.message);
    }
}

export async function createVehicles(req, res) {
    try {
        const vehicle = await registerVehicle(req.body);
        return success(res, 201, "Vehículo registrado correctamente.", vehicle);
    } catch (err) {
        return error(res, 400, err.message);
    }
}

export async function updateVehicles(req, res) {
    try {
        const vehicle = await editVehicle(req.params.id, req.body);
        if (!vehicle) {
            return error(res, 404, "Vehículo no encontrado.");
        }
        return success(res, 200, "Vehículo actualizado correctamente.", vehicle);
    } catch (err) {
        return error(res, 400, err.message);
    }
}

export async function remove(req, res) {
    try {
        const deleted = await removeVehicle(req.params.id);
        if (!deleted) {
            return error(res, 404, "Vehículo no encontrado.");
        }
        return success(res, 200, "Vehículo eliminado correctamente.");
    } catch (err) {
        return error(res, 500, err.message);
    }
}