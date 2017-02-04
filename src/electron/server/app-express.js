module.exports = () => {
    const express = require('express')
    const server = express()
    const bodyParser = require('body-parser')

    // Middlewares
    server.use(bodyParser.urlencoded({extended: true}))
    server.use(bodyParser.json())
    server.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next()
    })

    // Routes
    server.use('/speech', require('./routes/speech.routes'))
    server.use('/categorie', require('./routes/categorie.routes'))

    // Start server
    server.listen(3002, () => {
        console.log('Server is running at http://localhost:3002/')
    })
}

