import { Router } from "express";
import { CouponController } from "../controllers/CouponController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { CouponValidators } from "./validators/CouponValidators";

class CouponRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', CouponValidators.coupon(), GlobalMiddleWare.checkError, CouponController.coupon);
        this.router.get('/all', GlobalMiddleWare.adminAuthenticate, CouponController.allCoupon);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, CouponController.allAdminCoupon);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, CouponValidators.create(), GlobalMiddleWare.checkError, CouponController.create);
        this.router.post('/excel', GlobalMiddleWare.adminAuthenticate, new Utils().excelMulter.single('excel'), GlobalMiddleWare.checkError, CouponController.excel);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, CouponValidators.update(), GlobalMiddleWare.checkError, CouponController.update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, CouponValidators.delete(), GlobalMiddleWare.checkError,CouponController.delete)
    }
}

export default new CouponRouter().router;