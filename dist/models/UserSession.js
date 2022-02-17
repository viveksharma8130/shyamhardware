"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const userSessionSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: 'users', required: false },
    firebase_token: { type: String, required: true },
    device_detail: { type: String, required: true },
    device_id: { type: String, required: true },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
userSessionSchema.set('toObject', { virtuals: true });
userSessionSchema.set('toJSON', { virtuals: true });
exports.default = (0, mongoose_1.model)('user_sessions', userSessionSchema);
