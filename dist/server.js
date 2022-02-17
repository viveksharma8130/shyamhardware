"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const env_1 = require("./environments/env");
const AdminRouter_1 = require("./routers/AdminRouter");
const UserRouter_1 = require("./routers/UserRouter");
const CouponRouter_1 = require("./routers/CouponRouter");
const TransactionRouter_1 = require("./routers/TransactionRouter");
class Server {
    constructor() {
        this.app = express();
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }
    setConfigurations() {
        this.connectMongodb();
        this.configureBodyParser();
    }
    connectMongodb() {
        const databaseUrl = (0, env_1.getEnvironmentVariables)().db_url;
        mongoose.connect(databaseUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => {
            console.log('mongoDb Connected');
        });
    }
    configureBodyParser() {
        this.app.use(express.json({ limit: '1000mb' }));
        this.app.use(express.urlencoded({ limit: '1000mb', extended: true, parameterLimit: 1000000 }));
    }
    setRoutes() {
        this.app.use(cors());
        this.app.use('/api/src/uploads', express.static('src/uploads'));
        this.app.use('/api/admin', AdminRouter_1.default);
        this.app.use('/api/user', UserRouter_1.default);
        this.app.use('/api/coupon', CouponRouter_1.default);
        this.app.use('/api/transaction', TransactionRouter_1.default);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(200).json({
                message: 'Not Found !' + (0, env_1.getEnvironmentVariables)().jwt_secret,
                status_code: 404
            });
        });
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(200).json({
                message: error.message || 'Something Went Wrong. Please Try Again',
                status_code: errorStatus
            });
        });
    }
}
exports.Server = Server;
