
myApp.controller('GrupoController',
function($scope, $http, UsuarioFactory) {

            $scope.dados = [{}];
            
            $scope.buscaGrupos = function(){    
                UsuarioFactory.getUsuarios(
                        $scope.callbackUsuarios);
            }
            
            $scope.callbackGrupos = function(resposta){
                $scope.dados = resposta.data;
            }
        })


