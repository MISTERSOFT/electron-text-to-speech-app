(function () {
    'use strict';

    angular
        .module('app.categorie')
        .controller('CategorieController', CategorieController);

    CategorieController.inject = ['SpeechService', 'CategorieService', '$q'];
    function CategorieController(SpeechService, CategorieService, $q) {
        var vm = this;

        // properties
        vm.newCateg = '';
        vm.categories = [];

        // methods
        vm.newCategorie = newCategorie;
        vm.deleteCategorie = deleteCategorie;
        vm.rename = rename;

        activate();

        ////////////////

        function activate() {
            var promises = [
                getAllCategories(),
                getAllSpeeches()
            ];
            return $q.all(promises).then(function(res) {
                console.log('all done');
            });
        }

        function newCategorie() {
            if (vm.newCateg !== '') {
                var categModel = {
                    title: vm.newCateg,
                    deletable: true
                };
                CategorieController.addCategorie(categModel).then(function (response) {
                    vm.categories.push(response.result[0]);
                    vm.newCateg = '';
                });
            }
        }

        function deleteCategorie(id) {
            CategorieService.deleteCategorie(id).then(function (response) {
                // TODO:
            });
        }

        function rename() {
            // TODO:
            var categModel = {
                title: ''
            };
            CategorieService.updateCategorie(categModel).then(function (response) {
                // TODO:
            });
        }

        function getAllCategories() {
            CategorieService.getAllCategories().then(function (res) {
                if (res.success) {
                    vm.categories = res.result;
                }
            });
        }

        function getAllSpeeches() {
            SpeechService.getAllSpeeches().then(function (res) {
                if (res.success) {
                    var speeches = res.result;
                    for (var i = 0; i < speeches.length; i++) {
                        vm.categories[i].speeches = speeches.filter(function(speech, index) {
                            if (vm.categories[i].id === speech.id) {
                                return speech;
                            }
                        });
                    }
                }
            });
        }
    }
})();