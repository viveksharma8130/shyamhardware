"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TransactionController_1 = require("../controllers/TransactionController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const TransactionValidators_1 = require("./validators/TransactionValidators");
class TransactionRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/all', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, TransactionController_1.TransactionController.allTransaction);
        this.router.get('/user/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, TransactionValidators_1.TransactionValidators.userTransaction(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TransactionController_1.TransactionController.userTransaction);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, TransactionController_1.TransactionController.allAdminTransaction);
        this.router.get('/user/all/:id', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, TransactionValidators_1.TransactionValidators.allUserTransaction(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TransactionController_1.TransactionController.allUserTransaction);
        this.router.get('/id/:id', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, TransactionValidators_1.TransactionValidators.transaction(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TransactionController_1.TransactionController.transaction);
    }
    postRoutes() {
        this.router.post('/redeem', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, TransactionValidators_1.TransactionValidators.redeem(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TransactionController_1.TransactionController.redeem);
        this.router.post('/cash', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, TransactionValidators_1.TransactionValidators.cash(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TransactionController_1.TransactionController.cash);
        this.router.post('/reward', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, TransactionValidators_1.TransactionValidators.reward(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TransactionController_1.TransactionController.reward);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, TransactionValidators_1.TransactionValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TransactionController_1.TransactionController.update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, TransactionValidators_1.TransactionValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TransactionController_1.TransactionController.delete);
    }
}
exports.default = new TransactionRouter().router;
