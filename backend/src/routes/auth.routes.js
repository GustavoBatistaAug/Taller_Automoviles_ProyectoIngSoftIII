import { validate } from "../middlewares/validation.middleware.js"
import { Router } from "express";
import { register, login, profile } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { loginSchema, registerUserSchema } from "../validators/auth.validator.js";

const router = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Registrar un nuevo usuario
 *     description: Crea una cuenta de usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - phone
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente.
 *       400:
 *         description: Error de validación.
 */
router.post(
    "/register",
    validate(registerUserSchema),
    register
);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso.
 *       401:
 *         description: Credenciales inválidas.
 */
router.post(
    "/login",
    validate(loginSchema),
    login
);

/**
 * @openapi
 * /auth/profile:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Obtener perfil del usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido correctamente.
 *       401:
 *         description: Token inválido.
 */
router.get(
    "/profile",
    authenticate,
    profile
);

export default router;