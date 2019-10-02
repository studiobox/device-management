const express = require('express')
const bodyParser = require('body-parser')

const userRoute = require('./api/routes/users')
const subscriptionsRoute = require('./api/routes/subscriptions')
const devicesRoute = require('./api/routes/devices')

const app = express();

PORT = process.env.PORT || 3000;

// Parse application/json
app.use(bodyParser.json())

//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Requested-With, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    next()
})

// Add a basic route
app.get('/', function(req, res, next) {
    res.json({
        message: 'Express API is Up and Running!'
    })
})

app.use('/api/users', userRoute)
app.use('/api/subscriptions', subscriptionsRoute)
app.use('/api/devices', devicesRoute)

app.use(function(req, res) {
    res.status(404);
})

// Start the app
app.listen(PORT, function() {
    console.info(`Express is running on port: ${PORT}`)
})