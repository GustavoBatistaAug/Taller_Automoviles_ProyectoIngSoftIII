import mongoose from "mongoose";

const workOrderServiceSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true
        },
        cost: {
            type: Number,
            required: true,
            min: 0
        }
    },
    { _id: false }
);

const workOrderPartSchema = new mongoose.Schema(
    {
        part: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Part",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        unitPrice: {
            type: Number,
            required: true,
            min: 0
        },
        subtotal: {
            type: Number,
            required: true,
            min: 0
        }
    },
    { _id: false }
);

const workOrderSchema = new mongoose.Schema(
    {
        serviceRequestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ServiceRequest",
            required: true
        },

        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicles",
            required: true
        },

        assignedMechanic: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        services: {
            type: [workOrderServiceSchema],
            default: []
        },

        parts: {
            type: [workOrderPartSchema],
            default: []
        },

        laborHours: {
            type: Number,
            default: 0,
            min: 0
        },

        laborCost: {
            type: Number,
            default: 0,
            min: 0
        },

        partsCost: {
            type: Number,
            default: 0,
            min: 0
        },

        total: {
            type: Number,
            default: 0,
            min: 0
        },

        observations: {
            type: String,
            trim: true,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "PENDING",
                "ASSIGNED",
                "IN_PROGRESS",
                "WAITING_PARTS",
                "FINISHED",
                "DELIVERED",
                "CANCELLED"
            ],
            default: "PENDING"
        },

        startedAt: {
            type: Date
        },

        finishedAt: {
            type: Date
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        isActive: {
            type: Boolean,
            default: true
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model("WorkOrder", workOrderSchema);