"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const CouponSchema = new mongoose.Schema({
    coupon: { type: String, unique: true, required: true },
    points: { type: Number, required: true },
    title: { type: String, required: false },
    status: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
CouponSchema.set('toObject', { virtuals: true });
CouponSchema.set('toJSON', { virtuals: true });
exports.default = (0, mongoose_1.model)('coupons', CouponSchema);
