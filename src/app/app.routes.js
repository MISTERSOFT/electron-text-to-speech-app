(function () {
    'use strict';

    angular.module('app').config(routesConfig);

    routesConfig.$inject = ['$routeProvider'];
    function routesConfig($routeProvider) {

        $routeProvider
            .when('/speech', {
                controller: 'SpeechController',
                controllerAs: 'vm',
                templateUrl: 'templates/speech/speech.controller.html'
            })
            .when('/categorie', {
                controller: 'CategorieController',
                controllerAs: 'vm',
                templateUrl: 'templates/categorie/categorie.controller.html'
            })
            .when('/favorite', {
                controller: 'FavoriteController',
                controllerAs: 'vm',
                templateUrl: 'templates/favorite/favorite.controller.html'
            })
            .otherwise({
                redirectTo: '/speech'
            });
    }
})();