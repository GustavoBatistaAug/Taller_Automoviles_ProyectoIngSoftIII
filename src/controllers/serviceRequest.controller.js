import { findAllServices, findServiceById, createService, updateService, deleteService } from "../services/serviceRequest.services.js";
import { success, error } from "../utils/apiResponse.js";
import { createServiceRequestSchema } from "../validators/serviceRequest.validator.js";

export async function getServices(req, res) {
    const services = await findAllServices();
    return success(res, 200, "Servicios obtenidos correctamente.", services);
}

export async function getService(req, res) {
    const { id } = req.params;
    const service = await findServiceById(id);
    
    if (!service) {
        return error(res, 404, "Servicio no encontrado.");
    }
    return success(res, 200, "Servicio encontrado.", service);
}

export async function setService(req, res) {
    const validation = createServiceRequestSchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessages = validation.error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
        return error(res, 400, `Errores de validación: ${errorMessages}`);
    }
    const service = await createService(req.body);
    return success(res, 201, "Servicio creado correctamente.", service);
}

export async function editService(req, res) {
    const { id } = req.params;
    const service = await updateService(id, req.body);
    
    if (!service) {
        return error(res, 404, "Servicio no encontrado. ")
    }
    return success(res, 200, "Servicio actualizado correctamente.", service);
}

export async function removeService(req, res) {
    const { id } = req.params;
    const service = await deleteService(id);
    if (!service) {
        return error(res, 404, "Servicio no encontrado.");
    }
    return success(res, 200, "Servicio eliminado correctamente.", service);
}