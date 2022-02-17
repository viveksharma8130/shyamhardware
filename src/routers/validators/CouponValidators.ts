import { body, param, query } from "express-validator";
import Coupon from "../../models/Coupon";

export class CouponValidators{

    static create(){

        return  [ 
    
                    body('coupon', 'coupon is Required').isString(),
                    body('points', 'points is Required').isNumeric(),
    
                ];
        
    }

    static coupon() {
        return [param('id').custom((id, {req}) => {
            return Coupon.findOne({_id: id}, {__v: 0}).then((coupon) => {
                if (coupon) {
                    req.coupon = coupon;
                    return true;
                } else {
                    throw new Error('Coupon Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return Coupon.findOne({_id: id}, {__v: 0}).then((coupon) => {
                if (coupon) {
                    req.coupon = coupon;
                    return true;
                } else {
                    throw new Error('Coupon Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return Coupon.findOne({_id: id}, {__v: 0}).then((coupon) => {
                if (coupon) {
                    req.coupon = coupon;
                    return true;
                } else {
                    throw new Error('Coupon Does Not Exist');
                }
            })
        })]
    }


}