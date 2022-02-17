import { Router } from "express";
import { TransactionController } from "../controllers/TransactionController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { TransactionValidators } from "./validators/TransactionValidators";

class TransactionRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/all', GlobalMiddleWare.authenticate, TransactionController.allTransaction);
        this.router.get('/user/:id', GlobalMiddleWare.adminAuthenticate, TransactionValidators.userTransaction(), GlobalMiddleWare.checkError, TransactionController.userTransaction);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, TransactionController.allAdminTransaction);
        this.router.get('/user/all/:id', GlobalMiddleWare.authenticate, TransactionValidators.allUserTransaction(), GlobalMiddleWare.checkError, TransactionController.allUserTransaction);
        this.router.get('/id/:id', GlobalMiddleWare.authenticate, TransactionValidators.transaction(), GlobalMiddleWare.checkError, TransactionController.transaction);
        
    }
    postRoutes(){
        this.router.post('/redeem', GlobalMiddleWare.authenticate, TransactionValidators.redeem(), GlobalMiddleWare.checkError, TransactionController.redeem);
        this.router.post('/cash', GlobalMiddleWare.adminAuthenticate, TransactionValidators.cash(), GlobalMiddleWare.checkError, TransactionController.cash);
        this.router.post('/reward', GlobalMiddleWare.adminAuthenticate, TransactionValidators.reward(), GlobalMiddleWare.checkError, TransactionController.reward);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, TransactionValidators.update(), GlobalMiddleWare.checkError, TransactionController.update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, TransactionValidators.delete(), GlobalMiddleWare.checkError,TransactionController.delete)
    }
}

export default new TransactionRouter().router;