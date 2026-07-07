import { getPartById, increaseStock, decreaseStock } from "../repo/parts.repository.js";

export async function addStock(id, quantity) {
    if (quantity <= 0) {
        throw new Error("Cantidad inválida.");
    }
    return await increaseStock(id, quantity);
}

export async function removeStock(id, quantity) {
    if (quantity <= 0) {
        throw new Error("Cantidad inválida.");
    }
    const part = await getPartById(id);
    if (!part) {
        throw new Error("Repuesto no encontrado.");
    }
    if (part.stock < quantity) {
        throw new Error("Stock insuficiente.");
    }
    return await decreaseStock(id, quantity);
}