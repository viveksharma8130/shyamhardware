"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const Coupon_1 = require("../models/Coupon");
const Transaction_1 = require("../models/Transaction");
const User_1 = require("../models/User");
class TransactionController {
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const TransactionId = req.Transaction._id;
            try {
                const transaction = yield Transaction_1.default.findOneAndUpdate({ _id: TransactionId }, req.body, { new: true, useFindAndModify: false })
                    .populate([
                    { path: 'user' },
                    { path: "coupon", select: ['coupon', 'points'] }
                ]);
                res.send(transaction);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static transaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = req.transaction;
            const data = {
                message: 'Success',
                data: transaction
            };
            res.json(data);
        });
    }
    static userTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = req.transaction;
            const data = {
                message: 'Success',
                data: transaction
            };
            res.json(data);
        });
    }
    static TransactionStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = req.transaction;
            const data = {
                message: 'Success',
                data: transaction
            };
            res.json(data);
        });
    }
    static allTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield Transaction_1.default.find({ user: req.user.user_id }, { __v: 0 })
                    .sort({ '_id': -1 })
                    .populate([
                    { path: "coupon", select: ['coupon', 'points'] }
                ]);
                const data = {
                    message: 'Success',
                    data: transaction
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allUserTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield Transaction_1.default.find({ user: req.user._id })
                    .sort({ '_id': -1 })
                    .populate([
                    { path: 'user' },
                    { path: "coupon", select: ['coupon', 'points'] }
                ]);
                const data = {
                    message: 'Success',
                    data: transaction
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allAdminTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield Transaction_1.default.find()
                    .sort({ '_id': -1 })
                    .populate([
                    { path: 'user' },
                    { path: "coupon", select: ['coupon', 'points'] }
                ]);
                const data = {
                    message: 'Success',
                    data: transaction
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = req.transaction;
            try {
                yield transaction.remove();
                res.json({
                    message: 'Success ! Transaction Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static redeem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // wallet transaction create for deposit
                const transaction_data = {
                    user: req.user.user_id,
                    coupon: req.coupon._id,
                    channel: 'redeem',
                    transaction_mode: 'credit',
                    amount: req.coupon.points
                };
                let transaction = yield new Transaction_1.default(transaction_data).save();
                // user wallet update
                const user_wallet = yield User_1.default.findOneAndUpdate({ _id: req.user.user_id }, { $inc: { wallet: req.coupon.points } }, { new: true, useFindAndModify: false });
                // coupon update
                const coupon_update = yield Coupon_1.default.findOneAndUpdate({ _id: req.coupon._id }, { status: false }, { new: true, useFindAndModify: false });
                res.json({
                    message: 'Points redeem to your account successfully',
                    transaction: transaction,
                    user_wallet: user_wallet,
                    coupon_update: coupon_update,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static cash(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // wallet transaction create for deposit
                const transaction_data = {
                    user: req.body.user,
                    channel: 'cash',
                    transaction_mode: 'debit',
                    amount: req.body.amount,
                };
                let transaction = yield new Transaction_1.default(transaction_data).save();
                // user wallet update
                const user_wallet = yield User_1.default.findOneAndUpdate({ _id: req.body.user }, { $inc: { wallet: -req.body.amount } }, { new: true, useFindAndModify: false });
                res.json({
                    message: 'Wallet cash Successfully',
                    transaction: transaction,
                    user_wallet: user_wallet,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static reward(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // wallet transaction create for reward
                const transaction_data = {
                    user: req.body.user,
                    channel: 'reward',
                    transaction_mode: 'credit',
                    amount: req.body.amount,
                };
                let transaction = yield new Transaction_1.default(transaction_data).save();
                // user wallet update
                const user_wallet = yield User_1.default.findOneAndUpdate({ _id: req.body.user }, { $inc: { wallet: req.body.amount } }, { new: true, useFindAndModify: false });
                res.json({
                    message: 'Reward added to wallet Successfully',
                    transaction: transaction,
                    user_wallet: user_wallet,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.TransactionController = TransactionController;
