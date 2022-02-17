"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CouponController_1 = require("../controllers/CouponController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utils_1 = require("../utils/Utils");
const CouponValidators_1 = require("./validators/CouponValidators");
class CouponRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/id/:id', CouponValidators_1.CouponValidators.coupon(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, CouponController_1.CouponController.coupon);
        this.router.get('/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, CouponController_1.CouponController.allCoupon);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, CouponController_1.CouponController.allAdminCoupon);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, CouponValidators_1.CouponValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, CouponController_1.CouponController.create);
        this.router.post('/excel', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().excelMulter.single('excel'), GlobalMiddleWare_1.GlobalMiddleWare.checkError, CouponController_1.CouponController.excel);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, CouponValidators_1.CouponValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, CouponController_1.CouponController.update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, CouponValidators_1.CouponValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, CouponController_1.CouponController.delete);
    }
}
exports.default = new CouponRouter().router;
