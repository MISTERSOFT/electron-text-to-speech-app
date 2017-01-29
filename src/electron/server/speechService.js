const request = require('request')
const util = require('util')
const fs = require('fs')

module.exports = class SpeechService {

    // Note: Error 403 - Need to regenerate token JWT

    constructor() {
        this.accessToken = null,
        this.textToSynthesized = '',
        this.API = {
            token: {
                url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
                headers: {
                    'Ocp-Apim-Subscription-Key': 'API_ACCESS_KEY'
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
                }
            }
        }
        this.ssmlTemplate = `<speak version="1.0" xml:lang="fr-FR"><voice xml:lang="fr-FR" xml:gender="Male" name="Microsoft Server Speech Text to Speech Voice (fr-FR, Paul, Apollo)">%s</voice></speak>`
    }

    go() {
        let mins = 540000 // 9mins
        setTimeout(() => {

        }, mins)
    }

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
                this.textToSpeech('Bonjour')
            }
            else {
                throw new Error(response.statusMessage)
            }
            // TODO
        })
    }

    textToSpeech(textToSynthesized) {
        this.textToSynthesized = textToSynthesized
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
            body: util.format(this.ssmlTemplate, textToSynthesized)
        }, (err, response, streamAudio) => {
            if (err) {
                console.log('Error - [textToSpeech]', err)
            }

            if (response.statusCode === 200) {
                fs.writeFile('test.wav', streamAudio, 'binary', (error) => {
                    if (error) {
                        console.log('writeFile streamAudio ', error)
                    }
                })
            }
            else if (response.statusCode === 403) {
                this.refreshAccessToken()
                this.textToSpeech(this.textToSynthesized)
            }
            else {
                throw new Error(response.statusMessage)
            }
        })
    }

    convertToWave() {

    }

}