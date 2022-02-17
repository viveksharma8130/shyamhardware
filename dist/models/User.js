"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: false },
    password: { type: String, required: true },
    gender: { type: String, required: false, enum: ['male', 'female', 'other'], default: 'male' },
    profile_pic: { type: String, required: false },
    address: { type: String, required: false },
    pincode: { type: String, required: false },
    verified_profile: { type: Boolean, required: true, default: false },
    wallet: { type: Number, required: true, default: 0 },
    status: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });
exports.default = (0, mongoose_1.model)('users', userSchema);
