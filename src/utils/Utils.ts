import * as moment from 'moment-timezone';
import * as Bcrypt from 'bcrypt';
import * as multer from "multer";

import excelToJson = require("convert-excel-to-json");
import * as fs from 'fs';

// excel upload
const excelStorageOptions=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/excel')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});

// push notification options
const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

export class Utils{

    // upload file to firebase storage
    // public Upload=bucket.upload('');
    public firebaseMulter = multer({
        storage: multer.memoryStorage()
    });

    // Excel
    public excelMulter = multer({storage:excelStorageOptions});


    // OTP VALIDATE TIME 
    public MAX_TOKEN_TIME=60000; // In MilliSeconds

    // INDIAN TIMEZONE FOR ALL SCHEMAS
    public indianTimeZone = moment.tz(Date.now(), "Asia/Kolkata").add(5, 'hours').add(30, 'minute');

    static indianTimeZone(){
        return moment.tz(Date.now(), "Asia/Kolkata").add(5, 'hours').add(30, 'minute');//.format('YYYY-MM-DD hh:mm:ss')
    }

    

    // IMPORT EXCEL TO MONGODB
    static async importExcelData2MongoDB(filePath){
        const excelData = await excelToJson({
            sourceFile: filePath,
            sheets:[{
                name: 'Sheet1',
                header:{
                   rows: 1
                },
                columnToKey: {
                    '*': '{{columnHeader}}'
                }
            }]
        });
        await fs.unlinkSync(filePath);
        return excelData.Sheet1;
    }

    // GENERATE OTP
    static generateVerificationToken(size: number=4){
        let digits='0123456789';
        let otp='';
        for(let i=0;i<size;i++){
            otp+=digits[Math.floor(Math.random()*10)];
        }
        return parseInt(otp);
    }

    static encryptPassword(password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            })
        })
    }

    static async comparePassword(password: { plainPassword: string, encryptedPassword: string }): Promise<any> {
        return new Promise(((resolve, reject) => {
            Bcrypt.compare(password.plainPassword, password.encryptedPassword, ((err, isSame) => {
                if (err) {
                    reject(err);
                } else if (!isSame) {
                    reject(new Error('User Password Does not Match'));
                } else {
                    resolve(true);
                }
            }))
        }))
    }

}
