import {
    getAllWorkOrders,
    getWorkOrderById,
    createWorkOrder,
    updateWorkOrder,
    updateWorkOrderStatus,
    assignMechanic,
    updateParts,
    updateCosts,
    deleteWorkOrder
} from "../repo/workOrder.repository.js";
import { getPartById, decreaseStock } from "../repo/parts.repository.js";
import { updateService } from "../repo/serviceRequest.mongo.repository.js";
import { SERVICE_STATUS } from "../constants/serviceStatus.js";

export async function findAllWorkOrders() {
    return await getAllWorkOrders();
}

export async function findWorkOrderById(id) {
    return await getWorkOrderById(id);
}

export async function registerWorkOrder(data) {
    const workOrder = await createWorkOrder({
        ...data,
        status: SERVICE_STATUS.PENDING
    });
    await updateService(
        data.serviceRequest,
        { serviceStatus: "ASSIGNED" }
    );
    return workOrder;
}

export async function editWorkOrder(id, updatedData) {
    return await updateWorkOrder(id, updatedData);
}

export async function changeStatus(id, status) {
    const workOrder = await updateWorkOrderStatus(id, status);
    if (!workOrder) {
        return null;
    }
    if (status === "DELIVERED") {
        await updateService(
            workOrder.serviceRequest,
            { serviceStatus: "FINISHED" }
        );
    }
    return workOrder;
}

export async function assignWorkOrderMechanic(id, mechanicId) {
    return await assignMechanic(
        id,
        mechanicId
    );
}

export async function addPartToWorkOrder(
    workOrderId,
    partId,
    quantity
) {
    const workOrder = await getWorkOrderById(workOrderId);
    if (!workOrder) {
        throw new Error("Orden de trabajo no encontrada.");
    }
    const part = await getPartById(partId);
    if (!part) {
        throw new Error("Repuesto no encontrado.");
    }
    if (part.stock < quantity) {
        throw new Error("Inventario insuficiente.");
    }
    await decreaseStock(
        partId,
        quantity
    );
    const subtotal =
        quantity * part.price;
    workOrder.parts.push({
        part: part._id,
        quantity,
        unitPrice: part.price,
        subtotal
    });
    await updateParts(
        workOrderId,
        workOrder.parts
    );
    return await calculateTotals(
        workOrderId
    );
}

export async function removePartFromWorkOrder(
    workOrderId,
    partId
) {
    const workOrder = await getWorkOrderById(workOrderId);
    if (!workOrder) {
        throw new Error("Orden de trabajo no encontrada.");
    }
    workOrder.parts =
        workOrder.parts.filter(
            p => p.part.toString() !== partId
        );
    await updateParts(
        workOrderId,
        workOrder.parts
    );
    return await calculateTotals(
        workOrderId
    );
}

export async function calculateTotals(id) {
    const workOrder = await getWorkOrderById(id);
    if (!workOrder) {
        throw new Error("Orden no encontrada.");
    }
    const partsCost =
        workOrder.parts.reduce(
            (acc, item) => acc + item.subtotal,
            0
        );
    const laborCost =
        workOrder.laborCost || 0;
    const total =
        laborCost + partsCost;
    await updateCosts(
        id,
        laborCost,
        partsCost,
        total
    );
    return await getWorkOrderById(id);
}

export async function removeWorkOrder(id) {
    return await deleteWorkOrder(id);
}