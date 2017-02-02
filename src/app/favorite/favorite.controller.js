(function() {
'use strict';

    angular
        .module('app.favorite')
        .controller('FavoriteController', FavoriteController);

    FavoriteController.inject = ['SpeechService'];
    function FavoriteController(SpeechService) {
        var vm = this;
        
        
    }
})();