import mongoose from "mongoose";
import { SERVICE_STATUS } from "../constants/serviceStatus.js";

const serviceRequestSchema = new mongoose.Schema(
{
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true
    },

    type: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    status: {
        type: String,
        enum: Object.values(SERVICE_STATUS),
        default: SERVICE_STATUS.PENDING
    }
},
{
    timestamps: true,
    versionKey: false
});

export default mongoose.model(
    "ServiceRequest",
    serviceRequestSchema
);