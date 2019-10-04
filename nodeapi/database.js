const sqlite3 = require('sqlite3')
const md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.log(err.message)
        throw err
    }

    // console.log('Connected to the SQLite database.')
    db.run(`CREATE TABLE users (
        id          INTEGER PRIMARY KEY         AUTOINCREMENT,
        name        text,
        email       text UNIQUE,
        username    text UNIQUE,
        password    text,
        created_at   datetime                    DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT  email_unique UNIQUE (email),
        CONSTRAINT  username_unique UNIQUE (username)
    )`,
    (err) => {
        if (err) {
            // Table already created
        } else {
            // Table just created, creating some rows
            let insert = 'INSERT INTO users (name, email, username, password) VALUES (?,?,?,?)'
            db.run(insert, ["admin", "admin@example.com", "admin", md5("password123")])
            db.run(insert, ["user", "user@example.com", "user", md5("password123")])
        }
    })
})

module.exports = db
