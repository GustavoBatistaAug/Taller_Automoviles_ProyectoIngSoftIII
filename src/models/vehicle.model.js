import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    },
    plate: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    vin: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    engine: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        enum: ["MANUAL", "AUTOMÁTICO", "CVT"]
    },
    fuelType: {
        type: String,
        enum: ["GASOLINA", "DIESEL", "HÍBRIDO", "ELÉCTRICO"]
    },
    color: String,
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default mongoose.model("Vehicle", vehicleSchema);