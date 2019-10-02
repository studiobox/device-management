const express = require('express')
var dateTime = require('node-datetime');
const db = require('../../database')
const router = express.Router()

const createTable = function() {
    db.run(`CREATE TABLE devices (
        id                      INTEGER PRIMARY KEY         AUTOINCREMENT,
        deviceId                INTEGER UNIQUE              NOT NULL,
        deviceName              text,
        registeredDate          datetime                    NOT NULL,
        deviceStatus            INTEGER                     NOT NULL DEFAULT 0,
        subscriptionId          INTEGER,
        subscriptionActivation  datetime,
        created_at              datetime                    DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT              deviceId_unique UNIQUE (deviceId),
        FOREIGN KEY(subscriptionId) REFERENCES subscriptions(id)
    )`,
    (err) => {
        if (err) {
            // Table already created
            // console.log('Devices Error:', err)
            return
        }
        console.log('Devices Table create successfully!')
    })
}

createTable();

// GET ALL DEVICES
router.get('/', (req, res, next) => {
    const sql = `SELECT devices.*, subscriptions.title AS subscriptionTitle FROM devices, subscriptions WHERE devices.subscriptionId = subscriptions.id`
    let params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }

        res.status(200).json({
            "message": "Success",
            "data": rows
        })
    })
})

// GET SINGLE DEVICE BY ID
router.get('/:id', (req, res, next) => {
    const sql = `SELECT * FROM devices WHERE id = ?`
    let params = [req.params.id]

    db.get(sql, params, (err, row) => {
        if ( err ) {
            res.status(400).json({ "error": err.message })
            return
        }

        res.status(200).json({
            "message": "success",
            "data": row
        })
    })
})

// CREATE NEW DEVICE
router.post('/', (req, res, next) => {
    let errors = []
    if ( !req.body.deviceId ) {
        errors.push('No deviceId specified')
    }
    // if ( !req.body.registeredDate ) {
    //     errors.push('No registeredDate specified')
    // }
    if ( errors.length ) {
        res.status(400).json({
            "error": errors.join(',')
        })
        return
    }

    const data = {
        deviceId: req.body.deviceId,
        deviceName: req.body.deviceName ? req.body.deviceName : null,
        registeredDate: dateTime.create().format('Y-m-d H:M:S'),
        subscriptionId: req.body.subscriptionId ? req.body.subscriptionId : null,
        subscriptionActivation: req.body.subscriptionId ? dateTime.create().format('Y-m-d H:M:S') : null
    }
    // var formatted = dt.format('Y-m-d H:M:S');

    const sql = `INSERT INTO devices
        (deviceId, deviceName, registeredDate, subscriptionId, subscriptionActivation) VALUES (?,?,?,?,?)`
    const params = [data.deviceId, data.deviceName, data.registeredDate, data.subscriptionId, data.subscriptionActivation]

    db.run(sql, params, function (err, result) {
        if ( err ) {
            res.status(400).json({"error": err.message})
            return
        }

        res.status(200).json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    })
})

// UPDATE AN SINGLE DEVICE
router.patch('/:id', (req, res, next) => {
    const data = {
        deviceId: req.body.deviceId,
        deviceName: req.body.deviceName ? req.body.deviceName : null,
        subscriptionId: req.body.subscriptionId ? req.body.subscriptionId : null,
        subscriptionActivation: req.body.subscriptionId ? dateTime.create().format('Y-m-d H:M:S') : null
    }

    db.run(
        `UPDATE devices set
            deviceId = COALESCE(?,deviceId),
            deviceName = COALESCE(?,deviceName),
            subscriptionId = COALESCE(?,subscriptionId),
            subscriptionActivation = COALESCE(?,subscriptionActivation)
            WHERE id = ?`,
        [data.deviceId, data.deviceName, data.subscriptionId, data.subscriptionActivation, req.params.id],
        function(err, result) {
            if ( err ) {
                res.status(400).json({ "error": err.message })
                return
            }

            res.status(200).json({
                "message": "success",
                "data": data,
                "changes": this.changes
            })
        }
    )
})

// DELETE SINGLE DEVICE
router.delete('/:id', (req, res, next) => {
    db.run(`DELETE FROM devices WHERE id = ?`,
        req.params.id,
        function(err, result) {
            if (err) {
                res.status(400).json({"error": err.message})
                return
            }

            res.status(200).json({
                "message": "deleted",
                changes: this.changes
            })
    })
})

module.exports = router
