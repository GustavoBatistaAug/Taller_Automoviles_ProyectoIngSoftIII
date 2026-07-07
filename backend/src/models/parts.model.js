import mongoose from "mongoose";

const partsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        brand: {
            type: String,
            required: true,
            trim: true
        },
        partNumber: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },
        description: {
            type: String,
            default: ""
        },
        compatibleVehicles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Vehicle"
            }
        ],
        category: {
            type: String,
            enum: [
                "ENGINE",
                "BRAKES",
                "SUSPENSION",
                "TRANSMISSION",
                "ELECTRICAL",
                "BODY",
                "FILTER",
                "FLUID",
                "OTHER"
            ],
            default: "OTHER"
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
        minimumStock: {
            type: Number,
            default: 5,
            min: 0
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        supplier: {
            type: String,
            trim: true,
            default: ""
        },
        location: {
            type: String,
            trim: true,
            default: ""
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Part", partsSchema);