(function () {
    'use strict';

    angular
        .module('app.speech')
        .controller('SpeechController', SpeechController);

    SpeechController.inject = [];
    function SpeechController() {
        var vm = this;

        activate();

        ////////////////

        function activate() { }
    }
})();