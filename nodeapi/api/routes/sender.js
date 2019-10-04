const express = require('express')
const fs = require('fs')
const crypto = require('crypto')
const path = require('path')
const router = express.Router()

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}
   
function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

// GET ALL DEVICES
router.get('/', (req, res, next) => {
    const data = {
        name: 'Test Name',
        password: 'testPassword'
    };
    var hw = encrypt(JSON.stringify(data))
    // console.log(hw)
    // console.log(decrypt(hw))
    res.status(200).json({
        "status": "OK",
        "key": key,
        "enData": hw,
        "deData": decrypt(hw)
    })
})

module.exports = router