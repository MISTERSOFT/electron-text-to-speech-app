(function () {
    'use strict';

    angular
        .module('app.shared')
        .service('BingSpeechAPI', BingSpeechAPI);

    BingSpeechAPI.inject = ['$http'];
    function BingSpeechAPI($http) {
        // properties
        var _clientAPIUrl = 'https://speech.platform.bing.com/synthesize';
        var _accessToken = null;
        var _appName = 'electron-text-to-speech-app';

        // methods
        this.textToSpeech = textToSpeech;

        ////////////////

        function success(res) {
            console.log(res);
            // TODO
            return res;
        }

        function error(err) {
            console.log(err);
            // TODO 
        }

        /**
         * Microsoft Bing Speech API calls
         */
        function textToSpeech(textToSynthesized) {
            var headers = {
                'Authorization': 'Bearer ' + _accessToken,
                'Content-Type': 'application/ssml+xml',
                'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3',
                'X-Search-AppId': '74D573BF42D042E1A194B3EA2BCFA07C', // Random GUID generated, just for this app
                'X-Search-ClientID': '4E500D1AA9F6462499208146917D7676', // Random GUID generated, just for this app
                'User-Agent': _appName
            };
            var body = {
                'VoiceType': 'Male',
                'VoiceName': 'Microsoft Server Speech Text to Speech Voice (fr-FR, Paul, Apollo)',
                'Locale': 'fr-FR',
                'OutputFormat': 'Audio16khz32kbitrateMonoMp3',
                'AuthorizationToken': _accessToken,
                'Text': textToSynthesized
            };

            return $http.post(_clientAPIUrl, body, headers)
                .then(success)
                .catch(error);
        }

        // function formatSSMLTemplate() {
        //     return "<speak version='1.0' xml:lang='en-US'>" +
        //         "<voice xml:lang='en-US' xml:gender='Female' name='Microsoft Server Speech Text to Speech Voice (en-US, ZiraRUS)'>" +
        //         "Microsoft Bing Voice Output API</voice></speak>";
        // }

        /**
         * My Node.js server calls
         */
        function refreshToken() {
            // TODO
        }

        function saveAudio() {
            // TODO - Can I ?
        }


    }
})();