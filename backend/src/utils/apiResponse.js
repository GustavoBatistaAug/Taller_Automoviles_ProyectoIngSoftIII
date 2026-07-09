export function success(res, status, message, data) {
    return res.status(status).json({
        success: true,
        message,
        data
    });
}

export function error(res, status, message, errors = null) {
    return res.status(status).json({
        success: false,
        message,
        ...(errors && { errors })
    });
}