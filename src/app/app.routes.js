(function () {
    'use strict';

    angular.module('app').config(routesConfig);

    routesConfig.$inject = ['$routeProvider'];
    function routesConfig($routeProvider) {

        $routeProvider
            .when('/', {
                controller: 'SpeechController',
                controllerAs: 'vm',
                templateUrl: 'templates/speech/speech.controller.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();