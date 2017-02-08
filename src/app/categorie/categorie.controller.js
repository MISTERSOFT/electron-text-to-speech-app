(function () {
    'use strict';

    angular
        .module('app.categorie')
        .controller('CategorieController', CategorieController);

    CategorieController.inject = ['SpeechService', 'CategorieService'];
    function CategorieController(SpeechService, CategorieService) {
        var vm = this;
        
        // properties
        vm.newCateg = '';

        // methods
        vm.newCategorie = newCategorie;
        vm.deleteCategorie = deleteCategorie;
        vm.rename = rename;

        activate();

        ////////////////

        function activate() {
            console.log(CategorieService);
            CategorieService.getAllCategories().then(function (result) {
                // TODO
            });
        }

        function newCategorie() {
            if (vm.newCateg !== '') {
                var categModel = {
                    title: vm.newCateg
                };
                CategorieController.addCategorie(categModel).then(function (response) {
                    // TODO
                });
            }
        }

        function deleteCategorie(id) {
            CategorieController.deleteCategorie(id).then(function (response) {
                // TODO
            });
        }

        function rename() {
            // TODO
            var categModel = {
                    title: ''
                };
            CategorieController.updateCategorie(categModel).then(function (response) {
                // TODO
            });
        }
    }
})();