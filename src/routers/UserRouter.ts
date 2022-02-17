import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { UserValidators } from "./validators/UserValidators";

class UserRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes(); 
        this.deleteRoutes();
    } 

    getRoutes(){
        this.router.get('/login', UserValidators.login(), GlobalMiddleWare.checkError, UserController.login);
        this.router.get('/user_data', GlobalMiddleWare.authenticate, UserController.userData);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, UserController.all);
    }
    postRoutes(){
        // session
        this.router.post('/session', UserValidators.session(), UserController.session);
        this.router.post('/password/forgot', UserValidators.passwordForgot(), GlobalMiddleWare.checkError, UserController.passwordForgot);
        this.router.post('/password/change', GlobalMiddleWare.authenticate, UserValidators.passwordChange(), GlobalMiddleWare.checkError, UserController.passwordChange);
    }
    patchRoutes(){
        this.router.patch('/profile', GlobalMiddleWare.authenticate, GlobalMiddleWare.checkError, UserController.profile);
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, UserValidators.update(), GlobalMiddleWare.checkError, UserController.update);
    }

    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.authenticate, UserValidators.deleteUser(), GlobalMiddleWare.checkError, UserController.deleteUser);
    }
}

export default new UserRouter().router;