const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    message: { type: String, trim: true },
    response: { type: String, trim: true },
    time: {
        type: Date,
        default: Date.now,
        get: (val) => val ? new Date(Math.floor(val.getTime() / 60000) * 60000) : val // Zero seconds & ms
    }
}, {
    timestamps: false,
    toJSON: { getters: true },
    toObject: { getters: true }
});

module.exports = mongoose.model("Message", messageSchema);
