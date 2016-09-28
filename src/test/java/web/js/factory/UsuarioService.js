'use strict';

myApp.factory('UsuarioService', ['$http', function($http) {
    return {
        getUsuarios: function(callback) {
             $http({"method":"GET", "url":"/AprenderCrescer/rest/usuario/getusuarios"}).then(function(response) {
                 callback(response);
            });
        },
    };
}]);