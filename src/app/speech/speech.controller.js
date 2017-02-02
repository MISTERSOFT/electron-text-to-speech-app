(function () {
    'use strict';

    angular
        .module('app.speech')
        .controller('SpeechController', SpeechController);

    SpeechController.inject = ['SpeechService'];
    function SpeechController(SpeechService) {
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
                console.log(vm.text);
                // SpeechService.textToSpeech(vm.text).then(function(result) {
                //     if (result.success) {
                //         vm.audio = result.data;
                //     }
                //     else {
                //         // TODO - show logger
                //     }
                // });
            }
        }
    }
})();