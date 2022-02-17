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
exports.AdminController = void 0;
const Jwt = require("jsonwebtoken");
const env_1 = require("../environments/env");
const Admin_1 = require("../models/Admin");
const User_1 = require("../models/User");
const Utils_1 = require("../utils/Utils");
class AdminController {
    static signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const phone = req.body.phone;
            const email = req.body.email;
            const name = req.body.name;
            const password = req.body.password;
            const hash = yield Utils_1.Utils.encryptPassword(password);
            try {
                const data = {
                    email: email,
                    password: hash,
                    name: name,
                    phone: phone,
                    created_at: new Utils_1.Utils().indianTimeZone,
                    updated_at: new Utils_1.Utils().indianTimeZone
                };
                let admin = yield new Admin_1.default(data).save();
                if (admin) {
                    const para = {
                        admin_id: admin._id,
                        email: email
                    };
                    const token = Jwt.sign(para, (0, env_1.getEnvironmentVariables)().jwt_secret, { expiresIn: '120d' });
                    const data = {
                        message: 'Success',
                        token: token,
                        data: admin
                    };
                    res.json(data);
                }
                else {
                    throw new Error('Something Went Wrong');
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const phone = req.body.phone;
            const email = req.body.email;
            const name = req.body.name;
            const password = req.body.password;
            const hash = yield Utils_1.Utils.encryptPassword(password);
            try {
                const data = {
                    email: email,
                    password: hash,
                    name: name,
                    phone: phone,
                    created_at: new Utils_1.Utils().indianTimeZone,
                    updated_at: new Utils_1.Utils().indianTimeZone
                };
                let user = yield new User_1.default(data).save();
                if (user) {
                    const data = {
                        message: 'User Created Successfully',
                        data: user
                    };
                    res.json(data);
                }
                else {
                    throw new Error('Something Went Wrong');
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = req.query.password;
            const admin = req.admin;
            try {
                yield Utils_1.Utils.comparePassword({
                    plainPassword: password,
                    encryptedPassword: admin.password
                });
                const token = Jwt.sign({ email: admin.email, admin_id: admin._id }, (0, env_1.getEnvironmentVariables)().jwt_secret, { expiresIn: '120d' });
                const data = { token: token, data: admin };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminId = req.admin.admin_id;
            let fileObject = {};
            if (req.files.profile_pic) {
                const profile_picUrl = req.files.profile_pic[0].path.replace(/\\/g, "/");
                fileObject.profile_pic = profile_picUrl;
            }
            var update = Object.assign(Object.assign({ name: req.body.name }, fileObject), { updated_at: new Date() });
            //res.send(req.body);
            try {
                const admin = yield Admin_1.default.findOneAndUpdate({ _id: adminId }, update, { new: true, useFindAndModify: false });
                res.send(admin);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static data(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var adminId = req.admin.admin_id;
            try {
                var admin = yield Admin_1.default.findById({ _id: adminId }, { __v: 0 });
                const data = {
                    message: 'Success',
                    admin: admin
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static userData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = req.user;
            const data = {
                message: 'Success',
                data: user
            };
            res.json(data);
        });
    }
    static all(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield Admin_1.default.find({});
                const data = {
                    message: 'Success !',
                    Admin: admin
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.AdminController = AdminController;
