const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    latitude: {
        type: Number,
        required: true
    },

    longitude: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["Sent", "Acknowledged", "Resolved"],
        default: "Sent"
    },

    triggerTime: {
        type: Date,
        default: Date.now
    },

    acknowledgedAt: {
        type: Date
    },

    resolvedAt: {
        type: Date
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Alert", alertSchema);