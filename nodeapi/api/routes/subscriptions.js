const express = require('express')
const db = require('../../database')
const router = express.Router()

const createTable = function() {
    db.run(`CREATE TABLE subscriptions (
        id              INTEGER PRIMARY KEY         AUTOINCREMENT,
        title           INTEGER UNIQUE              NOT NULL,
        created_at      datetime                    DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
        if (err) {
            // Table already created
            // console.log('Subscriptions Error:', err)
            return
    
        }
        console.log('Subscriptions Table create successfully!')
    })
}

createTable();

// GET ALL DEVICES
router.get('/', (req, res, next) => {
    const sql = `SELECT * FROM subscriptions`
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
    const sql = `SELECT * FROM subscriptions WHERE id = ?`
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

// CREATE NEW SUBSCRIPTION
router.post('/', (req, res, next) => {
    let errors = []
    if ( !req.body.title ) {
        errors.push('No title specified')
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
        title: req.body.title
    }
    // var formatted = dt.format('Y-m-d H:M:S');

    const sql = `INSERT INTO subscriptions (title) VALUES (?)`
    const params = [data.title]

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

// UPDATE AN SINGLE SUBSCRIPTION
router.patch('/:id', (req, res, next) => {
    const data = {
        deviceId: req.body.deviceId,
        deviceName: req.body.deviceName ? req.body.deviceName : null
    }

    db.run(
        `UPDATE subscriptions set
            title = COALESCE(?,title)
            WHERE id = ?`,
        [data.title],
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

// DELETE SINGLE SUBSCRIPTION
router.delete('/:id', (req, res, next) => {
    db.run(`DELETE FROM subscriptions WHERE id = ?`,
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
