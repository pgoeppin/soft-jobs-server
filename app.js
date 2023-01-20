const app = require('./server')

app.use('/', require('./src/routes/userRoutes'))

module.exports = app