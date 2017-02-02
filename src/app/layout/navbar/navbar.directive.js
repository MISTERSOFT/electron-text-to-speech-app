(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('navbar', navbar);

    navbar.inject = [];
    function navbar() {
        var directive = {
            bindToController: true,
            controller: NavbarController,
            templateUrl: 'templates/layout/navbar/navbar.directive.html',
            controllerAs: 'vm',
            restrict: 'E'
        };
        return directive;
    }
    /* @ngInject */
    NavbarController.$inject = ['$rootScope', '$location'];
    function NavbarController ($rootScope, $location) {
        var vm = this;

        vm.currentUrl = '';

        vm.isSpeechPage = isSpeechPage;
        vm.isFavoritePage = isFavoritePage;

        activate();

        function activate() {
            getCurrentUrl();
            $rootScope.$on('$locationChangeSuccess', function() {
                getCurrentUrl();
            });
        }

        function getCurrentUrl() {
            vm.currentUrl = $location.url();
        }

        function isSpeechPage() {
            return vm.currentUrl === '/speech';
        }

        function isFavoritePage() {
            return vm.currentUrl === '/favorite';
        }
    }
})();