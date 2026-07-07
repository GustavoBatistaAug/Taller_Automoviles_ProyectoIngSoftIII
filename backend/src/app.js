import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import errorMiddleware from './middlewares/error.middleware.js'
import serviceRoutes from "./routes/serviceRequest.routes.js";
import authRoutes from "./routes/auth.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
import partsRoutes from "./routes/parts.routes.js";
import workOrderRoutes from "./routes/workOrder.routes.js";

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
app.use(limiter);

app.get("/api/v1", (req, res) => {
    res.status(200).json({
        success: true,
        message: "GarageSolutions API v1"
    });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/service-request", serviceRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/api/v1/parts", partsRoutes);
app.use("/api/v1/work-order", workOrderRoutes);

app.use(errorMiddleware);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Recurso no encontrado."
    });
});

export default app;