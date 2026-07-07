import WorkOrder from "../models/workOrder.model.js";

export async function getAllWorkOrders() {
    return await WorkOrder.find({ isActive: true })
        .populate("clientId", "firstName lastName email")
        .populate("vehicleId")
        .populate("serviceRequestId")
        .populate("assignedMechanic", "firstName lastName email");
}

export async function getWorkOrderById(id) {
    return await WorkOrder.findById(id)
        .populate("clientId", "firstName lastName email")
        .populate("vehicleId")
        .populate("serviceRequestId")
        .populate("assignedMechanic", "firstName lastName email")
        .populate("parts.part");
}

export async function getWorkOrdersByCustomer(customerId) {
    return await WorkOrder.find({ client: customerId, isActive: true });
}

export async function getWorkOrdersByMechanic(mechanicId) {
    return await WorkOrder.find({ assignedMechanic: mechanicId, isActive: true });
}

export async function getWorkOrdersByVehicle(vehicleId) {
    return await WorkOrder.find({ vehicle: vehicleId, isActive: true });
}

export async function getWorkOrdersByStatus(status) {
    return await WorkOrder.find({ status, isActive: true });
}

export async function createWorkOrder(workOrderData) {
    return await WorkOrder.create(workOrderData);
}

export async function updateWorkOrder(id, updatedData) {
    return await WorkOrder.findByIdAndUpdate(
        id,
        updatedData,
        { new: true, runValidators: true }
    );
}

export async function updateWorkOrderStatus(id, status) {
    return await WorkOrder.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
    );
}

export async function assignMechanic(id, mechanicId) {
    return await WorkOrder.findByIdAndUpdate(
        id,
        { assignedMechanic: mechanicId },
        { new: true, runValidators: true }
    );
}

export async function updateParts(id, parts) {
    return await WorkOrder.findByIdAndUpdate(
        id,
        { parts },
        { new: true, runValidators: true }
    );
}

export async function updateCosts(
    id,
    laborCost,
    partsCost,
    total
) {
    return await WorkOrder.findByIdAndUpdate(
        id,
        { laborCost, partsCost, total },
        { new: true, runValidators: true }
    );
}

export async function deleteWorkOrder(id) {
    return await WorkOrder.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
    );
}