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
exports.Utils = void 0;
const moment = require("moment-timezone");
const Bcrypt = require("bcrypt");
const multer = require("multer");
const excelToJson = require("convert-excel-to-json");
const fs = require("fs");
// excel upload
const excelStorageOptions = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/excel');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
    }
});
// push notification options
const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};
class Utils {
    constructor() {
        // upload file to firebase storage
        // public Upload=bucket.upload('');
        this.firebaseMulter = multer({
            storage: multer.memoryStorage()
        });
        // Excel
        this.excelMulter = multer({ storage: excelStorageOptions });
        // OTP VALIDATE TIME 
        this.MAX_TOKEN_TIME = 60000; // In MilliSeconds
        // INDIAN TIMEZONE FOR ALL SCHEMAS
        this.indianTimeZone = moment.tz(Date.now(), "Asia/Kolkata").add(5, 'hours').add(30, 'minute');
    }
    static indianTimeZone() {
        return moment.tz(Date.now(), "Asia/Kolkata").add(5, 'hours').add(30, 'minute'); //.format('YYYY-MM-DD hh:mm:ss')
    }
    // IMPORT EXCEL TO MONGODB
    static importExcelData2MongoDB(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const excelData = yield excelToJson({
                sourceFile: filePath,
                sheets: [{
                        name: 'Sheet1',
                        header: {
                            rows: 1
                        },
                        columnToKey: {
                            '*': '{{columnHeader}}'
                        }
                    }]
            });
            yield fs.unlinkSync(filePath);
            return excelData.Sheet1;
        });
    }
    // GENERATE OTP
    static generateVerificationToken(size = 4) {
        let digits = '0123456789';
        let otp = '';
        for (let i = 0; i < size; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return parseInt(otp);
    }
    static encryptPassword(password) {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(hash);
                }
            });
        });
    }
    static comparePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(((resolve, reject) => {
                Bcrypt.compare(password.plainPassword, password.encryptedPassword, ((err, isSame) => {
                    if (err) {
                        reject(err);
                    }
                    else if (!isSame) {
                        reject(new Error('User Password Does not Match'));
                    }
                    else {
                        resolve(true);
                    }
                }));
            }));
        });
    }
}
exports.Utils = Utils;
