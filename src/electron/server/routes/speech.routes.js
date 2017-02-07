const speechRoutes = require('express').Router()

// const Database = require('../database/database')
const TTSService = require('../services/tts.service')
const accessKey = require('../load').accessTokenAPI()
const responses = require('../common/responses')
let SpeechTable = require('../database/tables/speech.table')
    SpeechTable = new SpeechTable()
const Speech = require('../database/models/speech.model')
const SpeechConverter = require('../dto/converters/speech.converter')
const Tools = require('../common/tools')

/**
 * Get all speeches
 */
speechRoutes.get('/', (req, res, next) => {
    SpeechTable.findAll().then((data) => {
        data.map((s) => {
            s = SpeechConverter.toDTO(s)
        })

        res.status(200)
            .type('json')
            .end(JSON.stringify(data));
    })
})

/**
 * Get speech
 */
speechRoutes.get('/:id', (req, res, next) => {
    let id = req.params.id || null

    if (id !== null) {
        SpeechTable.find(id).then((data) => {
            data = SpeechConverter.toDTO(data)

            res.status(200)
                .type('json')
                .end(JSON.stringify(data));
        })
    }
    else {
        res.status(400).end(new responses.ResponseError('Invalid request, params are empty'));
    }
})

/**
 * Add speech
 */
speechRoutes.post('/', (req, res, next) => {
    let speech = req.body.speech || null

    if (speech !== null) {
        let model = SpeechConverter.toEntity(speech)

        SpeechTable.add(model).then((data) => {
            data = SpeechConverter.toDTO(data)

            res.status(200)
                .type('json')
                .end(JSON.stringify(data));
        })
    }
    else {
        res.status(400).end(new responses.ResponseError('Invalid request, body is empty'));
    }
})

/**
 * Update speech
 */
speechRoutes.put('/', (req, res, next) => {
    let speech = req.body.speech || null

    if (speech !== null) {
        let model = SpeechConverter.toEntity(speech)

        SpeechTable.add(model).then((data) => {
            data = SpeechConverter.toDTO(data)

            res.status(200)
                .type('json')
                .end(JSON.stringify(data));
        })
    }
    else {
        res.status(400).end(new responses.ResponseError('Invalid request, body is empty'));
    }
})

/**
 * Delete speech
 */
speechRoutes.delete('/:id', (req, res, next) => {
    let id = req.params.id || null

    if (id !== null) {
        SpeechTable.delete(id).then((result) => {
            res.status(200)
                .type('json')
                .end(JSON.stringify(result));
        })
    }
    else {
        res.status(400).end(new responses.ResponseError('Invalid request, params are empty'));
    }
})

/**
 * Call this route only when you want to use the Microsoft TTS API, if the text to
 * synthetize exist into the database, we'll return it
 */
speechRoutes.post('/cognitive-api', (req, res, next) => {
    let text = req.body.text || null
    if (text !== null) {
        // Check if the speech exist into the db
        SpeechTable.search({
            selector: {
                textBase64: Tools.toBase64(text)
            }
        }).then((data) => {
            if (data.success) {
                // If exist, return it
                if (data.result.length > 0) {
                    let result = SpeechConverter.toDTO(data.result[0])
                    res.status(200)
                        .type('json')
                        .end(JSON.stringify(new responses.Response(result)));
                }
                else {
                    // Else, use TTS API
                    let ttsService = new TTSService(accessKey)
                    // ttsService.setSubscriptionKey(accessKey)
                    // ttsService.refreshAccessToken()
                    ttsService.textToSpeech(text, (result) => {
                        
                        if (result.success) {
                            // Add the audio encoded in Base64 into the database
                            let audio = result.result

                            let model = new Speech()
                            model.text = text
                            model.textBase64 = Tools.toBase64(text)
                            model.audio = audio

                            // Add the model
                            SpeechTable.add(model).then((addResponse) => {
                                // Find the model added and return it
                                SpeechTable.find(addResponse.result.id).then((findResponse) => {
                                    res.status(200)
                                        .type('json')
                                        .end(JSON.stringify(findResponse))
                                })
                            })
                        }
                    })
                }
            }
            else {
                // TODO - See later, I don't know what to do now
            }
        })
    }
    else {
        res.status(400).end(new responses.ResponseError('Invalid request, body is empty'));
    }
})

module.exports = speechRoutes