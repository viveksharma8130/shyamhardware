"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const TransactionSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    coupon: { type: mongoose.Types.ObjectId, ref: 'coupons', required: false },
    channel: { type: String, required: true, enum: ['redeem', 'cash', 'reward'] },
    transaction_mode: { type: String, required: true, enum: ['credit', 'debit'] },
    amount: { type: Number, required: true },
    status: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
TransactionSchema.set('toObject', { virtuals: true });
TransactionSchema.set('toJSON', { virtuals: true });
exports.default = (0, mongoose_1.model)('transactions', TransactionSchema);
