import * as Jwt from "jsonwebtoken";
import { getEnvironmentVariables } from "../environments/env";
import Admin from "../models/Admin";
import User from "../models/User";
import { Utils } from "../utils/Utils";

export class AdminController {

    static async signup(req, res, next){
        const phone = req.body.phone;
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;

        const hash = await Utils.encryptPassword(password);

        try {
            
            const data = {
                email: email,
                password: hash,
                name: name,
                phone: phone,
                created_at: new Utils().indianTimeZone,
                updated_at: new Utils().indianTimeZone
            };
            let admin = await new Admin(data).save();
            if(admin){
                const para={
                    admin_id: admin._id,
                    email: email
                };
    
                const token = Jwt.sign(para, getEnvironmentVariables().jwt_secret, {expiresIn:'120d'});
                const data = {
                    message :'Success',
                    token:token,
                    data:admin
                };
                res.json(data);
            }else{
                throw new Error('Something Went Wrong');
            }
        } catch (e) {
            next(e);
        }
        
    }

    static async create(req, res, next){
        const phone = req.body.phone;
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;

        const hash = await Utils.encryptPassword(password);

        try {
            
            const data = {
                email: email,
                password: hash,
                name: name,
                phone: phone,
                created_at: new Utils().indianTimeZone,
                updated_at: new Utils().indianTimeZone
            };
            let user = await new User(data).save();
            if(user){
                const data = {
                    message :'User Created Successfully',
                    data:user
                };
                res.json(data);
            }else{
                throw new Error('Something Went Wrong');
            }
        } catch (e) {
            next(e);
        }
        
    }

    static async login(req, res, next) {
        const password = req.query.password;
        const admin = req.admin;
        try {
            await Utils.comparePassword({
                plainPassword: password,
                encryptedPassword: admin.password
            });
            const token = Jwt.sign({email: admin.email, admin_id: admin._id},
                getEnvironmentVariables().jwt_secret, {expiresIn: '120d'});
            const data = {token: token, data: admin};
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    static async update(req, res, next) {
        const adminId = req.admin.admin_id;

        let fileObject:any = {};
        if(req.files.profile_pic){
            const profile_picUrl:any = req.files.profile_pic[0].path.replace(/\\/g, "/");
            fileObject.profile_pic=profile_picUrl;
        }

        var update = {...{name:req.body.name}, ...fileObject, updated_at: new Date()}; 

        //res.send(req.body);
        try {
            const admin = await Admin.findOneAndUpdate({_id: adminId}, update, {new: true, useFindAndModify: false});
            res.send(admin);
        } catch (e) {
            next(e);
        }

    }

    static async data(req, res, next){
        var adminId= req.admin.admin_id;

        try {
            var admin = await Admin.findById({_id:adminId}, {__v: 0});

            const data = {
                message : 'Success',
                admin:admin
            };

            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async userData(req, res, next){
        var user= req.user;
        const data = {
            message : 'Success',
            data:user
        };
        res.json(data);
    }

    static async all(req, res, next){
        try {
            const admin = await Admin.find({});
            const data = {
                message : 'Success !',
                Admin:admin
            };
            res.json(data);
        } catch (e) {
            next(e)
        }
    }


} 