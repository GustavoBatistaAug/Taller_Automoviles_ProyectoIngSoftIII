import { findAllServices, findServiceById, createService, updateService, deleteService } from "../services/serviceRequest.services.js";
import { success, error } from "../utils/apiResponse.js";
import { createServiceRequestSchema } from "../validators/serviceRequest.validator.js";

export function getServices(req, res) {
    const services = findAllServices();
    return success(res, 200, "Servicios obtenidos correctamente.", services);
}

export function getService(req, res) {
    const { id } = req.params;
    const service = findServiceById(id);
    
    if (!service) {
        return error(res, 404, "Servicio no encontrado.");
    }
    return success(res, 200, "Servicio encontrado.", service);
}

export function setService(req, res) {
    const validation = createServiceRequestSchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessages = validation.error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
        return error(res, 400, `Errores de validación: ${errorMessages}`);
    }
    const service = createService(req.body);
    return success(res, 201, "Servicio creado correctamente.", service);
}

export function editService(req, res) {
    const { id } = req.params;
    const service = updateService(id, req.body);
    
    if (!service) {
        return error(res, 404, "Servicio no encontrado. ")
    }
    return success(res, 200, "Servicio actualizado correctamente.", service);
}

export function removeService(req, res) {
    const { id } = req.params;
    const service = deleteService(id);
    if (!service) {
        return error(res, 404, "Servicio no encontrado.");
    }
    return success(res, 200, "Servicio eliminado correctamente.", service);
}