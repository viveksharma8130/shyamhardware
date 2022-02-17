import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const adminSchema = new mongoose.Schema({
    phone                    : {type: String, required: true},
    email                    : {type: String, required: true},
    name                     : {type: String, required: true},
    password                 : {type: String, required: true},
    status                   : {type: Boolean, required: true, default: true},
    created_at               : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at               : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

export default model('admin', adminSchema);

// Admin Should only be created by manually