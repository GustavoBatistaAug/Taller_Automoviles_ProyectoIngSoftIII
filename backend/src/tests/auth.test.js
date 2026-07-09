import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import request from "supertest";
import { connectDatabase } from "../config/database.js";
import mongoose from "mongoose";
import app from "../app.js";

beforeAll(async () => {
    console.log("Conectando...");
    await connectDatabase();
    console.log("Conectado");
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Auth", () => {
    it("Debe registrar un usuario", async () => {
        const response = await request(app)
    .post("/api/v1/auth/register")
    .send({
        firstName: "Pedro",
        lastName: "Sanchez",
        email: `pedro${Date.now()}@test.com`,
        password: "cliente123",
        phone: "6121-3274",
        role: "CLIENT"
    });
    expect(response.status).toBe(201);
    });

    it("Debe rechazar email duplicado", async () => {
        const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
            firstName: "Pedro",
            lastName: "Sanchez",
            email: `pejuan@test.com`,
            password: "cliente123",
            phone: "6121-3274",
            role: "CLIENT"
        })
        expect(response.status).toBe(400);    
    });
    

    it("Debe fallar inicio de sesión con un usuario no existente", async () => {
        const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
            email: "nonexistent.user@test.com",
            password: "NOPASS"
        })
        expect(response.status).toBe(401);
    });
});