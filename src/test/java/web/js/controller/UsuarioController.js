
myApp.controller('UsuarioController', function UsuarioController($scope, $http, UsuarioService) {

    $scope.pessoa = {};//{id: 0,nome:"",telefone:"",email:""};
    $scope.isEdit = false;
    $scope.dados = []
    
    $scope.buscaUsuarios = function () {
        UsuarioService.getUsuarios($scope.callbackUsuarios);
    }

    $scope.callbackUsuarios = function (result) {
        $scope.dados = result.data;
    }

    $scope.maxid = $scope.dados.length + 1;
    $scope.showErro = function (descricao) {
        swal("Atenção ", "Informe o " + descricao + " ", "warning");
    }
    $scope.cadastrar = function (pessoa) {
        if ((pessoa.nome.length < 2)) {
            swal("Atenção ", "O nome deve ser maior que duas letras", "warning");
        } else if (pessoa.login.length < 2) {
            swal("Atenção ", "Login Muito curto ", "warning");
        } else {
            if ($scope.isEdit) {
                console.log("atualianzo");
                for (var x = 0; x < $scope.dados.length; x++) {
                    var obj = $scope.dados[x];
                    if ((obj.idUsuario == pessoa.idUsuario)) {
                        $scope.dados[x] = angular.copy(pessoa);
                        swal(pessoa.nome + " ", "Atualizado com sucesso!", "success");
                        break;
                    }
                }
                $scope.isEdit = false;
                $scope.pessoa = {id: 0, nome: "", telefone: "", email: ""};
            } else {
                var dado = pessoa;
                dado.id = $scope.maxid++;
                $scope.dados.push(angular.copy(dado));
                console.log($scope.dados);
                swal(pessoa.nome + " ", "Cadastrado com sucesso!", "success");
                $scope.pessoa = {idUsuario: 0, idGrupo: 0, login: "", flagInativo: "", };
            }
        }
    }


    $scope.excluirDados = function (item) {
        $scope.dados.splice(item, 1);
        console.log("Excluir");
        swal("Deletado", "Cadastrado Deletado com sucesso!", "success");
    }

    $scope.editarDado = function (item, idx) {
        $scope.pessoa = angular.copy(item);
        $scope.isEdit = true;
    }


    $scope.Carregar = function () {


    }

    $scope.limpaCampos = function () {
        $scope.pessoa = {};
        $scope.isEdit = false;

    }


})
