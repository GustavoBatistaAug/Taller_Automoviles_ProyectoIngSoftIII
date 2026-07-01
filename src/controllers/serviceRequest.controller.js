import { findAllServices, findServiceById, createService, updateService, deleteService } from "../services/serviceRequest.services.js";
import { success, error } from "../utils/apiResponse.js";

export async function getServices(req, res) {
    try {
        const services = await findAllServices();
        return success(
            res,
            200,
            "Servicios obtenidos correctamente.",
            services
        );
    } catch (err) {
        return error(
            res,
            500,
            err.message
        );
    }
}

export async function getService(req, res) {
    try {
        const { id } = req.params;
        const service = await findServiceById(id);
        if (!service) {
            return error(
                res,
                404,
                "Servicio no encontrado."
            );
        }
        return success(
            res,
            200,
            "Servicio encontrado.",
            service
        );
    } catch (err) {
        return error(
            res,
            500,
            err.message
        );
    }
}

export async function setService(req, res) {
    try {
        const service = await createService(req.body);
        return success(
            res,
            201,
            "Servicio creado correctamente.",
            service
        );
    } catch (err) {
        return error(
            res,
            400,
            err.message
        );
    }
}

export async function editService(req, res) {
    try {
        const { id } = req.params;
        const service = await updateService(
            id,
            req.body
        );
        if (!service) {
            return error(
                res,
                404,
                "Servicio no encontrado."
            );
        }
        return success(
            res,
            200,
            "Servicio actualizado correctamente.",
            service
        );
    } catch (err) {
        return error(
            res,
            400,
            err.message
        );
    }
}

export async function removeService(req, res) {
    try {
        const { id } = req.params;
        const deleted = await deleteService(id);
        if (!deleted) {
            return error(
                res,
                404,
                "Servicio no encontrado."
            );
        }
        return success(
            res,
            200,
            "Servicio eliminado correctamente."
        );
    } catch (err) {
        return error(
            res,
            500,
            err.message
        );
    }
}