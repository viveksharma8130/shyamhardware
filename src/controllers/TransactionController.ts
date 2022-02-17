import Coupon from "../models/Coupon";
import Transaction from "../models/Transaction";
import User from "../models/User";

export class TransactionController {

    static async update(req, res, next) {
        const TransactionId = req.Transaction._id;
        try {
            const transaction =await Transaction.findOneAndUpdate({_id: TransactionId}, req.body, {new: true, useFindAndModify: false})
                                    .populate([
                                        { path: 'user'},
                                        { path: "coupon", select:['coupon','points']}
                                    ]);
            res.send(transaction);
        } catch (e) {
            next(e);
        }

    }

    static async transaction(req, res, next){
        const transaction = req.transaction;
        const data = {
            message : 'Success',
            data:transaction
        };
        res.json(data);
    }

    static async userTransaction(req, res, next){
        const transaction = req.transaction;
        const data = {
            message : 'Success',
            data:transaction
        };
        res.json(data);
    }

    static async TransactionStatus(req, res, next){
        const transaction = req.transaction;
        const data = {
            message : 'Success',
            data:transaction
        };
        res.json(data);
    }

    static async allTransaction(req, res, next){

        try {
            const transaction= await Transaction.find({user:req.user.user_id}, {__v: 0})
                                    .sort({'_id': -1})
                                    .populate([
                                        { path: "coupon", select:['coupon','points']}
                                    ]);
            const data = {
                message : 'Success',
                data:transaction
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }
    
    static async allUserTransaction(req, res, next){

        try {
            const transaction = await Transaction.find({user:req.user._id})
                                    .sort({'_id': -1})
                                    .populate([
                                        { path: 'user'},
                                        { path: "coupon", select:['coupon','points']}
                                    ]);
            const data = {
                message : 'Success',
                data:transaction
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }


    static async allAdminTransaction(req, res, next){

        try {
            const transaction = await Transaction.find()
                                    .sort({'_id': -1})
                                    .populate([
                                        { path: 'user'},
                                        { path: "coupon", select:['coupon','points']}
                                    ]);
            const data = {
                message : 'Success',
                data:transaction
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async delete(req, res, next) {
        const transaction = req.transaction;
        try {
            await transaction.remove();
            res.json({
                message:'Success ! Transaction Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

    static async redeem(req, res, next){  

        try {
            // wallet transaction create for deposit
            const transaction_data = {
                user:req.user.user_id,
                coupon:req.coupon._id,
                channel:'redeem',
                transaction_mode:'credit',
                amount:req.coupon.points
            };
            let transaction:any = await new Transaction(transaction_data).save();

            // user wallet update
            const user_wallet = await User.findOneAndUpdate({_id: req.user.user_id}, { $inc: { wallet: req.coupon.points} }, {new: true, useFindAndModify: false});

            // coupon update
            const coupon_update = await Coupon.findOneAndUpdate({_id: req.coupon._id}, {status: false}, {new: true, useFindAndModify: false});

            res.json({ 
                message:'Points redeem to your account successfully',
                transaction:transaction,
                user_wallet:user_wallet,
                coupon_update:coupon_update,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
    }

    static async cash(req, res, next){  

        try {
            // wallet transaction create for deposit
            const transaction_data = {
                user:req.body.user,
                channel:'cash',
                transaction_mode:'debit',
                amount:req.body.amount,
            };
            let transaction:any = await new Transaction(transaction_data).save();

            // user wallet update
            const user_wallet = await User.findOneAndUpdate({_id: req.body.user}, { $inc: { wallet: -req.body.amount} }, {new: true, useFindAndModify: false});

            res.json({ 
                message:'Wallet cash Successfully',
                transaction:transaction,
                user_wallet:user_wallet,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
    }

    static async reward(req, res, next){  

        try {
            // wallet transaction create for reward
            const transaction_data = {
                user:req.body.user,
                channel:'reward',
                transaction_mode:'credit',
                amount:req.body.amount,
            };
            let transaction:any = await new Transaction(transaction_data).save();

            // user wallet update
            const user_wallet = await User.findOneAndUpdate({_id: req.body.user}, { $inc: { wallet: req.body.amount} }, {new: true, useFindAndModify: false});

            res.json({ 
                message:'Reward added to wallet Successfully',
                transaction:transaction,
                user_wallet:user_wallet,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
    }

} 