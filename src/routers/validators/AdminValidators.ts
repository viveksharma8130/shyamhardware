import { body, param, query } from "express-validator";
import Admin from "../../models/Admin";
import User from "../../models/User";

export class AdminValidators{

    static signup(){

        return  [ 
                    body('name', 'name is Required').isString(),
                    body('password', 'password is Required').isString(),
                    body('email', 'email Is Required').isEmail().custom((email, {req})=>{
                        return  Admin.findOne({email:email}).then(admin => {
                                    if(admin){
                                        throw new Error('Admin Already Exist');
                                    }else{
                                        return true;
                                    }
                                })
                    }),
                    body('phone', 'Phone with numeric value Is Required').isNumeric().isLength({min:10, max:10}).withMessage('Phone must be 10 digit').custom((phone, {req})=>{
                        return  Admin.findOne({phone:phone}).then(admin => {
                                    if(admin){
                                        throw new Error('Admin Already Exist');
                                    }else{
                                        return true;
                                    }
                                })
                    })
    
                ];
        
    }

    static create(){

        return  [ 
                    body('name', 'name is Required').isString(),
                    body('password', 'password is Required').isString(),
                    body('email', 'email Is Required').isEmail().custom((email, {req})=>{
                        return  User.findOne({email:email}).then(user => {
                                    if(user){
                                        throw new Error('User Already Exist');
                                    }else{
                                        return true;
                                    }
                                })
                    }),
                    body('phone', 'Phone with numeric value Is Required').isNumeric().isLength({min:10, max:10}).withMessage('Phone must be 10 digit').custom((phone, {req})=>{
                        return  User.findOne({phone:phone}).then(user => {
                                    if(user){
                                        throw new Error('User Already Exist');
                                    }else{
                                        return true;
                                    }
                                })
                    })
    
                ];
        
    }

    static login() {
        return [query('email', 'Email is Required').isEmail()
            .custom((email, {req}) => {
                return Admin.findOne({email: email}).then(admin => {
                    if (admin) {
                        req.admin = admin;
                        return true;
                    } else {
                        throw  new Error('Admin Does Not Exist');
                    }
                });
            }), query('password', 'Password is Required').isAlphanumeric()]
    }

    static userData() {
        return [param('id').custom((id, {req}) => {
            return User.findOne({_id: id}, {__v: 0}).then((user) => {
                if (user) {
                    req.user = user;
                    return true;
                } else {
                    throw new Error('User Does Not Exist');
                }
            })
        })]
    }


} 