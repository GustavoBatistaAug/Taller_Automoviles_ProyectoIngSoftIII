import Part from "../models/parts.model.js";

export async function getAllParts() {
    return await Part.find({isActive: true})
        .populate("compatibleVehicles", "brand model year plate")
        .sort({ createdAt: -1 });
}

export async function getPartById(id) {
    return await Part.findById(id)
        .populate("compatibleVehicles", "brand model year plate");
}

export async function getPartByNumber(partNumber) {
    return await Part.findOne({
        partNumber: partNumber.toUpperCase()
    });
}

export async function getPartsByCategory(category) {
    return await Part.find({ category });
}

export async function getPartsByBrand(brand) {
    return await Part.find({
        brand: new RegExp(`^${brand}$`, "i")
    });
}

export async function getActiveParts() {
    return await Part.find({
        isActive: true
    });
}

export async function getLowStockParts() {
    return await Part.find({
        $expr: {
            $lte: ["$stock", "$minimumStock"]
        }
    });
}

export async function createPart(partData) {
    return await Part.create(partData);
}

export async function updatePart(id, updatedData) {
    return await Part.findByIdAndUpdate(
        id,
        updatedData,
        { new: true, runValidators: true }
    );
}

export async function deletePart(id) {
    return await Part.findByIdAndUpdate(
        id, 
        { isActive: false }, { new: true }
    );
}