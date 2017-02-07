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
        this.getAllSpeeches = getAllSpeeches;
        this.getSpeech = getSpeech;
        this.addSpeech = addSpeech;
        this.updateSpeech = updateSpeech;
        this.deleteSpeech = deleteSpeech;

        ////////////////

        function success(res) {
            console.log('response api :', res);
            return res.data;
        }

        function error(err) {
            console.log('error api :', err);
        }

        /**
         * Send text and receive voice in base64 format
         * @param {string} textToSynthesized - Text to synthesized
         */
        function textToSpeech(textToSynthesized) {
            return $http.get(_url + 'dev/audio')
                .then(success)
                .catch(error);
            // var body = {
            //     text: textToSynthesized
            // };
            // return $http.post(_url + 'speech/cognitive-api', body)
            //     .then(success)
            //     .catch(error);
        }

        function getAllSpeeches() {
            return $http.get(_url + 'speech')
                .then(success)
                .catch(error);
        }

        function getSpeech(id) {
            return $http.get(_url + 'speech/' + id)
                .then(success)
                .catch(error);
        }

        function addSpeech(speechObj) {
            var body = {
                speech: speechObj
            };
            return $http.post(_url + 'speech', body)
                .then(success)
                .catch(error);
        }

        function updateSpeech(speechObj) {
            var body = {
                speech: speechObj
            };
            return $http.put(_url + 'speech', body)
                .then(success)
                .catch(error);
        }

        function deleteSpeech(id) {
            return $http.delete(_url + 'speech/' + id)
                .then(success)
                .catch(error);
        }
    }
})();