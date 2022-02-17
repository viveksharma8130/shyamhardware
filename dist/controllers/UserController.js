"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const Jwt = require("jsonwebtoken");
const env_1 = require("../environments/env");
const User_1 = require("../models/User");
const Utils_1 = require("../utils/Utils");
const UserSession_1 = require("../models/UserSession");
class UserController {
    static session(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const firebase_token = req.body.firebase_token;
            const device_detail = req.body.device_detail;
            const device_id = req.body.device_id;
            if (req.action == 'save') {
                try {
                    const data = {
                        firebase_token: firebase_token,
                        device_detail: device_detail,
                        device_id: device_id
                    };
                    let userSession = yield new UserSession_1.default(data).save();
                    res.json({
                        message: 'Session Saved Successfully',
                        data: userSession
                    });
                }
                catch (e) {
                    next(e);
                }
            }
            else {
                try {
                    req.body.updated_at = new Utils_1.Utils().indianTimeZone;
                    const userSession = yield UserSession_1.default.findOneAndUpdate({
                        device_id: device_id
                    }, req.body, {
                        new: true,
                        useFindAndModify: false
                    });
                    //res.send(user); 
                    res.json({
                        message: 'Session Updated Successfully',
                        data: userSession
                    });
                }
                catch (e) {
                    next(e);
                }
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = req.query.password;
            const user = req.user;
            try {
                yield Utils_1.Utils.comparePassword({
                    plainPassword: password,
                    encryptedPassword: user.password
                });
                const token = Jwt.sign({ phone: user.phone, user_id: user._id }, (0, env_1.getEnvironmentVariables)().jwt_secret, { expiresIn: '120d' });
                const data = { token: token, data: user };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static passwordChange(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user.user_id;
            const password = req.body.password;
            const old_password = req.body.old_password;
            const hash = yield Utils_1.Utils.encryptPassword(password);
            var update = Object.assign({ password: hash }, { updated_at: new Utils_1.Utils().indianTimeZone });
            try {
                yield Utils_1.Utils.comparePassword({
                    plainPassword: old_password,
                    encryptedPassword: req.user_data.password
                });
                const user = yield User_1.default.findOneAndUpdate({ _id: user_id }, update, { new: true, useFindAndModify: false });
                res.json({
                    message: 'Password change Successfully',
                    data: user,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static passwordForgot(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const password = req.body.password;
            const hash = yield Utils_1.Utils.encryptPassword(password);
            var update = Object.assign({ password: hash }, { updated_at: new Utils_1.Utils().indianTimeZone });
            try {
                const user = yield User_1.default.findOneAndUpdate({ email: email }, update, { new: true, useFindAndModify: false });
                res.json({
                    message: 'Password update Successfully',
                    data: user,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static userData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var userId = req.user.user_id;
            try {
                var users = yield User_1.default.findById({ _id: userId }, { __v: 0 });
                const data = {
                    message: 'Success',
                    data: users
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static all(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield User_1.default.find();
                const data = {
                    message: 'Success',
                    data: category
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static profile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.user_id;
            try {
                var update = Object.assign(Object.assign(Object.assign({}, req.body), { verified_profile: true }), { updated_at: new Utils_1.Utils().indianTimeZone });
                const user = yield User_1.default.findOneAndUpdate({ _id: userId }, update, { new: true, useFindAndModify: false });
                res.json({
                    message: 'user update Successfully',
                    data: user,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user._id;
            try {
                const user = yield User_1.default.findOneAndUpdate({ _id: userId }, req.body, { new: true, useFindAndModify: false });
                res.send(user);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            try {
                // await fs.unlink(user['image'], async (err) => {
                //     if (err) throw err;
                // });
                yield user.remove();
                res.json({
                    message: 'Success ! User Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.UserController = UserController;
