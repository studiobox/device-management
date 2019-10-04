const express = require('express')
const fs = require('fs')
const zlib = require('zlib')
const path = require('path')
const crypto = require('crypto')
const router = express.Router()

function getCipherKey(password) {
    return crypto.createHash('sha256').update(password).digest();
}

function encrypt(text, password) {
    const initVect = crypto.randomBytes(16)
    const key = getCipherKey(password)

    const cipher = crypto.createCipheriv('aes256', key, initVect)
    const cipherText = cipher.update(text)

    return initVect + cipherText
}

// GET ALL DEVICES
router.get('/', (req, res, next) => {
    // const fileContents = fs.readFileSync('file.txt')
    const passPhrase = 'superPassword';
    // const hash = crypto.createHash('sha256')
    // hash.update('superPassword')
    // const KEY = hash.digest();
    // const KEY = getCipherKey(passPhrase);
    // console.log('KEY: ', KEY)

    const randStr = 'asdfsdfsadfgsgdfsgfasdfgasdfsdafsdafgsdfsdf'
    const readStream = fs.createReadStream(path.join(__dirname, 'file.txt'))
    const gzipStream = zlib.createGzip()
    const writeStream = fs.createWriteStream(path.join(__dirname, 'newfile.txt'))

    readStream.pipe(gzipStream).pipe(writeStream)

    const newData = encrypt(randStr, passPhrase)
    res.status(200).json({
        "status": "OK",
        "data": newData
    })

    // writeStream.write(randStr);
    // console.log(fileContents)
    // res.status(200).json({
    //     "status": "OK",
    //     "data": "Some Data..."
    // })
})

module.exports = router