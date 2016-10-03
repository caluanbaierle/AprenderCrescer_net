
myApp.controller('UsuarioController',
function($scope, $http, UsuarioFactory) {
    
            $scope.editando = false;
            
            $scope.result
            
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
            
            $scope.editarUsuario = function(){
                $scope.editando =!$scope.editando;
            }
            
            $scope.cadastroUsuario = function(usuario){
                UsuarioFactory.setUsuario($scope.callbackCadastroUsuario,usuario);
            }
            
            $scope.callbackCadastroUsuario = function(resposta){
                
                if(resposta.status != 200){
                    alert("Deu erro ");
                }else{ 
                    alert("OK!");
                }
                
                $scope.result = resposta.status;
            }
        })


