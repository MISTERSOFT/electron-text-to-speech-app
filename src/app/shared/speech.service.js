(function () {
    'use strict';

    angular
        .module('app.shared')
        .service('SpeechService', SpeechService);

    SpeechService.inject = ['$http'];
    function SpeechService($http) {
        // properties
        var _url = 'http://localhost:3002/';

        // methods
        this.textToSpeech = textToSpeech;

        ////////////////

        function success(res) {
            console.log(res);
            return res;
        }

        function error(err) {
            console.log(err);
        }

        /**
         * Send text and receive voice in mp3 format
         * @param {string} textToSynthesized - Text to synthesized
         */
        function textToSpeech(textToSynthesized) {
            var body = {
                text: textToSynthesized
            };
            return $http.post(_url + 'speech', body)
                .then(success)
                .catch(error);
        }
    }
})();