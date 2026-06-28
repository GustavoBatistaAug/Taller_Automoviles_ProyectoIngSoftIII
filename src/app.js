import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import errorMiddleware from './middlewares/error.middleware.js'

const app = express();

const allowedOrigins = [
    "http://localhost:5173"
];

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
    success: false,
    message: "Demasiadas solicitudes. Intente nuevamente más tarde."
    }
});

app.use((req, res, next) => {
    Object.defineProperty(req, 'query', {
        value: { ...req.query },
        writable: true,
        configurable: true,
        enumerable: true
    });
    next();
});

app.use(helmet());
app.use(cors({
        origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
        }
        callback(new Error("Origen no permitido por CORS."));
        },
    credentials: true
    })
);
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());
app.use(hpp());
app.use(compression());

app.get("/api/v1", (req, res) => {
    res.status(200).json({
        success: true,
        message: "GarageSolutions API v1"
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Recurso no encontrado."
    });
});

app.use(errorMiddleware);

export default app;