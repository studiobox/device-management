const express = require('express')
const db = require('../../database')
const md5 = require('md5')
const router = express.Router()

// GET ALL USERS
router.get('/', (req, res, next) => {
    const sql = `SELECT * FROM users`
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

// GET SINGLE USER BY ID
router.get('/:id', (req, res, next) => {
    const sql = `SELECT * FROM users WHERE id = ?`
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

// GET ALL USERS
router.post('/login', (req, res, next) => {
    const sql = `SELECT id, name, email, username FROM users WHERE email = '${req.body.email}' AND password = '${md5(req.body.password)}'`
    let params = []
    db.get(sql, params, (err, row) => {
        // console.log('data: ', sql)
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }

        if ( row !== undefined ) {
            res.status(200).json({
                "message": "success",
                "data": row
            })
        } else {
            res.status(200).json({
                "message": "failed",
                "data": "Please check login credentials"
            })
        }
    })
})

// CREATE NEW USER
router.post('/', (req, res, next) => {
    let errors = []
    if ( !req.body.password ) {
        errors.push('No password specified')
    }
    if ( !req.body.email ) {
        errors.push('No email specified')
    }
    if ( !req.body.username ) {
        errors.push('No username specified')
    }
    if ( errors.length ) {
        res.status(400).json({
            "error": errors.join(',')
        })
        return
    }

    const data = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: md5(req.body.password)
    }

    const sql = `INSERT INTO users (name, email, username, password) VALUES (?,?,?,?)`
    const params = [data.name, data.email, data.username, data.password]

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

// UPDATE AN SINGLE USER
router.patch('/:id', (req, res, next) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: (req.body.password && req.body.password !== '') ? md5(req.body.password) : null
    }

    db.run(
        `UPDATE users set
            name = COALESCE(?,name),
            email = COALESCE(?,email),
            username = COALESCE(?,username),
            password = COALESCE(?, password)
            WHERE id = ?`,
        [data.name, data.email, data.username, data.password, req.params.id],
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

// DELETE SINGLE USER
router.delete('/:id', (req, res, next) => {
    db.run(`DELETE FROM users WHERE id = ?`,
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
