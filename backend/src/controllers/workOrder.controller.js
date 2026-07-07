import {
findAllWorkOrders,
findWorkOrderById,
registerWorkOrder,
editWorkOrder,
changeStatus,
assignWorkOrderMechanic,
addPartToWorkOrder,
removePartFromWorkOrder,
calculateTotals,
removeWorkOrder
} from "../services/workOrder.services.js";

import { success, error } from "../utils/apiResponse.js";

export async function getWorkOrders(req,res){
    try {
            const workOrders = await findAllWorkOrders();
            return success(res, 200, "Órdenes obtenidas correctamente.", workOrders);
        } catch(err) {
            return error(res, 500, err.message);
    }
}

export async function getWorkOrder(req,res){
    try{
        const workOrder = await findWorkOrderById(req.params.id);
        if(!workOrder){
            return error(res, 404, "Orden de trabajo no encontrada.");
        }
            return success(res, 200, "Orden obtenida correctamente.", workOrder);
    } catch(err) {
            return error(res, 500, err.message);
    }
}

export async function create(req,res){
    try{
        const workOrder = await registerWorkOrder(req.body);
        return success(res, 201, "Orden creada correctamente.", workOrder);
    } catch(err) {
        return error(res, 400, err.message);
    }
}

export async function update(req,res){
    try{
    const workOrder = await editWorkOrder(req.params.id,req.body);
    if(!workOrder){
        return error(res, 404, "Orden no encontrada.");
    }
        return success(res, 200, "Orden actualizada correctamente.", workOrder);
    } catch(err) {
        return error(res, 400, err.message);
    }
}

export async function updateStatus(req,res){
    try{
    const workOrder = await changeStatus(req.params.id,req.body.status);
    if(!workOrder){
        return error(res, 404, "Orden no encontrada.");
    }
        return success(res, 200, "Estado actualizado.",workOrder);
    } catch(err) {
        return error(res, 400, err.message);
    }
}

export async function assignMechanic(req,res){
    try{
    const workOrder = await assignWorkOrderMechanic(req.params.id,req.body.mechanic);
    if(!workOrder){
        return error(res, 404, "Orden no encontrada.");
    }
        return success(res, 200, "Mecánico asignado.",workOrder);
    } catch(err) {
        return error(res, 400, err.message);
    }
}

export async function addPart(req,res){
    try{
    const workOrder = await addPartToWorkOrder(req.params.id,req.body.part,req.body.quantity);
        return success(res, 200, "Repuesto agregado.",workOrder);
    } catch(err) {
        return error(res, 400, err.message);
    }
}

export async function removePart(req,res){
    try {
    const workOrder = await removePartFromWorkOrder(req.params.id,req.body.part);
        return success(res, 200, "Repuesto eliminado.",workOrder);
    } catch(err) {
        return error(res, 400, err.message);
    }
}

export async function recalculate(req,res){
    try{
    const workOrder = await calculateTotals(req.params.id);
        return success(res, 200, "Costos recalculados.",workOrder);
    }catch(err){
        return error(res, 400, err.message);
    }
}

export async function remove(req,res){
    try{
    const workOrder = await removeWorkOrder(req.params.id);
    if(!workOrder){
        return error(res, 404, "Orden no encontrada.");
    }
        return success(res, 200, "Orden eliminada.",workOrder);
    } catch(err) {
        return error(res, 500, err.message);
    }
}