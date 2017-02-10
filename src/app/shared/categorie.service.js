(function () {
    'use strict';

    angular
        .module('app.shared')
        .service('CategorieService', CategorieService);

    CategorieService.inject = ['$http'];
    function CategorieService($http) {
        // properties
        var _url = 'http://localhost:3002/';

        // methods
        this.getAllCategories = getAllCategories;
        this.getCategorie = getCategorie;
        this.addCategorie = addCategorie;
        this.updateCategorie = updateCategorie;
        this.deleteCategorie = deleteCategorie;

        ////////////////

        function success(res) {
            console.log(res);
            return res.data;
        }

        function error(err) {
            console.log(err);
        }

        function getAllCategories() {
            return $http.get(_url + 'categorie')
                .then(success)
                .catch(error);
        }

        function getCategorie(id) {
            return $http.get(_url + 'categorie/' + id)
                .then(success)
                .catch(error);
        }
        function addCategorie(categObj) {
            var body = {
                categorie: categObj
            };
            return $http.post(_url + 'categorie', body)
                .then(success)
                .catch(error);
        }
        function updateCategorie(categObj) {
            var body = {
                categorie: categObj
            };
            return $http.put(_url + 'categorie', body)
                .then(success)
                .catch(error);
        }
        function deleteCategorie(id) {
            return $http.delete(_url + 'categorie/' + id)
                .then(success)
                .catch(error);
        }
    }
})();