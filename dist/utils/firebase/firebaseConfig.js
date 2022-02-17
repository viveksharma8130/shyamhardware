"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "swmg-36aa8.appspot.com/images", // gs://swmg-36aa8.appspot.com/images
});
exports.default = admin;
