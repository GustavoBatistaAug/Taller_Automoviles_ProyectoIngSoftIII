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
    console.log(response.status);
    console.log(response.body);
    expect(response.status).toBe(201);
    });
});