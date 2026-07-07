import { error } from "../utils/apiResponse.js";

export function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errors = result.error.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message
            }));

            return error(
                res,
                400,
                "Error de validación.",
                errors
            );
        }
        req.body = result.data;
        next();
    };
}