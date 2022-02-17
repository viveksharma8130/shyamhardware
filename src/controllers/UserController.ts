import * as Jwt from "jsonwebtoken";
import { getEnvironmentVariables } from "../environments/env";
import User from "../models/User";
import { Utils } from "../utils/Utils";
import * as fs from 'fs';
import UserSession from "../models/UserSession";

export class UserController {

    static async session(req, res, next){  

        const firebase_token = req.body.firebase_token;
        const device_detail = req.body.device_detail;
        const device_id = req.body.device_id;

        if(req.action=='save') {

            try {
                const data ={
                    firebase_token : firebase_token,
                    device_detail : device_detail,
                    device_id: device_id
                }

                let userSession:any = await new UserSession(data).save();
                res.json({
                    message:'Session Saved Successfully',
                    data:userSession
                });
            

            } catch (e) {
                next(e)
            }
        
        } else {
            try {
                req.body.updated_at= new Utils().indianTimeZone;

                const userSession:any = await UserSession.findOneAndUpdate({  
                    device_id: device_id 
                },
                req.body,
                {
                    new :true, 
                    useFindAndModify: false
                });  
    
                //res.send(user); 
                res.json({
                    message:'Session Updated Successfully',
                    data:userSession
                });
            

            } catch (e) {
                next(e)
            }
        }
        
    }

    static async login(req, res, next) {
        const password = req.query.password;
        const user = req.user;
        try {
            await Utils.comparePassword({
                plainPassword: password,
                encryptedPassword: user.password
            });
            const token = Jwt.sign({phone: user.phone, user_id: user._id},
                getEnvironmentVariables().jwt_secret, {expiresIn: '120d'});
            const data = {token: token, data: user};
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    
    static async passwordChange(req, res, next) {
        const user_id = req.user.user_id;
        const password = req.body.password;
        const old_password = req.body.old_password;

        const hash = await Utils.encryptPassword(password);
        var update = {...{password:hash}, updated_at: new Utils().indianTimeZone}; 

        try {
            await Utils.comparePassword({
                plainPassword: old_password,
                encryptedPassword: req.user_data.password
            });

            const user = await User.findOneAndUpdate({_id: user_id}, update, {new: true, useFindAndModify: false});
            res.json({
                message:'Password change Successfully',
                data:user,
                status_code:200
            });
        } catch (e) {
            next(e);
        }
 
    }


    static async passwordForgot(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;

        const hash = await Utils.encryptPassword(password);
        var update = {...{password:hash}, updated_at: new Utils().indianTimeZone}; 

        try {
            const user = await User.findOneAndUpdate({email: email}, update, {new: true, useFindAndModify: false});
            res.json({
                message:'Password update Successfully',
                data:user,
                status_code:200
            });
        } catch (e) {
            next(e);
        }
 
    }

    static async userData(req, res, next){
        var userId= req.user.user_id;

        try {
           var users = await User.findById({_id:userId}, {__v: 0});

            const data = {
                message : 'Success',
                data:users
            };
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async all(req, res, next){

        try {
            const category = await User.find();
            const data = {
                message : 'Success',
                data:category
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async profile(req, res, next) {
        const userId = req.user.user_id;
        try {
            var update = {...req.body, ...{verified_profile:true}, updated_at: new Utils().indianTimeZone}; 

            const user = await User.findOneAndUpdate({_id: userId}, update, {new: true, useFindAndModify: false});
            res.json({
                message:'user update Successfully',
                data:user,
                status_code:200
            });
        } catch (e) {
            next(e);
        }
 
    }

    static async update(req, res, next) {
        const userId = req.user._id;
        try {
            const user = await User.findOneAndUpdate({_id: userId}, req.body, {new: true, useFindAndModify: false});
            res.send(user);
        } catch (e) {
            next(e);
        }

    }

    static async deleteUser(req, res, next) {
        const user = req.user;
        try {
            // await fs.unlink(user['image'], async (err) => {
            //     if (err) throw err;
            // });
            await user.remove();
            res.json({
                message:'Success ! User Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }


} 