import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const TransactionSchema = new mongoose.Schema({
    user                     : {type: mongoose.Types.ObjectId, ref: 'users', required: true},
    coupon                   : {type: mongoose.Types.ObjectId, ref: 'coupons', required: false}, // update coupon status while creating
    channel                  : {type: String, required: true, enum:['redeem','cash','reward']},
    transaction_mode         : {type: String, required: true, enum:['credit','debit']},
    amount                   : {type: Number, required: true},
    status                   : {type: Boolean, required: true, default: true},
    created_at               : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at               : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

TransactionSchema.set('toObject', { virtuals: true });
TransactionSchema.set('toJSON', { virtuals: true });

export default model('transactions', TransactionSchema);

