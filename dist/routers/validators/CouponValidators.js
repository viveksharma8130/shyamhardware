"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponValidators = void 0;
const express_validator_1 = require("express-validator");
const Coupon_1 = require("../../models/Coupon");
class CouponValidators {
    static create() {
        return [
            (0, express_validator_1.body)('coupon', 'coupon is Required').isString(),
            (0, express_validator_1.body)('points', 'points is Required').isNumeric(),
        ];
    }
    static coupon() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Coupon_1.default.findOne({ _id: id }, { __v: 0 }).then((coupon) => {
                    if (coupon) {
                        req.coupon = coupon;
                        return true;
                    }
                    else {
                        throw new Error('Coupon Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Coupon_1.default.findOne({ _id: id }, { __v: 0 }).then((coupon) => {
                    if (coupon) {
                        req.coupon = coupon;
                        return true;
                    }
                    else {
                        throw new Error('Coupon Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Coupon_1.default.findOne({ _id: id }, { __v: 0 }).then((coupon) => {
                    if (coupon) {
                        req.coupon = coupon;
                        return true;
                    }
                    else {
                        throw new Error('Coupon Does Not Exist');
                    }
                });
            })];
    }
}
exports.CouponValidators = CouponValidators;
