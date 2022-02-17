"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminController_1 = require("../controllers/AdminController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const AdminValidators_1 = require("./validators/AdminValidators");
class AdminRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/data', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, AdminController_1.AdminController.data);
        this.router.get('/user/data/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, AdminValidators_1.AdminValidators.userData(), AdminController_1.AdminController.data);
        this.router.get('/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, AdminController_1.AdminController.all);
        this.router.get('/login', AdminValidators_1.AdminValidators.login(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, AdminController_1.AdminController.login);
    }
    postRoutes() {
        this.router.post('/signup', AdminValidators_1.AdminValidators.signup(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, AdminController_1.AdminController.signup);
        this.router.post('/user/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, AdminValidators_1.AdminValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, AdminController_1.AdminController.create);
    }
    patchRoutes() {
        this.router.patch('/update', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, AdminController_1.AdminController.update);
    }
    deleteRoutes() {
    }
}
exports.default = new AdminRouter().router;
