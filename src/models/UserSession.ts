import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const userSessionSchema = new mongoose.Schema({
    user_id                  : {type: mongoose.Types.ObjectId, ref: 'users', required: false},
    firebase_token           : {type: String, required: true},
    device_detail            : {type: String, required: true},
    device_id                : {type: String, required: true},
    created_at               : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at               : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

userSessionSchema.set('toObject', { virtuals: true });
userSessionSchema.set('toJSON', { virtuals: true });

export default model('user_sessions', userSessionSchema);

