import mongoose from "mongoose";
import { ROLES } from "../constants/roles.js";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.CLIENT
        },
        isActive: {
            type: Boolean,
            default: true
        },
        lastLogin: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model("User", userSchema);