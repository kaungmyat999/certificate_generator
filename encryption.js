require('dotenv').config();

let KEY = (process.env.KEY || "KEY");
let CryptoJS = require("crypto-js");



function encrypt(input_Text) {
    let res = CryptoJS.AES.encrypt(input_Text,KEY).toString()
    return res;
}

function decrypt(input_Cipher) {
    return CryptoJS.AES.decrypt(input_Cipher,KEY).toString(CryptoJS.enc.Utf8);
}

module.exports = {encrypt,decrypt}