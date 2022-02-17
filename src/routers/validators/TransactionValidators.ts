import { body, param, query } from "express-validator";
import User from "../../models/User";
import Transaction from "../../models/Transaction";
import Coupon from "../../models/Coupon";

export class TransactionValidators{

    static transaction() {
        return [param('id').custom((id, {req}) => {
            return Transaction.findOne({_id: id, user:req.user.user_id}, {__v: 0})
                        .sort({'_id': -1})
                        .populate([
                            { path: 'user'},
                            { path: "coupon", select:['coupon','points']}
                        ])
                        .then((transaction) => {
                            if (transaction) {
                                req.transaction = transaction;
                                return true;
                            } else {
                                throw new Error('Transaction Does Not Exist');
                            }
                        })
        })]
    }

    static userTransaction() {
        return [param('id').custom((id, {req}) => {
            return Transaction.find({user:id}, {__v: 0})
                        .sort({'_id': -1})
                        .populate([
                            { path: 'user'},
                            { path: "coupon", select:['coupon','points']}
                        ])
                        .then((transaction) => {
                            if (transaction) {
                                req.transaction = transaction;
                                return true;
                            } else {
                                throw new Error('No Transaction Found');
                            }
                        })
        })]
    }

    static allUserTransaction() {
        return [param('id').custom((id, {req}) => {
            return User.findOne({_id: id}, {__v: 0}).then((user) => {
                if (user) {
                    req.user = user;
                    return true;
                } else {
                    throw new Error('user Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return Transaction.findOne({_id: id}, {__v: 0}).then((transaction) => {
                if (transaction) {
                    req.transaction = transaction;
                    return true;
                } else {
                    throw new Error('Transaction Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return Transaction.findOne({_id: id}, {__v: 0}).then((transaction) => {
                if (transaction) {
                    req.transaction = transaction;
                    return true;
                } else {
                    throw new Error('Transaction Does Not Exist');
                }
            })
        })]
    }

    static redeem(){

        return  [ 
                    body('coupon', 'coupon Is Required').custom((coupon, {req})=>{
                        return  Coupon.findOne({coupon:coupon, status:true}).then(coupon => {
                                    if(coupon){
                                        req.coupon=coupon;
                                        return true;
                                    }else{
                                        throw new Error('Coupon Not Exist / Already redeemed');
                                    }
                                })
                    })
                ];
         
    }

    static reward(){

        return  [ 
                    body('user', 'user Is Required').custom((user, {req})=>{
                            return  User.findOne({_id:user,status:true}).then(user => {
                                        if(user){
                                            return true;
                                        }else{
                                            throw new Error('User Not Exist');
                                        }
                                    })
                        }),
                    body('amount', 'amount Is Required')
                ];
         
    }

    static cash(){

        return  [ 
                    body('user', 'user Is Required').custom((user, {req})=>{
                        return  User.findOne({_id:user,status:true}).then(user => {
                                    if(user){
                                        return true;
                                    }else{
                                        throw new Error('User Not Exist');
                                    }
                                })
                    }),
                    body('amount', 'amount Is Required').custom((amount, {req})=>{
                        return  User.findOne({ _id:req.body.user, wallet:{ $gte: amount} }).then(user => {
                                    if(user){
                                        return true;
                                    }else{
                                        throw new Error('Amount greater than wallet');
                                    }
                                })
                    }),
                ];
        
    }


}