import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const CouponSchema = new mongoose.Schema({
    coupon                   : {type: String, unique:true, required: true},
    points                   : {type: Number, required: true},
    title                    : {type: String, required: false},
    status                   : {type: Boolean, required: true, default: true},
    created_at               : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at               : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

CouponSchema.set('toObject', { virtuals: true });
CouponSchema.set('toJSON', { virtuals: true });

export default model('coupons', CouponSchema);

