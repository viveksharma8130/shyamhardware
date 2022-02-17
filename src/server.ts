import * as  express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import { getEnvironmentVariables } from './environments/env';
import AdminRouter from './routers/AdminRouter';
import UserRouter from './routers/UserRouter';
import CouponRouter from './routers/CouponRouter';
import TransactionRouter from './routers/TransactionRouter';
export class Server {
    public app: express.Application = express();

    constructor() {
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }

    setConfigurations(){
        this.connectMongodb();
        this.configureBodyParser();
    }

    connectMongodb(){
        const databaseUrl = getEnvironmentVariables().db_url;
        mongoose.connect(databaseUrl, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true}).then(()=>{
            console.log('mongoDb Connected');
        });
    }

    configureBodyParser(){
        this.app.use(express.json({limit: '1000mb'}));
        this.app.use(express.urlencoded({limit: '1000mb', extended: true, parameterLimit: 1000000 }));
    }

    setRoutes(){
        this.app.use(cors());
        this.app.use('/api/src/uploads', express.static('src/uploads'));
        this.app.use('/api/admin', AdminRouter);
        this.app.use('/api/user', UserRouter);
        this.app.use('/api/coupon', CouponRouter);
        this.app.use('/api/transaction', TransactionRouter);
        
    }

    error404Handler(){
        this.app.use((req,res)=>{
            res.status(200).json({      // By Default 200 else 404
                message:'Not Found !'+ getEnvironmentVariables().jwt_secret,
                status_code:404
            });
        }) 
    }

    handleErrors(){
        this.app.use((error, req, res, next)=>{
            const errorStatus = req.errorStatus || 500;
            res.status(200).json({                  // By Default 200 else errorStatus
                message: error.message || 'Something Went Wrong. Please Try Again',
                status_code:errorStatus
            });
        })
    }

}