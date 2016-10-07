
myApp.controller('UsuarioController',
        function ($scope, $http, UsuarioFactory) {

            $scope.editando = false;

            $scope.result

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

            $scope.editarUsuario = function (item) {
                $scope.editando = !$scope.editando;
                /*
                 $scope.usuario.nome = item.nome;
                 $scope.usuario.login =item.login;
                 $scope.usuario.flagInativo = item.flagInativo;
                 $scope.usuario.idGrupo = item.idGrupo;
                 $scope.usuario.senha = item.senha;
                 */
                $scope.usuario = angular.copy(item);

            }

            $scope.cadastroUsuario = function (usuario) {

                if (usuario.idUsuario && usuario.idUsuario != 0) {
                    UsuarioFactory.updateUsuario($scope.callbackCadastroUsuario, usuario);
                } else {
                    UsuarioFactory.setUsuario($scope.callbackCadastroUsuario, usuario);
                }
            }

            $scope.callbackCadastroUsuario = function (resposta) {

                if (resposta.status != 200) {
                    swal("Usuario", "Erro no cadastro do usuario",
                            "error");
                } else {
                    swal("Usuario", "Usuario Cadastrado com sucesso!",
                            "success");
                    $scope.buscaUsuarios();
                    $scope.limpaCampos();
                }
            }


            $scope.limpaCampos = function () {
                $scope.usuario.nome = "";
                $scope.usuario.login = "";
                $scope.usuario.flagInativo = "";
                $scope.usuario.idGrupo = "";
                $scope.usuario.senha = "";
            }




        })


