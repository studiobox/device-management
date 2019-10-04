const express = require('express')
const router = express.Router()

router.use('/users', require('./users'))
router.use('/devices', require('./devices'))
router.use('/subscriptions', require('./subscriptions'))
router.use('/sender', require('./sender'))

module.exports = router