const request = require('request')
const util = require('util')
const fs = require('fs')
const streamBuffers = require("stream-buffers")

const responses = require('../common/responses')

module.exports = class TTSService {

    // Note: Error 403 - Need to regenerate token JWT

    constructor(subscriptionKey) {
        this.accessToken = null,
        this.textToSynthesized = '',
        this.API = {
            token: {
                url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
                headers: {
                    'Ocp-Apim-Subscription-Key': subscriptionKey
                }
            },
            client: {
                url: 'https://speech.platform.bing.com/synthesize',
                headers: {
                    'Authorization': null,
                    'Content-Type': 'application/ssml+xml',
                    'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3',
                    'X-Search-AppId': '74D573BF42D042E1A194B3EA2BCFA07C', // Random GUID generated, just for this app
                    'X-Search-ClientID': '4E500D1AA9F6462499208146917D7676', // Random GUID generated, just for this app
                    'User-Agent': 'electron-text-to-speech-app'
                    // 'Content-Length': 0
                }
            }
        }
        this.ssmlTemplate = `<speak version="1.0" xml:lang="fr-FR"><voice xml:lang="fr-FR" xml:gender="Male" name="Microsoft Server Speech Text to Speech Voice (fr-FR, Paul, Apollo)">%s</voice></speak>`
    }

    // TODO - Delete this later
    setSubscriptionKey(key) {
        this.API.token.headers['Ocp-Apim-Subscription-Key'] = key
    }

    // TODO - call refreshAccessToken every 9min to refresh token , use setTimeout

    setAuthBearer(token) {
        this.accessToken = token
        this.API.client.headers.Authorization = 'Bearer ' + token
    }

    refreshAccessToken() {
        request.post({
            url: this.API.token.url,
            headers: this.API.token.headers
        }, (err, response, body) => {
            if (err) {
                console.log('Error - [refreshAccessToken]', err)
            }

            if (response.statusCode === 200) {
                this.setAuthBearer(body)
            }
            else {
                throw new Error(response.statusMessage)
            }
        })
    }

    textToSpeech(textToSynthesized, callback) {
        this.textToSynthesized = textToSynthesized

        let _body = util.format(this.ssmlTemplate, textToSynthesized)
        
        let wStreamBuff = new streamBuffers.WritableStreamBuffer({
            initialSize: (100 * 1024),      // start as 100 kilobytes
            incrementAmount: (10 * 1024)    // grow by 10 kilobytes each time buffer overflows
        })

        request.post({
            url: this.API.client.url,
            headers: this.API.client.headers,
            qs: {
                'VoiceType': 'Male',
                'VoiceName': 'Microsoft Server Speech Text to Speech Voice (fr-FR, Paul, Apollo)',
                'Locale': 'fr-FR',
                'OutputFormat': 'Audio16khz32kbitrateMonoMp3',
                'AuthorizationToken': this.accessToken,
                'Text': textToSynthesized
            },
            body: _body
        }, (err, response, streamAudio) => {
            if (err) {
                console.log('Error - [textToSpeech]', err)
            }

            if (response.statusCode === 200) {
                // Audio to base64
                let data = wStreamBuff.getContents().toString('base64')
                callback(new responses.Response(data))
            }
            else if (response.statusCode === 403) {
                this.refreshAccessToken()
                this.textToSpeech(this.textToSynthesized)
            }
            else {
                callback(new responses.ResponseError('TTS API error'))
            }
        }).pipe(wStreamBuff)
    }

}