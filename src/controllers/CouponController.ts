import Coupon from "../models/Coupon";
import { Utils } from "../utils/Utils";

export class CouponController {

    static async create(req, res, next){  
        try {

            let Coupon_data:any = await new Coupon(req.body).save();
            res.json({
                message:'Coupon Save Successfully',
                data:Coupon_data,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
    }

    static async excel(req, res, next){  
        const excelData = await Utils.importExcelData2MongoDB(req.file.path);
        await Coupon.insertMany(excelData);
        
        res.json({
            message:'File uploaded/import successfully!',
            file_name: req.file,
            status_code:200
        });
    }

    static async update(req, res, next) {
        const CouponId = req.coupon._id;
        try {
            const coupon = await Coupon.findOneAndUpdate({_id: CouponId}, req.body, {new: true, useFindAndModify: false});
            res.send(coupon);
        } catch (e) {
            next(e);
        }

    }


    static async coupon(req, res, next){
        const coupon = req.coupon;
        const data = {
            message : 'Success',
            data:coupon
        };
        res.json(data);
    }

    static async allCoupon(req, res, next){

        try {
            const coupon = await Coupon.find({status:true}, {__v: 0});
            const data = {
                message : 'Success',
                data:coupon
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allAdminCoupon(req, res, next){

        try {
            const coupon = await Coupon.find();
            const data = {
                message : 'Success',
                data:coupon
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async delete(req, res, next) {
        const Coupon = req.coupon;
        try {
            await Coupon.remove();
            res.json({
                message:'Success ! Coupon Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

} 