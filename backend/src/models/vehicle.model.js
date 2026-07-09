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
        enum: ["MANUAL", "AUTOMATIC"],
        default: "MANUAL"
    },

    fuelType: {
        type: String,
        enum: [
            "GASOLINE",
            "DIESEL",
            "HYBRID",
            "ELECTRIC"
        ],
        default: "GASOLINE"
    },

    color: {
        type: String,
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

export default mongoose.model("Vehicle", vehicleSchema);