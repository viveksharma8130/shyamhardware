"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionValidators = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("../../models/User");
const Transaction_1 = require("../../models/Transaction");
const Coupon_1 = require("../../models/Coupon");
class TransactionValidators {
    static transaction() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Transaction_1.default.findOne({ _id: id, user: req.user.user_id }, { __v: 0 })
                    .sort({ '_id': -1 })
                    .populate([
                    { path: 'user' },
                    { path: "coupon", select: ['coupon', 'points'] }
                ])
                    .then((transaction) => {
                    if (transaction) {
                        req.transaction = transaction;
                        return true;
                    }
                    else {
                        throw new Error('Transaction Does Not Exist');
                    }
                });
            })];
    }
    static userTransaction() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Transaction_1.default.find({ user: id }, { __v: 0 })
                    .sort({ '_id': -1 })
                    .populate([
                    { path: 'user' },
                    { path: "coupon", select: ['coupon', 'points'] }
                ])
                    .then((transaction) => {
                    if (transaction) {
                        req.transaction = transaction;
                        return true;
                    }
                    else {
                        throw new Error('No Transaction Found');
                    }
                });
            })];
    }
    static allUserTransaction() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return User_1.default.findOne({ _id: id }, { __v: 0 }).then((user) => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('user Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Transaction_1.default.findOne({ _id: id }, { __v: 0 }).then((transaction) => {
                    if (transaction) {
                        req.transaction = transaction;
                        return true;
                    }
                    else {
                        throw new Error('Transaction Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Transaction_1.default.findOne({ _id: id }, { __v: 0 }).then((transaction) => {
                    if (transaction) {
                        req.transaction = transaction;
                        return true;
                    }
                    else {
                        throw new Error('Transaction Does Not Exist');
                    }
                });
            })];
    }
    static redeem() {
        return [
            (0, express_validator_1.body)('coupon', 'coupon Is Required').custom((coupon, { req }) => {
                return Coupon_1.default.findOne({ coupon: coupon, status: true }).then(coupon => {
                    if (coupon) {
                        req.coupon = coupon;
                        return true;
                    }
                    else {
                        throw new Error('Coupon Not Exist / Already redeemed');
                    }
                });
            })
        ];
    }
    static reward() {
        return [
            (0, express_validator_1.body)('user', 'user Is Required').custom((user, { req }) => {
                return User_1.default.findOne({ _id: user, status: true }).then(user => {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error('User Not Exist');
                    }
                });
            }),
            (0, express_validator_1.body)('amount', 'amount Is Required')
        ];
    }
    static cash() {
        return [
            (0, express_validator_1.body)('user', 'user Is Required').custom((user, { req }) => {
                return User_1.default.findOne({ _id: user, status: true }).then(user => {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error('User Not Exist');
                    }
                });
            }),
            (0, express_validator_1.body)('amount', 'amount Is Required').custom((amount, { req }) => {
                return User_1.default.findOne({ _id: req.body.user, wallet: { $gte: amount } }).then(user => {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error('Amount greater than wallet');
                    }
                });
            }),
        ];
    }
}
exports.TransactionValidators = TransactionValidators;
