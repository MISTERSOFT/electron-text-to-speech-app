(function () {
    'use strict';

    angular
        .module('app.speech')
        .controller('SpeechController', SpeechController);

    SpeechController.inject = ['SpeechService', 'ngAudio'];
    function SpeechController(SpeechService, ngAudio) {
        var vm = this;

        vm.text = '';
        vm.audio = null;

        // methods
        vm.clearText = clearText;
        vm.speech = speech;

        activate();

        ////////////////

        function activate() { }

        function clearText() {
            vm.text = '';
        }

        function speech() {
            if (vm.text !== '') {
                SpeechService.textToSpeech(vm.text).then(function(response) {
                    if (response.success) {
                        // Play sound directly
                        ngAudio.load(response.result.audio).play();
                    }
                    else {
                        // TODO - show logger
                    }
                });
            }
        }
    }
})();