
myApp.controller('UsuarioController',
        function ($scope, $http, UsuarioFactory) {

            $scope.isEdit = false;


            $scope.dados = [{"idUsuario": 1,
                    "idGrupo": 1,
                    "login": "Caluan",
                    "nome": "Caluan Baierle",
                    "ativo": 'F'
                }, {"idUsuario": 2,
                    "idGrupo": 2,
                    "login": "123testado",
                    "nome": "Caluan Baierle",
                    "ativo": 'T'
                }];

            $scope.buscaUsuarios = function () {
                UsuarioFactory.getUsuarios(
                        $scope.callbackUsuarios);
            }

            $scope.callbackUsuarios = function (resposta) {
                $scope.dados = resposta.data;
            }

            $scope.cadastrar = function (usuario) {




                UsuarioFactory.setUsuarios(usuario, $scope.callbackCadastroUsuarios);
            }

            $scope.callbackCadastroUsuarios = function (resposta) {
                // $scope.dados = resposta.data;
                if (resposta.status != 200) {
                    alert("Oops... Something went wrong!");
                } else {
                    alert("Deu certo manolo");
                }
            }

        })


