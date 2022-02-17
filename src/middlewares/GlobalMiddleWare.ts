import { validationResult } from "express-validator";
import * as Jwt from "jsonwebtoken";
import { getEnvironmentVariables } from "../environments/env";
import Admin from "../models/Admin";
import User from "../models/User";

export class GlobalMiddleWare{
    static checkError(req,res,next){
        const error = validationResult(req);
        const errorStatus = req.errorStatus || 400;
        
        if (!error.isEmpty()){
            req.errorStatus = errorStatus;
            next(new Error(error.array()[0].msg));
        }else{
            next();
        }
    }

    // only for login
    static async authenticate(req, res, next) {
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader.slice(7, authHeader.length) : null;
        try {
            Jwt.verify(token, getEnvironmentVariables().jwt_secret, (async (err, decoded) => {
                if (err) {
                    req.errorStatus = 401;
                    next(err);
                } else if (!decoded) {
                    req.errorStatus = 401;
                    next(new Error('User Not Authorised'))
                } else {
                    let cstatus= await User.findOne({_id: decoded.user_id}, {__v: 0});
                    if(cstatus['status']==true){
                        req.user = decoded;
                        next();
                    }else{
                        req.errorStatus = 401;
                        next(new Error('User Blocked'))
                    }
                    
                }
            }))
        } catch (e) {
            req.errorStatus = 401;
            next(e);
        }
    }

    // for both - login or not
    static async loginAuthenticate(req, res, next) {
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader.slice(7, authHeader.length) : null;
        try {
            Jwt.verify(token, getEnvironmentVariables().jwt_secret, (async (err, decoded) => {
                if (err) {
                    next();
                } else if (!decoded) {
                    next();
                } else {
                    let cstatus= await User.findOne({_id: decoded.user_id}, {__v: 0});
                    if(cstatus['status']==true){
                        req.user = decoded;
                        next();
                    }else{
                        req.errorStatus = 401;
                        next(new Error('User Blocked'))
                    }
                    
                }
            }))
        } catch (e) {
            req.errorStatus = 401;
            next(e);
        }
    }

    // for admin
    static async adminAuthenticate(req, res, next) {
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader.slice(7, authHeader.length) : null;
        try {
            Jwt.verify(token, getEnvironmentVariables().jwt_secret, (async (err, decoded) => {
                if (err) {
                    req.errorStatus = 401;
                    next(err);
                } else if (!decoded.admin_id) {
                    req.errorStatus = 401;
                    next(new Error('Admin Not Authorised'))
                } else {
                    req.admin = decoded;
                    next();
                }
            }))
        } catch (e) {
            req.errorStatus = 401;
            next(e);
        }
    }

    static async databaseAuthenticate(req, res, next) {
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader.slice(7, authHeader.length) : null;
        try {
            Jwt.verify(token, getEnvironmentVariables().jwt_secret, ((err, decoded) => {
                if (err) {
                    req.errorStatus = 401;
                    next(err);
                } else if (!decoded) {
                    req.errorStatus = 401;
                    next(new Error('User Not Authorised'))
                } else {
                    if(decoded.user_id=="600968439d528a9f57d4d2f4"){
                        req.user = decoded;
                        next();
                    }else{
                        req.errorStatus = 401;
                        next(new Error('Admin Not Authorised'))
                    }
                    
                }
            }))
        } catch (e) {
            req.errorStatus = 401;
            next(e);
        }
    }

}