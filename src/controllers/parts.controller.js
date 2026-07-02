import {
    findAllParts,
    findPartById,
    findPartsByCategory,
    findPartsByBrand,
    findActiveParts,
    findLowStockParts,
    registerPart,
    editPart,
    removePart
} from "../services/parts.services.js";

import { success, error } from "../utils/apiResponse.js";

export async function getParts(req, res) {
    try {
        const parts = await findAllParts();
        return success(
            res,
            200,
            "Repuestos obtenidos correctamente.",
            parts
        );
    } catch (err) {
        return error(res, 500, err.message);
    }
}

export async function getPart(req, res) {
    try {
        const part = await findPartById(req.params.id);
        if (!part) {
            return error(
                res,
                404,
                "Repuesto no encontrado."
            );
        }
        return success(
            res,
            200,
            "Repuesto encontrado.",
            part
        );
    } catch (err) {
        return error(res, 500, err.message);
    }

}

export async function getPartsByCategory(req, res) {
    try {
        const parts = await findPartsByCategory(
            req.params.category
        );
        return success(
            res,
            200,
            "Repuestos encontrados.",
            parts
        );
    } catch (err) {
        return error(res, 500, err.message);
    }
}

export async function getPartsByBrand(req, res) {
    try {
        const parts = await findPartsByBrand(
            req.params.brand
        );
        return success(
            res,
            200,
            "Repuestos encontrados.",
            parts
        );
    } catch (err) {
        return error(res, 500, err.message);
    }
}

export async function getActive(req, res) {
    try {
        const parts = await findActiveParts();
        return success(
            res,
            200,
            "Inventario activo.",
            parts
        );
    } catch (err) {
        return error(res, 500, err.message);
    }
}

export async function getLowStock(req, res) {
    try {
        const parts = await findLowStockParts();
        return success(
            res,
            200,
            "Repuestos con bajo inventario.",
            parts
        );
    } catch (err) {
        return error(res, 500, err.message);
    }
}

export async function createPart(req, res) {
    try {
        const created = await registerPart(req.body);
        return success(
            res,
            201,
            "Repuesto registrado correctamente.",
            created
        );
    } catch (err) {
        return error(res, 400, err.message);
    }
}

export async function updatePart(req, res) {
    try {
        const updated = await editPart(
            req.params.id,
            req.body
        );
        if (!updated) {
            return error(
                res,
                404,
                "Repuesto no encontrado."
            );
        }
        return success(
            res,
            200,
            "Repuesto actualizado correctamente.",
            updated
        );
    } catch (err) {
        return error(res, 400, err.message);
    }
}

export async function deletePart(req, res) {
    try {
        const deleted = await removePart(
            req.params.id
        );
        if (!deleted) {
            return error(
                res,
                404,
                "Repuesto no encontrado."
            );
        }
        return success(
            res,
            200,
            "Repuesto eliminado correctamente."
        );
    } catch (err) {
        return error(res, 500, err.message);
    }
}