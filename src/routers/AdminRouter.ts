import { Router } from "express";
import { AdminController } from "../controllers/AdminController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { AdminValidators } from "./validators/AdminValidators";

class AdminRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    } 

    getRoutes(){
        this.router.get('/data', GlobalMiddleWare.adminAuthenticate, AdminController.data);
        this.router.get('/user/data/:id', GlobalMiddleWare.adminAuthenticate, AdminValidators.userData(), AdminController.data);
        this.router.get('/all', GlobalMiddleWare.adminAuthenticate, AdminController.all);
        this.router.get('/login', AdminValidators.login(), GlobalMiddleWare.checkError, AdminController.login);
    }
    postRoutes(){
        this.router.post('/signup', AdminValidators.signup(), GlobalMiddleWare.checkError, AdminController.signup);
        this.router.post('/user/create', GlobalMiddleWare.adminAuthenticate, AdminValidators.create(), GlobalMiddleWare.checkError, AdminController.create);
    }
    patchRoutes(){
        this.router.patch('/update', GlobalMiddleWare.adminAuthenticate, AdminController.update);
    }
    deleteRoutes(){
    }
}

export default new AdminRouter().router;