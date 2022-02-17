"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidators = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("../../models/User");
const UserSession_1 = require("../../models/UserSession");
class UserValidators {
    static session() {
        return [
            (0, express_validator_1.body)('firebase_token', 'firebase_token is Required').isString(),
            (0, express_validator_1.body)('device_detail', 'device_detail is Required').isString(),
            (0, express_validator_1.body)('device_id', 'device_id Is Required').isString().custom((device_id, { req }) => {
                return UserSession_1.default.findOne({ device_id: device_id }).then(userSession => {
                    if (userSession) {
                        req.action = 'update';
                        return true;
                    }
                    else {
                        req.action = 'save';
                        return true;
                    }
                });
            })
        ];
    }
    static login() {
        return [(0, express_validator_1.query)('phone', 'phone is Required').isNumeric()
                .custom((phone, { req }) => {
                return User_1.default.findOne({ phone: phone }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('User Does Not Exist');
                    }
                });
            }), (0, express_validator_1.query)('password', 'Password is Required').isString()];
    }
    static passwordForgot() {
        return [
            (0, express_validator_1.body)('password', 'Alphanumeric password is Required').isAlphanumeric(),
            (0, express_validator_1.body)('phone', 'phone Is Required').isNumeric().custom((phone, { req }) => {
                return User_1.default.findOne({ phone: phone }).then(user => {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error('User Not Exist');
                    }
                });
            }),
        ];
    }
    static passwordChange() {
        return [
            (0, express_validator_1.body)('password', 'Alphanumeric password is Required').isString(),
            (0, express_validator_1.body)('old_password', 'Old password is Required').isString().custom((old_password, { req }) => {
                return User_1.default.findOne({ _id: req.user.user_id }).then(user => {
                    if (user) {
                        req.user_data = user;
                        return true;
                    }
                    else {
                        throw new Error('User Not Exist');
                    }
                });
            }),
        ];
    }
    static deleteUser() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return User_1.default.findOne({ _id: id }, { __v: 0 }).then((user) => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('user Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return User_1.default.findOne({ _id: id }, { __v: 0 }).then((user) => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('User Does Not Exist');
                    }
                });
            })];
    }
}
exports.UserValidators = UserValidators;
