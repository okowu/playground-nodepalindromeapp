const config = require('./config/config')
const promClient = require('prom-client')
let { register } = require('./app/util/metrics')


// Init the express application
const app = require('./config/express')()

promClient.collectDefaultMetrics({ register });

// Start the app by listening on <port>
app.listen(config.port)

process.on('SIGINT', function () {
    console.log("Gracefully shutting down from SIGINT (Ctrl-C)")
    // some other closing procedures go here
    process.exit(1)
})

// Expose app
exports = module.exports = app

// Logging initialization
console.log('Starting server on port 8080')
