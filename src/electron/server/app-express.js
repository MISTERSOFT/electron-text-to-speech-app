module.exports = () => {
    const express = require('express')
    const server = express()
    const bodyParser = require('body-parser')

    // my files
    const SpeechService = require('./speechService.js')
    const accessKey = require('./load.js').accessTokenAPI()

    server.use(bodyParser.urlencoded({extended: true}))
    server.use(bodyParser.json())
    server.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next()
    })

    server.post('/speech', (req, res, next) => {
        if (req.body.text && req.body.text !== '') {
            let speechService = new SpeechService()
            speechService.setSubscriptionKey(accessKey)
            speechService.refreshAccessToken()
            speechService.textToSpeech(req.body.text, (result) => {
                res.status(200)
                    .type('json')
                    .end(JSON.stringify(result))
            })
        }
    })

    server.listen(3002, () => {
        console.log('Server is running at http://localhost:3002/')
    })
}

