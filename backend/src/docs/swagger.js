import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "GarageSolutions API",
            version: "1.0.0",
            description: "API REST para la gestión de talleres automotrices"
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: [
        path.join(__dirname, "../routes/*.js")
    ]
};

export const swaggerSpec = swaggerJsdoc(options);