import { findAllServices, findServiceById, createService, updateService, deleteService } from "../services/serviceRequest.services.js";

export function getServices(req, res) {
    const services = findAllServices();
    res.status(200).json({
        success: true,
        message: "Servicios obtenidos correctamente.",
        data: services
    });
}

export function getService(req, res) {
    const { id } = req.params;
    const service = findServiceById(id);
    if (!service) {
        return res.status(404).json({
            success: false,
            message: "Servicio no encontrado."
        });
    }

    res.status(200).json({
        success: true,
        message: "Servicio encontrado.",
        data: service
    });

}

export function setService(req, res) {
    const { clientId, vehicleId, type, description } = req.body;
    if (!clientId || !vehicleId || !type || !description) {
        return res.status(400).json({
            success: false,
            message: "Todos los campos son obligatorios."
        });
    }

    const service = createService(req.body);
    res.status(201).json({
        success: true,
        message: "Servicio creado correctamente.",
        data: service
    });
}

export function editService(req, res) {
    const { id } = req.params;
    const service = updateService(id, req.body);
    if (!service) {
        return res.status(404).json({
            success: false,
            message: "Servicio no encontrado."
        });
    }

    res.status(200).json({
        success: true,
        message: "Servicio actualizado correctamente.",
        data: service
    });
}

export function removeService(req, res) {
    const { id } = req.params;
    const service = deleteService(id);
    if (!service) {
        return res.status(404).json({
            success: false,
            message: "Servicio no encontrado."
        });
    }

    res.status(200).json({
        success: true,
        message: "Servicio eliminado correctamente.",
        data: service
    });
}