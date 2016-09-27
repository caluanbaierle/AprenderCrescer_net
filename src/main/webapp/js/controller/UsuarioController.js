
myApp.controller('UsuarioController',
function($scope, $http, UsuarioFactory) {

            $scope.dados = [{"idUsuario": 1,
                    "idGrupo": 1,
                    "login": "Caluan",
                    "nome": "Caluan Baierle",
                    "ativo": 'F'
                },{"idUsuario": 2,
                    "idGrupo": 2,
                    "login": "123testado",
                    "nome": "Caluan Baierle",
                    "ativo": 'T'
                }];
            
            $scope.buscaUsuarios = function(){    
                UsuarioFactory.getUsuarios(
                        $scope.callbackUsuarios);
            }
            
            $scope.callbackUsuarios = function(resposta){
                $scope.dados = resposta.data;
            }
        })


