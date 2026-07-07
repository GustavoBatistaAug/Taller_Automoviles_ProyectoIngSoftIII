const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Error interno del servidor."
    });
};

export default errorMiddleware;