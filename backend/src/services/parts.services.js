import {
    getAllParts,
    getPartById,
    getPartByNumber,
    getPartsByCategory,
    getPartsByBrand,
    getActiveParts,
    getLowStockParts,
    createPart,
    updatePart,
    deletePart
} from "../repo/parts.repository.js";

export async function findAllParts() {
    return await getAllParts();
}

export async function findPartById(id) {
    return await getPartById(id);
}

export async function findPartsByCategory(category) {
    return await getPartsByCategory(category);
}

export async function findPartsByBrand(brand) {
    return await getPartsByBrand(brand);
}

export async function findActiveParts() {
    return await getActiveParts();
}

export async function findLowStockParts() {
    return await getLowStockParts();
}

export async function registerPart(partData) {
    const existingPart = await getPartByNumber(partData.partNumber);
    if (existingPart) {
        throw new Error("El número de parte ya se encuentra registrado.");
    }
    return await createPart({
        ...partData,
        partNumber: partData.partNumber.toUpperCase()
    });
}

export async function editPart(id, updatedData) {
    if (updatedData.partNumber) {
        updatedData.partNumber =
            updatedData.partNumber.toUpperCase();
        const existingPart =
            await getPartByNumber(updatedData.partNumber);
        if (
            existingPart &&
            existingPart._id.toString() !== id
        ) {
            throw new Error("El número de parte ya está registrado.");
        }
    }
    return await updatePart(id, updatedData);
}

export async function removePart(id) {
    return await deletePart(id);
}