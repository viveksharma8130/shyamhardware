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
exports.CouponController = void 0;
const Coupon_1 = require("../models/Coupon");
const Utils_1 = require("../utils/Utils");
class CouponController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let Coupon_data = yield new Coupon_1.default(req.body).save();
                res.json({
                    message: 'Coupon Save Successfully',
                    data: Coupon_data,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static excel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const excelData = yield Utils_1.Utils.importExcelData2MongoDB(req.file.path);
            yield Coupon_1.default.insertMany(excelData);
            res.json({
                message: 'File uploaded/import successfully!',
                file_name: req.file,
                status_code: 200
            });
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const CouponId = req.coupon._id;
            try {
                const coupon = yield Coupon_1.default.findOneAndUpdate({ _id: CouponId }, req.body, { new: true, useFindAndModify: false });
                res.send(coupon);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static coupon(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const coupon = req.coupon;
            const data = {
                message: 'Success',
                data: coupon
            };
            res.json(data);
        });
    }
    static allCoupon(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coupon = yield Coupon_1.default.find({ status: true }, { __v: 0 });
                const data = {
                    message: 'Success',
                    data: coupon
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allAdminCoupon(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coupon = yield Coupon_1.default.find();
                const data = {
                    message: 'Success',
                    data: coupon
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
            const Coupon = req.coupon;
            try {
                yield Coupon.remove();
                res.json({
                    message: 'Success ! Coupon Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.CouponController = CouponController;
